import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import ExhibitorConfirmationEmail from "@/emails/exhibitor-confirmation";
import { ExhibitorSubmissionType } from "@/lib/types";
import { generateInvoiceNumber, formatInvoiceDate } from "@/helpers/invoice-generator";
import { PRICING } from "@/helpers/data";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const submission: ExhibitorSubmissionType & { totalAmount: number } = await request.json();

    // Validate required fields
    if (!submission.conferenceTitle) {
      return NextResponse.json(
        { error: "Conference selection is required" },
        { status: 400 }
      );
    }

    if (!submission.organizationName) {
      return NextResponse.json(
        { error: "Organization name is required" },
        { status: 400 }
      );
    }

    if (!submission.organizationStreetAddress || !submission.organizationCity || 
        !submission.organizationStateProvince || !submission.organizationPostalCode || 
        !submission.organizationCountry) {
      return NextResponse.json(
        { error: "Complete organization address is required" },
        { status: 400 }
      );
    }

    if (!submission.productServicesDescription || submission.productServicesDescription.length < 50) {
      return NextResponse.json(
        { error: "Product/services description must be at least 50 characters" },
        { status: 400 }
      );
    }

    if (!submission.exhibitors || submission.exhibitors.length === 0) {
      return NextResponse.json(
        { error: "At least one exhibitor is required" },
        { status: 400 }
      );
    }

    // Validate primary exhibitor email
    const primaryExhibitor = submission.exhibitors[0];
    if (!primaryExhibitor.email) {
      return NextResponse.json(
        { error: "Primary exhibitor email is required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(primaryExhibitor.email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Calculate total amount
    let totalAmount = 0;

    // Base exhibitor registration fees
    totalAmount += PRICING.exhibitorRegistration * submission.exhibitors.length;

    // Add dinner costs
    const dinnerCount = submission.exhibitors.filter((e) => e.dinner).length;
    totalAmount += dinnerCount * PRICING.dinner;

    // Add accommodation costs
    const accommodationNights = submission.exhibitors.reduce(
      (sum, e) => sum + e.accommodationNights,
      0
    );
    totalAmount += accommodationNights * PRICING.accommodation;

    // Add masterclass costs
    const masterclassCount = submission.exhibitors.filter(
      (e) => e.masterclass !== null && e.masterclass !== ""
    ).length;
    totalAmount += masterclassCount * PRICING.masterclass;

    // Generate invoice details
    const invoiceNumber = generateInvoiceNumber();
    const invoiceDate = formatInvoiceDate();

    // Get event details from selected conference if available
    const eventVenue = submission.selectedConference?.venue;
    const eventStartDate = submission.selectedConference?.date?.startDate
      ? new Date(submission.selectedConference.date.startDate)
      : undefined;
    const eventEndDate = submission.selectedConference?.date?.endDate
      ? new Date(submission.selectedConference.date.endDate)
      : undefined;

    // Admin email
    const adminEmail = "admin@icsconferences.org";

    // Email props
    const emailProps = {
      conferenceTitle: submission.conferenceTitle,
      organizationName: submission.organizationName,
      organizationAddress: {
        street: submission.organizationStreetAddress,
        city: submission.organizationCity,
        stateProvince: submission.organizationStateProvince,
        postalCode: submission.organizationPostalCode,
        country: submission.organizationCountry,
      },
      productServicesDescription: submission.productServicesDescription,
      exhibitors: submission.exhibitors,
      reference: submission.reference,
      invoiceNumber,
      invoiceDate,
      totalAmount,
      eventVenue,
      eventStartDate,
      eventEndDate,
    };

    // Send confirmation email to admin
    const adminEmailResult = await resend.emails.send({
      from: "ICS Conference <onboarding@resend.dev>", // TODO: Change to verified domain
      to: adminEmail,
      subject: `New Exhibitor Registration - ${submission.conferenceTitle} - ${invoiceNumber}`,
      react: ExhibitorConfirmationEmail(emailProps),
    });

    if (adminEmailResult.error) {
      console.error("Error sending admin email:", adminEmailResult.error);
      return NextResponse.json(
        { error: "Failed to send confirmation email to admin", details: adminEmailResult.error },
        { status: 500 }
      );
    }

    // Send confirmation email copy to primary exhibitor
    const exhibitorEmailResult = await resend.emails.send({
      from: "ICS Conference <onboarding@resend.dev>", // TODO: Change to verified domain
      to: primaryExhibitor.email,
      subject: `Exhibitor Registration Confirmed - ${submission.conferenceTitle}`,
      react: ExhibitorConfirmationEmail(emailProps),
    });

    if (exhibitorEmailResult.error) {
      console.error("Error sending exhibitor email:", exhibitorEmailResult.error);
      // Still return success since admin email was sent
      return NextResponse.json({
        success: true,
        message: "Registration submitted successfully (admin notified, but exhibitor email failed)",
        emailId: adminEmailResult.data?.id,
        invoiceNumber,
        warning: "Failed to send copy to exhibitor",
      });
    }

    // TODO: Save submission to database here
    // await saveExhibitorSubmissionToDatabase({ ...submission, invoiceNumber, invoiceDate, totalAmount });

    return NextResponse.json({
      success: true,
      message: "Exhibitor registration submitted successfully",
      emailId: adminEmailResult.data?.id,
      exhibitorEmailId: exhibitorEmailResult.data?.id,
      invoiceNumber,
      totalAmount,
    });
  } catch (error) {
    console.error("Error processing exhibitor registration:", error);
    return NextResponse.json(
      { error: "Failed to process exhibitor registration", details: String(error) },
      { status: 500 }
    );
  }
}

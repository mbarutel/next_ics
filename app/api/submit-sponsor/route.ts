import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import SponsorConfirmationEmail from "@/emails/sponsor-confirmation";
import { SponsorSubmissionType } from "@/lib/types";
import { generateInvoiceNumber, formatInvoiceDate } from "@/helpers/invoice-generator";
import { PRICING, SPONSOR_PACKAGES } from "@/helpers/data";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const submission: SponsorSubmissionType & { totalAmount: number } = await request.json();

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

    if (!submission.selectedPackage) {
      return NextResponse.json(
        { error: "Sponsorship package selection is required" },
        { status: 400 }
      );
    }

    // Validate package tier
    if (!['gold', 'silver', 'bronze'].includes(submission.selectedPackage)) {
      return NextResponse.json(
        { error: "Invalid sponsorship package tier" },
        { status: 400 }
      );
    }

    if (!submission.sponsors || submission.sponsors.length === 0) {
      return NextResponse.json(
        { error: "At least one sponsor representative is required" },
        { status: 400 }
      );
    }

    // Validate primary sponsor email
    const primarySponsor = submission.sponsors[0];
    if (!primarySponsor.email) {
      return NextResponse.json(
        { error: "Primary sponsor email is required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(primarySponsor.email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Calculate total amount
    let totalAmount = 0;

    // Package price
    const selectedPackageData = SPONSOR_PACKAGES[submission.selectedPackage];
    totalAmount += selectedPackageData.price;

    // Additional representative fees (beyond included count)
    const includedReps = selectedPackageData.includedRepresentatives;
    const totalReps = submission.sponsors.length;
    const additionalReps = Math.max(0, totalReps - includedReps);
    totalAmount += additionalReps * PRICING.sponsorRegistration;

    // Dinner costs (only beyond included count)
    const includedDinners = selectedPackageData.includedDinners;
    const totalDinners = submission.sponsors.filter((s) => s.dinner).length;
    const additionalDinners = Math.max(0, totalDinners - includedDinners);
    totalAmount += additionalDinners * PRICING.dinner;

    // Accommodation costs (for ALL representatives)
    const accommodationNights = submission.sponsors.reduce(
      (sum, s) => sum + s.accommodationNights,
      0
    );
    totalAmount += accommodationNights * PRICING.accommodation;

    // Masterclass costs (for ALL representatives)
    const masterclassCount = submission.sponsors.filter(
      (s) => s.masterclass !== null && s.masterclass !== ""
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
      selectedPackage: selectedPackageData,
      sponsors: submission.sponsors,
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
      subject: `New ${selectedPackageData.name} Registration - ${submission.conferenceTitle} - ${invoiceNumber}`,
      react: SponsorConfirmationEmail(emailProps),
    });

    if (adminEmailResult.error) {
      console.error("Error sending admin email:", adminEmailResult.error);
      return NextResponse.json(
        { error: "Failed to send confirmation email to admin", details: adminEmailResult.error },
        { status: 500 }
      );
    }

    // Send confirmation email copy to primary sponsor
    const sponsorEmailResult = await resend.emails.send({
      from: "ICS Conference <onboarding@resend.dev>", // TODO: Change to verified domain
      to: primarySponsor.email,
      subject: `${selectedPackageData.name} Registration Confirmed - ${submission.conferenceTitle}`,
      react: SponsorConfirmationEmail(emailProps),
    });

    if (sponsorEmailResult.error) {
      console.error("Error sending sponsor email:", sponsorEmailResult.error);
      // Still return success since admin email was sent
      return NextResponse.json({
        success: true,
        message: "Registration submitted successfully (admin notified, but sponsor email failed)",
        emailId: adminEmailResult.data?.id,
        invoiceNumber,
        warning: "Failed to send copy to sponsor",
      });
    }

    // TODO: Save submission to database here
    // await saveSponsorSubmissionToDatabase({ ...submission, invoiceNumber, invoiceDate, totalAmount });

    return NextResponse.json({
      success: true,
      message: "Sponsor registration submitted successfully",
      emailId: adminEmailResult.data?.id,
      sponsorEmailId: sponsorEmailResult.data?.id,
      invoiceNumber,
      totalAmount,
    });
  } catch (error) {
    console.error("Error processing sponsor registration:", error);
    return NextResponse.json(
      { error: "Failed to process sponsor registration", details: String(error) },
      { status: 500 }
    );
  }
}

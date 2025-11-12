import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import DelegateConfirmationEmail from "@/emails/delegate-confirmation";
import { SubmissionType } from "@/helpers/local-storage";
import { generateInvoiceNumber, formatInvoiceDate } from "@/helpers/invoice-generator";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const submission: SubmissionType & { totalAmount: number } = await request.json();

    // Validate required fields
    if (!submission.conferenceTitle) {
      return NextResponse.json(
        { error: "Conference title is required" },
        { status: 400 }
      );
    }

    if (!submission.selectedPriceTier) {
      return NextResponse.json(
        { error: "Price tier is required" },
        { status: 400 }
      );
    }

    if (!submission.delegates || submission.delegates.length === 0) {
      return NextResponse.json(
        { error: "At least one delegate is required" },
        { status: 400 }
      );
    }

    // Validate primary delegate email
    const primaryDelegate = submission.delegates[0];
    if (!primaryDelegate.email) {
      return NextResponse.json(
        { error: "Primary delegate email is required" },
        { status: 400 }
      );
    }

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
      delegates: submission.delegates,
      selectedPriceTier: submission.selectedPriceTier,
      promoCode: submission.promoCode || undefined,
      totalAmount: submission.totalAmount,
      reference: submission.reference,
      invoiceNumber,
      invoiceDate,
      eventVenue,
      eventStartDate,
      eventEndDate,
    };

    // Send confirmation email to admin
    const adminEmailResult = await resend.emails.send({
      from: "ICS Conference <onboarding@resend.dev>", // TODO: Change to verified domain
      to: adminEmail,
      subject: `New Registration - ${submission.conferenceTitle} - ${invoiceNumber}`,
      react: DelegateConfirmationEmail(emailProps),
    });

    if (adminEmailResult.error) {
      console.error("Error sending admin email:", adminEmailResult.error);
      return NextResponse.json(
        { error: "Failed to send confirmation email to admin", details: adminEmailResult.error },
        { status: 500 }
      );
    }

    // Send confirmation email copy to primary delegate
    const delegateEmailResult = await resend.emails.send({
      from: "ICS Conference <onboarding@resend.dev>", // TODO: Change to verified domain
      to: primaryDelegate.email,
      subject: `Registration Confirmed - ${submission.conferenceTitle}`,
      react: DelegateConfirmationEmail(emailProps),
    });

    if (delegateEmailResult.error) {
      console.error("Error sending delegate email:", delegateEmailResult.error);
      // Still return success since admin email was sent
      return NextResponse.json({
        success: true,
        message: "Registration submitted successfully (admin notified, but delegate email failed)",
        emailId: adminEmailResult.data?.id,
        invoiceNumber,
        warning: "Failed to send copy to delegate",
      });
    }

    // TODO: Save submission to database here
    // await saveSubmissionToDatabase({ ...submission, invoiceNumber, invoiceDate });

    return NextResponse.json({
      success: true,
      message: "Registration submitted successfully",
      emailId: adminEmailResult.data?.id,
      delegateEmailId: delegateEmailResult.data?.id,
      invoiceNumber,
    });
  } catch (error) {
    console.error("Error processing registration:", error);
    return NextResponse.json(
      { error: "Failed to process registration", details: String(error) },
      { status: 500 }
    );
  }
}

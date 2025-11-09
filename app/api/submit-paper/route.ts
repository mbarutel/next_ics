import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import PaperConfirmationEmail from "@/emails/paper-confirmation";
import { PaperFormikValuesType } from "@/lib/form-paper";
import { generateInvoiceNumber, formatInvoiceDate } from "@/helpers/invoice-generator";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const submission: PaperFormikValuesType = await request.json();

    // Validate required fields
    if (!submission.events) {
      return NextResponse.json(
        { error: "Conference selection is required" },
        { status: 400 }
      );
    }

    if (!submission.name || !submission.email) {
      return NextResponse.json(
        { error: "Speaker name and email are required" },
        { status: 400 }
      );
    }

    if (!submission.paperTitle || !submission.paperDescription) {
      return NextResponse.json(
        { error: "Paper title and description are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(submission.email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Generate invoice details
    const invoiceNumber = generateInvoiceNumber();
    const invoiceDate = formatInvoiceDate();

    // Admin email
    const adminEmail = "admin@icsconferences.org";

    // Email props
    const emailProps = {
      conferenceTitle: submission.events,
      speakerName: submission.name,
      speakerEmail: submission.email,
      speakerJobTitle: submission.jobTitle,
      speakerOrganization: submission.organisation,
      speakerAddress: submission.address,
      speakerPhone: submission.phone,
      paperTitle: submission.paperTitle,
      biography: submission.biography,
      paperDescription: submission.paperDescription,
      accommodation: submission.accomodation,
      dinnerParticipants: submission.dinnerParticipants,
      masterclass: submission.masterclass,
      discount: submission.discount,
      referral: submission.referral,
      invoiceNumber,
      invoiceDate,
    };

    // Send confirmation email to admin
    const adminEmailResult = await resend.emails.send({
      from: "ICS Conference <onboarding@resend.dev>", // TODO: Change to verified domain
      to: adminEmail,
      subject: `New Paper Submission - ${submission.events} - ${invoiceNumber}`,
      react: PaperConfirmationEmail(emailProps),
    });

    if (adminEmailResult.error) {
      console.error("Error sending admin email:", adminEmailResult.error);
      return NextResponse.json(
        { error: "Failed to send confirmation email to admin", details: adminEmailResult.error },
        { status: 500 }
      );
    }

    // Send confirmation email copy to speaker
    const speakerEmailResult = await resend.emails.send({
      from: "ICS Conference <onboarding@resend.dev>", // TODO: Change to verified domain
      to: submission.email,
      subject: `Paper Submission Confirmed - ${submission.events}`,
      react: PaperConfirmationEmail(emailProps),
    });

    if (speakerEmailResult.error) {
      console.error("Error sending speaker email:", speakerEmailResult.error);
      // Still return success since admin email was sent
      return NextResponse.json({
        success: true,
        message: "Paper submission received successfully (admin notified, but speaker email failed)",
        emailId: adminEmailResult.data?.id,
        invoiceNumber,
        warning: "Failed to send copy to speaker",
      });
    }

    // TODO: Save submission to database here
    // await savePaperSubmissionToDatabase({ ...submission, invoiceNumber, invoiceDate });

    return NextResponse.json({
      success: true,
      message: "Paper submission received successfully",
      emailId: adminEmailResult.data?.id,
      speakerEmailId: speakerEmailResult.data?.id,
      invoiceNumber,
    });
  } catch (error) {
    console.error("Error processing paper submission:", error);
    return NextResponse.json(
      { error: "Failed to process paper submission", details: String(error) },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import PaperConfirmationEmail from "@/emails/paper-confirmation";
import { PaperSubmissionType } from "@/lib/types";
import { generateInvoiceNumber, formatInvoiceDate } from "@/helpers/invoice-generator";
import { validatePromoCode, calculateDiscount } from "@/helpers/promo-codes";
import { PRICING } from "@/helpers/data";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const submission: PaperSubmissionType = await request.json();

    // Validate required fields
    if (!submission.conferenceTitle) {
      return NextResponse.json(
        { error: "Conference selection is required" },
        { status: 400 }
      );
    }

    if (!submission.speakers || submission.speakers.length === 0) {
      return NextResponse.json(
        { error: "At least one speaker is required" },
        { status: 400 }
      );
    }

    const primarySpeaker = submission.speakers[0];
    if (!primarySpeaker.firstName || !primarySpeaker.lastName || !primarySpeaker.email) {
      return NextResponse.json(
        { error: "Primary speaker name and email are required" },
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
    if (!emailRegex.test(primarySpeaker.email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Calculate total amount
    let totalAmount = 0;

    // Base speaker registration fees
    totalAmount += PRICING.speakerRegistration * submission.speakers.length;

    // Add dinner costs
    const dinnerCount = submission.speakers.filter((s) => s.dinner).length;
    totalAmount += dinnerCount * PRICING.dinner;

    // Add accommodation costs
    const accommodationNights = submission.speakers.reduce(
      (sum, s) => sum + s.accommodationNights,
      0
    );
    totalAmount += accommodationNights * PRICING.accommodation;

    // Add masterclass costs
    const masterclassCount = submission.speakers.filter(
      (s) => s.masterclass !== null
    ).length;
    totalAmount += masterclassCount * PRICING.masterclass;

    // Apply promo code discount if valid
    let discount = 0;
    if (submission.promoCode) {
      const promoValidation = validatePromoCode(submission.promoCode, submission);
      if (promoValidation.isValid && promoValidation.promoCode) {
        discount = calculateDiscount(promoValidation.promoCode, submission);
      }
    }

    const finalTotal = totalAmount - discount;

    // Generate invoice details
    const invoiceNumber = generateInvoiceNumber();
    const invoiceDate = formatInvoiceDate();

    // Admin email
    const adminEmail = "admin@icsconferences.org";

    // Email props
    const emailProps = {
      conferenceTitle: submission.conferenceTitle,
      speakers: submission.speakers,
      paperTitle: submission.paperTitle,
      paperDescription: submission.paperDescription,
      promoCode: submission.promoCode,
      discount,
      reference: submission.reference,
      invoiceNumber,
      invoiceDate,
      subtotal: totalAmount,
      total: finalTotal,
    };

    // Send confirmation email to admin
    const adminEmailResult = await resend.emails.send({
      from: "ICS Conference <onboarding@resend.dev>", // TODO: Change to verified domain
      to: adminEmail,
      subject: `New Paper Submission - ${submission.conferenceTitle} - ${invoiceNumber}`,
      react: PaperConfirmationEmail(emailProps),
    });

    if (adminEmailResult.error) {
      console.error("Error sending admin email:", adminEmailResult.error);
      return NextResponse.json(
        { error: "Failed to send confirmation email to admin", details: adminEmailResult.error },
        { status: 500 }
      );
    }

    // Send confirmation email copy to primary speaker
    const speakerEmailResult = await resend.emails.send({
      from: "ICS Conference <onboarding@resend.dev>", // TODO: Change to verified domain
      to: primarySpeaker.email,
      subject: `Paper Submission Confirmed - ${submission.conferenceTitle}`,
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
    // await savePaperSubmissionToDatabase({ ...submission, invoiceNumber, invoiceDate, totalAmount: finalTotal });

    return NextResponse.json({
      success: true,
      message: "Paper submission received successfully",
      emailId: adminEmailResult.data?.id,
      speakerEmailId: speakerEmailResult.data?.id,
      invoiceNumber,
      totalAmount: finalTotal,
    });
  } catch (error) {
    console.error("Error processing paper submission:", error);
    return NextResponse.json(
      { error: "Failed to process paper submission", details: String(error) },
      { status: 500 }
    );
  }
}

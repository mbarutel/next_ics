import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Hr,
} from "@react-email/components";
import { DinnerParticipantType } from "@/lib/types";
import { PRICING } from "@/helpers/data";

interface PaperConfirmationEmailProps {
  conferenceTitle: string;
  speakerName: string;
  speakerEmail: string;
  speakerJobTitle: string;
  speakerOrganization: string;
  speakerAddress: string;
  speakerPhone: string;
  paperTitle: string;
  biography: string;
  paperDescription: string;
  accommodation: string;
  dinnerParticipants: DinnerParticipantType[];
  masterclass: string;
  discount: string;
  referral: string;
  invoiceNumber: string;
  invoiceDate: string;
}

export default function PaperConfirmationEmail({
  conferenceTitle,
  speakerName,
  speakerEmail,
  speakerJobTitle,
  speakerOrganization,
  speakerAddress,
  speakerPhone,
  paperTitle,
  biography,
  paperDescription,
  accommodation,
  dinnerParticipants,
  masterclass,
  discount,
  referral,
  invoiceNumber,
  invoiceDate,
}: PaperConfirmationEmailProps) {
  // Calculate pricing breakdown
  const speakerRegistration = PRICING.speakerRegistration;

  const dinnerCount = dinnerParticipants.length;
  const dinnerTotal = dinnerCount * PRICING.dinner;

  const accommodationNights = accommodation ? parseInt(accommodation, 10) || 0 : 0;
  const accommodationTotal = accommodationNights * PRICING.accommodation;

  const masterclassTotal = masterclass ? PRICING.masterclass : 0;

  const subtotal = speakerRegistration + dinnerTotal + accommodationTotal + masterclassTotal;

  // Apply discount if any (assuming discount is a percentage or amount)
  const discountAmount = discount ? parseFloat(discount) || 0 : 0;
  const total = subtotal - discountAmount;

  return (
    <Html>
      <Head />
      <Preview>Paper Submission Confirmed - {conferenceTitle}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Heading style={headerTitle}>PAPER SUBMISSION</Heading>
            <Text style={headerSubtitle}>ICS Conference Registration</Text>
          </Section>

          {/* Invoice Details Bar */}
          <Section style={invoiceBar}>
            <Text style={invoiceText}>
              <strong>Invoice:</strong> {invoiceNumber}
            </Text>
            <Text style={invoiceText}>
              <strong>Date:</strong> {invoiceDate}
            </Text>
          </Section>

          {/* Speaker Information */}
          <Section style={section}>
            <Heading as="h2" style={sectionHeading}>
              Speaker Information
            </Heading>
            <Text style={text}>
              <strong>{speakerName}</strong>
            </Text>
            <Text style={text}>{speakerJobTitle}</Text>
            <Text style={text}>{speakerOrganization}</Text>
            <Text style={text}>{speakerAddress}</Text>
            <Text style={text}>{speakerEmail}</Text>
            <Text style={text}>{speakerPhone}</Text>
          </Section>

          <Hr style={divider} />

          {/* Conference Details */}
          <Section style={section}>
            <Heading as="h2" style={sectionHeading}>
              Conference Details
            </Heading>
            <Text style={text}>
              <strong>Conference:</strong> {conferenceTitle}
            </Text>
          </Section>

          <Hr style={divider} />

          {/* Paper Details */}
          <Section style={section}>
            <Heading as="h2" style={sectionHeading}>
              Paper Details
            </Heading>
            <Text style={text}>
              <strong>Title:</strong> {paperTitle}
            </Text>
            <Text style={text}>
              <strong>Description:</strong>
            </Text>
            <Text style={paperDescriptionStyle}>{paperDescription}</Text>

            {biography && (
              <>
                <Text style={text}>
                  <strong>Speaker Biography:</strong>
                </Text>
                <Text style={paperDescriptionStyle}>{biography}</Text>
              </>
            )}
          </Section>

          <Hr style={divider} />

          {/* Itemized Services */}
          <Section style={section}>
            <Heading as="h2" style={sectionHeading}>
              Itemized Services
            </Heading>

            {/* Table Header */}
            <div style={tableHeader}>
              <Text style={tableHeaderCell}>Description</Text>
              <Text style={tableHeaderCellRight}>Qty</Text>
              <Text style={tableHeaderCellRight}>Rate</Text>
              <Text style={tableHeaderCellRight}>Amount</Text>
            </div>

            {/* Speaker Registration */}
            <div style={tableRow}>
              <Text style={tableCell}>Speaker Registration</Text>
              <Text style={tableCellRight}>1</Text>
              <Text style={tableCellRight}>${speakerRegistration}</Text>
              <Text style={tableCellRight}>${speakerRegistration}</Text>
            </div>

            {/* Gala Dinner */}
            {dinnerCount > 0 && (
              <>
                <div style={tableRow}>
                  <Text style={tableCell}>Gala Dinner</Text>
                  <Text style={tableCellRight}>{dinnerCount}</Text>
                  <Text style={tableCellRight}>${PRICING.dinner}</Text>
                  <Text style={tableCellRight}>${dinnerTotal}</Text>
                </div>
                {/* Dinner Participants List */}
                {dinnerParticipants.map((participant, index) => (
                  <div key={index} style={delegateRow}>
                    <Text style={delegateText}>
                      • {participant.name} - {participant.diet}
                    </Text>
                  </div>
                ))}
              </>
            )}

            {/* Masterclass */}
            {masterclass && (
              <div style={tableRow}>
                <Text style={tableCell}>Post-Conference Masterclass</Text>
                <Text style={tableCellRight}>1</Text>
                <Text style={tableCellRight}>${PRICING.masterclass}</Text>
                <Text style={tableCellRight}>${masterclassTotal}</Text>
              </div>
            )}

            {/* Accommodation */}
            {accommodationNights > 0 && (
              <div style={tableRow}>
                <Text style={tableCell}>
                  Accommodation ({accommodationNights} night{accommodationNights > 1 ? "s" : ""})
                </Text>
                <Text style={tableCellRight}>{accommodationNights}</Text>
                <Text style={tableCellRight}>${PRICING.accommodation}</Text>
                <Text style={tableCellRight}>${accommodationTotal}</Text>
              </div>
            )}
          </Section>

          <Hr style={divider} />

          {/* Pricing Summary */}
          <Section style={section}>
            <div style={summaryRow}>
              <Text style={summaryLabel}>Subtotal:</Text>
              <Text style={summaryValue}>${subtotal.toLocaleString()}</Text>
            </div>

            {discountAmount > 0 && (
              <div style={summaryRow}>
                <Text style={summaryLabel}>Discount:</Text>
                <Text style={summaryValueDiscount}>
                  -${discountAmount.toLocaleString()}
                </Text>
              </div>
            )}

            <div style={totalRow}>
              <Text style={totalLabel}>Total (AUD):</Text>
              <Text style={totalValue}>${total.toLocaleString()}</Text>
            </div>
          </Section>

          <Hr style={divider} />

          {/* Payment Terms */}
          <Section style={section}>
            <Heading as="h2" style={sectionHeading}>
              Payment Terms
            </Heading>
            <Text style={text}>
              Payment is due within 14 days of receiving this invoice.
            </Text>
            <Text style={text}>
              <strong>Accepted Payment Methods:</strong> Bank Transfer, Credit
              Card, PayPal
            </Text>
            <Text style={text}>
              Please reference invoice number <strong>{invoiceNumber}</strong>{" "}
              when making payment.
            </Text>
          </Section>

          <Hr style={divider} />

          {/* Reference */}
          <Section style={section}>
            <Heading as="h2" style={sectionHeading}>
              How Did You Hear About Us?
            </Heading>
            <Text style={text}>{referral}</Text>
          </Section>

          <Hr style={divider} />

          {/* Important Notes */}
          <Section style={notesSection}>
            <Heading as="h2" style={sectionHeading}>
              Important Notes
            </Heading>
            <Text style={noteText}>
              • This email confirms receipt of your paper submission.
            </Text>
            <Text style={noteText}>
              • Our review committee will evaluate your submission and contact you within 2-3 weeks.
            </Text>
            <Text style={noteText}>
              • Please retain this email for your records.
            </Text>
            <Text style={noteText}>
              • For any queries, please contact us at papers@icsconference.com
            </Text>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              Indigenous Conferences and Seminars (ICS)
            </Text>
            <Text style={footerText}>
              Email: papers@icsconference.com
            </Text>
            <Text style={footerText}>
              © {new Date().getFullYear()} ICS Conference. All rights reserved.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// Styles
const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
  maxWidth: "600px",
};

const header = {
  backgroundColor: "#155de9",
  padding: "32px 24px",
  textAlign: "center" as const,
};

const headerTitle = {
  color: "#ffffff",
  fontSize: "32px",
  fontWeight: "bold",
  margin: "0",
  padding: "0",
};

const headerSubtitle = {
  color: "#ffffff",
  fontSize: "16px",
  margin: "8px 0 0 0",
  padding: "0",
};

const invoiceBar = {
  backgroundColor: "#f3f4f6",
  padding: "16px 24px",
  display: "flex",
  justifyContent: "space-between",
};

const invoiceText = {
  fontSize: "14px",
  color: "#1f2937",
  margin: "0",
};

const section = {
  padding: "24px",
};

const sectionHeading = {
  fontSize: "18px",
  fontWeight: "bold",
  color: "#1f2937",
  margin: "0 0 16px 0",
};

const text = {
  fontSize: "14px",
  color: "#374151",
  lineHeight: "24px",
  margin: "4px 0",
};

const paperDescriptionStyle = {
  fontSize: "14px",
  color: "#374151",
  lineHeight: "24px",
  margin: "8px 0",
  padding: "12px",
  backgroundColor: "#f9fafb",
  borderRadius: "4px",
};

const divider = {
  borderColor: "#e5e7eb",
  margin: "0",
};

const tableHeader = {
  backgroundColor: "#1f2937",
  padding: "12px 16px",
  display: "grid",
  gridTemplateColumns: "2fr 1fr 1fr 1fr",
  gap: "8px",
};

const tableHeaderCell = {
  color: "#ffffff",
  fontSize: "12px",
  fontWeight: "bold",
  margin: "0",
  textTransform: "uppercase" as const,
};

const tableHeaderCellRight = {
  ...tableHeaderCell,
  textAlign: "right" as const,
};

const tableRow = {
  padding: "12px 16px",
  display: "grid",
  gridTemplateColumns: "2fr 1fr 1fr 1fr",
  gap: "8px",
  borderBottom: "1px solid #e5e7eb",
};

const tableCell = {
  fontSize: "14px",
  color: "#374151",
  margin: "0",
};

const tableCellRight = {
  ...tableCell,
  textAlign: "right" as const,
};

const delegateRow = {
  padding: "8px 16px 8px 32px",
  backgroundColor: "#f9fafb",
};

const delegateText = {
  fontSize: "12px",
  color: "#6b7280",
  margin: "0",
  fontStyle: "italic" as const,
};

const summaryRow = {
  display: "flex",
  justifyContent: "space-between",
  padding: "8px 0",
};

const summaryLabel = {
  fontSize: "14px",
  color: "#374151",
  margin: "0",
};

const summaryValue = {
  fontSize: "14px",
  color: "#374151",
  margin: "0",
  fontWeight: "600",
};

const summaryValueDiscount = {
  fontSize: "14px",
  color: "#059669",
  margin: "0",
  fontWeight: "600",
};

const totalRow = {
  display: "flex",
  justifyContent: "space-between",
  padding: "16px 0",
  borderTop: "2px solid #1f2937",
  marginTop: "8px",
};

const totalLabel = {
  fontSize: "18px",
  color: "#1f2937",
  margin: "0",
  fontWeight: "bold",
};

const totalValue = {
  fontSize: "24px",
  color: "#155de9",
  margin: "0",
  fontWeight: "bold",
};

const notesSection = {
  padding: "24px",
  backgroundColor: "#fef3c7",
};

const noteText = {
  fontSize: "14px",
  color: "#78350f",
  lineHeight: "24px",
  margin: "4px 0",
};

const footer = {
  padding: "24px",
  textAlign: "center" as const,
  backgroundColor: "#f9fafb",
};

const footerText = {
  fontSize: "12px",
  color: "#6b7280",
  margin: "4px 0",
};

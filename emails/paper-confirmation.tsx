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
import { SpeakerParticipantType } from "@/lib/types";
import { PRICING } from "@/helpers/data";

interface PaperConfirmationEmailProps {
  conferenceTitle: string;
  speakers: SpeakerParticipantType[];
  paperTitle: string;
  paperDescription: string;
  promoCode?: string;
  discount: number;
  reference: string;
  invoiceNumber: string;
  invoiceDate: string;
  subtotal: number;
  total: number;
}

export default function PaperConfirmationEmail({
  conferenceTitle,
  speakers,
  paperTitle,
  paperDescription,
  promoCode,
  discount,
  reference,
  invoiceNumber,
  invoiceDate,
  subtotal,
  total,
}: PaperConfirmationEmailProps) {
  const primarySpeaker = speakers[0];

  // Calculate counts for display
  const dinnerCount = speakers.filter((s) => s.dinner).length;
  const dinnerTotal = dinnerCount * PRICING.dinner;

  const accommodationNights = speakers.reduce(
    (sum, s) => sum + s.accommodationNights,
    0
  );
  const accommodationTotal = accommodationNights * PRICING.accommodation;

  const masterclassCount = speakers.filter((s) => s.masterclass !== null).length;
  const masterclassTotal = masterclassCount * PRICING.masterclass;

  const speakerRegistrationTotal = PRICING.speakerRegistration * speakers.length;

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

          {/* Primary Speaker Information */}
          <Section style={section}>
            <Heading as="h2" style={sectionHeading}>
              Primary Speaker Information
            </Heading>
            <Text style={text}>
              <strong>{primarySpeaker.firstName} {primarySpeaker.lastName}</strong>
            </Text>
            <Text style={text}>{primarySpeaker.jobTitle}</Text>
            <Text style={text}>{primarySpeaker.organization}</Text>
            <Text style={text}>{primarySpeaker.email}</Text>
            <Text style={text}>{primarySpeaker.phone}</Text>
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
          </Section>

          <Hr style={divider} />

          {/* All Speakers */}
          <Section style={section}>
            <Heading as="h2" style={sectionHeading}>
              Speakers ({speakers.length})
            </Heading>
            {speakers.map((speaker, index) => (
              <div key={index} style={speakerCard}>
                <Text style={speakerName}>
                  {index + 1}. {speaker.firstName} {speaker.lastName}
                </Text>
                <Text style={speakerDetails}>{speaker.jobTitle}</Text>
                <Text style={speakerDetails}>{speaker.organization}</Text>
                <Text style={speakerDetails}>{speaker.email}</Text>
                {speaker.biography && (
                  <>
                    <Text style={text}>
                      <strong>Biography:</strong>
                    </Text>
                    <Text style={biographyStyle}>{speaker.biography}</Text>
                  </>
                )}
                {(speaker.dinner || speaker.masterclass || speaker.accommodationNights > 0) && (
                  <div style={speakerExtras}>
                    <Text style={extrasTitle}>Event Preferences:</Text>
                    {speaker.dinner && (
                      <Text style={extrasText}>
                        • Gala Dinner - {speaker.diet}
                      </Text>
                    )}
                    {speaker.masterclass && (
                      <Text style={extrasText}>
                        • Masterclass: {speaker.masterclass}
                      </Text>
                    )}
                    {speaker.accommodationNights > 0 && (
                      <Text style={extrasText}>
                        • Accommodation: {speaker.accommodationNights} night{speaker.accommodationNights > 1 ? "s" : ""}
                      </Text>
                    )}
                  </div>
                )}
              </div>
            ))}
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
              <Text style={tableCellRight}>{speakers.length}</Text>
              <Text style={tableCellRight}>${PRICING.speakerRegistration}</Text>
              <Text style={tableCellRight}>${speakerRegistrationTotal}</Text>
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
                {speakers
                  .filter((s) => s.dinner)
                  .map((speaker, index) => (
                    <div key={index} style={delegateRow}>
                      <Text style={delegateText}>
                        • {speaker.firstName} {speaker.lastName} - {speaker.diet}
                      </Text>
                    </div>
                  ))}
              </>
            )}

            {/* Masterclass */}
            {masterclassCount > 0 && (
              <>
                <div style={tableRow}>
                  <Text style={tableCell}>Post-Conference Masterclass</Text>
                  <Text style={tableCellRight}>{masterclassCount}</Text>
                  <Text style={tableCellRight}>${PRICING.masterclass}</Text>
                  <Text style={tableCellRight}>${masterclassTotal}</Text>
                </div>
                {speakers
                  .filter((s) => s.masterclass)
                  .map((speaker, index) => (
                    <div key={index} style={delegateRow}>
                      <Text style={delegateText}>
                        • {speaker.firstName} {speaker.lastName} - {speaker.masterclass}
                      </Text>
                    </div>
                  ))}
              </>
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

            {discount > 0 && (
              <div style={summaryRow}>
                <Text style={summaryLabel}>Promo Code ({promoCode}):</Text>
                <Text style={summaryValueDiscount}>
                  -${discount.toLocaleString()}
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
            <Text style={text}>{reference}</Text>
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

const biographyStyle = {
  fontSize: "13px",
  color: "#6b7280",
  lineHeight: "20px",
  margin: "8px 0",
  padding: "10px",
  backgroundColor: "#f9fafb",
  borderRadius: "4px",
  fontStyle: "italic" as const,
};

const speakerCard = {
  backgroundColor: "#fafafa",
  padding: "16px",
  marginBottom: "12px",
  borderRadius: "4px",
  border: "1px solid #e5e7eb",
};

const speakerName = {
  fontSize: "16px",
  fontWeight: "bold",
  color: "#1f2937",
  margin: "0 0 8px 0",
};

const speakerDetails = {
  fontSize: "14px",
  color: "#6b7280",
  margin: "2px 0",
};

const speakerExtras = {
  marginTop: "12px",
  paddingTop: "12px",
  borderTop: "1px solid #e5e7eb",
};

const extrasTitle = {
  fontSize: "13px",
  fontWeight: "600",
  color: "#374151",
  margin: "0 0 6px 0",
};

const extrasText = {
  fontSize: "12px",
  color: "#6b7280",
  margin: "4px 0",
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

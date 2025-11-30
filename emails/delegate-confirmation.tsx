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
import { DelegateType } from "@/lib/types";
import { PriceTier } from "@/helpers/utils";
import { PRICING } from "@/helpers/data";
import { configs } from "@/lib/data";

interface DelegateConfirmationEmailProps {
  conferenceTitle: string;
  delegates: DelegateType[];
  selectedPriceTier: PriceTier;
  promoCode?: string;
  totalAmount: number;
  reference: string;
  invoiceNumber: string;
  invoiceDate: string;
  eventVenue?: string;
  eventStartDate?: Date;
  eventEndDate?: Date;
}

export default function DelegateConfirmationEmail({
  conferenceTitle,
  delegates,
  selectedPriceTier,
  promoCode = "",
  totalAmount,
  reference,
  invoiceNumber,
  invoiceDate,
  eventVenue,
  eventStartDate,
  eventEndDate,
}: DelegateConfirmationEmailProps) {
  const primaryDelegate = delegates[0];

  // Calculate pricing breakdown
  const basePrice = selectedPriceTier.price;
  const registrationTotal = basePrice * delegates.length;

  const dinnerCount = delegates.filter((d) => d.dinner).length;
  const dinnerTotal = dinnerCount * PRICING.dinner;

  const accommodationNights = delegates.reduce(
    (sum, d) => sum + d.accommodationNights,
    0
  );
  const accommodationTotal = accommodationNights * PRICING.accommodation;

  const masterclassCount = delegates.filter(
    (d) => d.masterclass !== null
  ).length;
  const masterclassTotal = masterclassCount * PRICING.masterclass;

  const subtotal = registrationTotal + dinnerTotal + accommodationTotal + masterclassTotal;
  const discount = subtotal - totalAmount;

  // Format dates
  const formatDate = (date: Date | undefined) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("en-AU", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const eventDates = eventStartDate && eventEndDate
    ? `${formatDate(eventStartDate)} - ${formatDate(eventEndDate)}`
    : "";

  return (
    <Html>
      <Head />
      <Preview>Registration Confirmed - {conferenceTitle}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Heading style={headerTitle}>INVOICE</Heading>
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

          {/* Bill To Section */}
          <Section style={section}>
            <Heading as="h2" style={sectionHeading}>
              Bill To
            </Heading>
            <Text style={text}>
              <strong>{primaryDelegate.firstName} {primaryDelegate.lastName}</strong>
            </Text>
            <Text style={text}>{primaryDelegate.jobTitle}</Text>
            <Text style={text}>{primaryDelegate.organization}</Text>
            <Text style={text}>{primaryDelegate.email}</Text>
            <Text style={text}>{primaryDelegate.phone}</Text>
          </Section>

          <Hr style={divider} />

          {/* Event Details */}
          <Section style={section}>
            <Heading as="h2" style={sectionHeading}>
              Event Details
            </Heading>
            <Text style={text}>
              <strong>Conference:</strong> {conferenceTitle}
            </Text>
            {eventVenue && (
              <Text style={text}>
                <strong>Venue:</strong> {eventVenue}
              </Text>
            )}
            {eventDates && (
              <Text style={text}>
                <strong>Dates:</strong> {eventDates}
              </Text>
            )}
            <Text style={text}>
              <strong>Registration Tier:</strong> Early bird - Register by{" "}
              {selectedPriceTier.date}
            </Text>
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

            {/* Conference Registration */}
            <div style={tableRow}>
              <Text style={tableCell}>Conference Registration</Text>
              <Text style={tableCellRight}>{delegates.length}</Text>
              <Text style={tableCellRight}>${basePrice}</Text>
              <Text style={tableCellRight}>${registrationTotal}</Text>
            </div>

            {/* Delegates List */}
            {delegates.map((delegate, index) => (
              <div key={index} style={delegateRow}>
                <Text style={delegateText}>
                  • {delegate.firstName} {delegate.lastName} - {delegate.jobTitle}, {delegate.organization}
                </Text>
              </div>
            ))}

            {/* Networking Dinner */}
            {dinnerCount > 0 && (
              <div style={tableRow}>
                <Text style={tableCell}>Networking Dinner</Text>
                <Text style={tableCellRight}>{dinnerCount}</Text>
                <Text style={tableCellRight}>${PRICING.dinner}</Text>
                <Text style={tableCellRight}>${dinnerTotal}</Text>
              </div>
            )}

            {/* Masterclass */}
            {masterclassCount > 0 && (
              <div style={tableRow}>
                <Text style={tableCell}>Post-Conference Masterclass</Text>
                <Text style={tableCellRight}>{masterclassCount}</Text>
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

            {discount > 0 && (
              <div style={summaryRow}>
                <Text style={summaryLabel}>
                  Discount {promoCode ? `(${promoCode})` : ""}:
                </Text>
                <Text style={summaryValueDiscount}>
                  -${discount.toLocaleString()}
                </Text>
              </div>
            )}

            <div style={totalRow}>
              <Text style={totalLabel}>Total (AUD):</Text>
              <Text style={totalValue}>${totalAmount.toLocaleString()}</Text>
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
              • This invoice serves as confirmation of your registration.
            </Text>
            <Text style={noteText}>
              • Please retain this email for your records.
            </Text>
            <Text style={noteText}>
              • You will receive further communication regarding event details
              closer to the conference date.
            </Text>
            <Text style={noteText}>
              • For any queries, please contact us at {configs.contact.email}
            </Text>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              Indigenous Conferences Services (ICS)
            </Text>
            <Text style={footerText}>
              Email: {configs.contact.email}
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

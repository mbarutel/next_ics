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
import { ExhibitorType } from "@/lib/types";
import { PRICING } from "@/helpers/data";
import { configs } from "@/lib/data";

interface ExhibitorConfirmationEmailProps {
  conferenceTitle: string;
  organizationName: string;
  organizationAddress: {
    street: string;
    city: string;
    stateProvince: string;
    postalCode: string;
    country: string;
  };
  productServicesDescription: string;
  exhibitors: ExhibitorType[];
  reference: string;
  invoiceNumber: string;
  invoiceDate: string;
  totalAmount: number;
  eventVenue?: string;
  eventStartDate?: Date;
  eventEndDate?: Date;
}

export default function ExhibitorConfirmationEmail({
  conferenceTitle,
  organizationName,
  organizationAddress,
  productServicesDescription,
  exhibitors,
  reference,
  invoiceNumber,
  invoiceDate,
  totalAmount,
  eventVenue,
  eventStartDate,
  eventEndDate,
}: ExhibitorConfirmationEmailProps) {
  const primaryExhibitor = exhibitors[0];

  // Calculate counts for display
  const dinnerCount = exhibitors.filter((e) => e.dinner).length;
  const dinnerTotal = dinnerCount * PRICING.dinner;

  const accommodationNights = exhibitors.reduce(
    (sum, e) => sum + e.accommodationNights,
    0
  );
  const accommodationTotal = accommodationNights * PRICING.accommodation;

  const masterclassCount = exhibitors.filter((e) => e.masterclass !== null && e.masterclass !== "").length;
  const masterclassTotal = masterclassCount * PRICING.masterclass;

  const exhibitorRegistrationTotal = PRICING.exhibitorRegistration * exhibitors.length;

  // Format event dates
  const formatEventDate = (date: Date | undefined) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const eventStartFormatted = formatEventDate(eventStartDate);
  const eventEndFormatted = formatEventDate(eventEndDate);

  return (
    <Html>
      <Head />
      <Preview>Exhibitor Registration Confirmed - {conferenceTitle}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Heading style={headerTitle}>EXHIBITOR REGISTRATION</Heading>
            <Text style={headerSubtitle}>ICS Conference</Text>
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

          {/* Success Message */}
          <Section style={section}>
            <Text style={text}>
              Thank you for registering as an exhibitor! Your registration has been received and confirmed.
            </Text>
          </Section>

          <Hr style={divider} />

          {/* Primary Contact Information */}
          <Section style={section}>
            <Heading as="h2" style={sectionHeading}>
              Primary Contact
            </Heading>
            <Text style={text}>
              <strong>{primaryExhibitor.firstName} {primaryExhibitor.lastName}</strong>
            </Text>
            <Text style={text}>{primaryExhibitor.jobTitle}</Text>
            <Text style={text}>{primaryExhibitor.email}</Text>
            <Text style={text}>{primaryExhibitor.phone}</Text>
          </Section>

          <Hr style={divider} />

          {/* Organization Details */}
          <Section style={section}>
            <Heading as="h2" style={sectionHeading}>
              Organization Information
            </Heading>
            <Text style={text}>
              <strong>{organizationName}</strong>
            </Text>
            <Text style={text}>{organizationAddress.street}</Text>
            <Text style={text}>
              {organizationAddress.city}, {organizationAddress.stateProvince} {organizationAddress.postalCode}
            </Text>
            <Text style={text}>{organizationAddress.country}</Text>
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
            {eventVenue && (
              <Text style={text}>
                <strong>Venue:</strong> {eventVenue}
              </Text>
            )}
            {(eventStartFormatted || eventEndFormatted) && (
              <Text style={text}>
                <strong>Dates:</strong>{" "}
                {eventStartFormatted && eventEndFormatted && eventStartFormatted !== eventEndFormatted
                  ? `${eventStartFormatted} - ${eventEndFormatted}`
                  : eventStartFormatted || eventEndFormatted}
              </Text>
            )}
          </Section>

          <Hr style={divider} />

          {/* Product & Services */}
          <Section style={section}>
            <Heading as="h2" style={sectionHeading}>
              Products & Services
            </Heading>
            <Text style={descriptionStyle}>{productServicesDescription}</Text>
          </Section>

          <Hr style={divider} />

          {/* All Exhibitors */}
          <Section style={section}>
            <Heading as="h2" style={sectionHeading}>
              Exhibitor Representatives ({exhibitors.length})
            </Heading>
            {exhibitors.map((exhibitor, index) => (
              <div key={index} style={exhibitorCard}>
                <Text style={exhibitorName}>
                  {index + 1}. {exhibitor.firstName} {exhibitor.lastName}
                </Text>
                <Text style={exhibitorDetails}>{exhibitor.jobTitle}</Text>
                <Text style={exhibitorDetails}>{exhibitor.email}</Text>
                <Text style={exhibitorDetails}>{exhibitor.phone}</Text>
                {(exhibitor.dinner || exhibitor.masterclass || exhibitor.accommodationNights > 0) && (
                  <div style={exhibitorExtras}>
                    <Text style={extrasTitle}>Event Preferences:</Text>
                    {exhibitor.dinner && (
                      <Text style={extraItem}>• Conference Networking Dinner</Text>
                    )}
                    {exhibitor.masterclass && (
                      <Text style={extraItem}>• Masterclass: {exhibitor.masterclass}</Text>
                    )}
                    {exhibitor.accommodationNights > 0 && (
                      <Text style={extraItem}>
                        • Accommodation: {exhibitor.accommodationNights} night{exhibitor.accommodationNights > 1 ? "s" : ""}
                      </Text>
                    )}
                    <Text style={extraItem}>• Dietary Requirements: {exhibitor.diet}</Text>
                  </div>
                )}
              </div>
            ))}
          </Section>

          <Hr style={divider} />

          {/* Order Summary */}
          <Section style={orderSection}>
            <Heading as="h2" style={sectionHeading}>
              Order Summary
            </Heading>

            {/* Registration */}
            <div style={orderRow}>
              <Text style={orderLabel}>
                Exhibitor Registration ({exhibitors.length} × ${PRICING.exhibitorRegistration})
              </Text>
              <Text style={orderValue}>${exhibitorRegistrationTotal.toLocaleString()}</Text>
            </div>

            {/* Dinner */}
            {dinnerCount > 0 && (
              <div style={orderRow}>
                <Text style={orderLabel}>
                  Networking Dinner ({dinnerCount} × ${PRICING.dinner})
                </Text>
                <Text style={orderValue}>${dinnerTotal.toLocaleString()}</Text>
              </div>
            )}

            {/* Masterclass */}
            {masterclassCount > 0 && (
              <div style={orderRow}>
                <Text style={orderLabel}>
                  Masterclass ({masterclassCount} × ${PRICING.masterclass})
                </Text>
                <Text style={orderValue}>${masterclassTotal.toLocaleString()}</Text>
              </div>
            )}

            {/* Accommodation */}
            {accommodationNights > 0 && (
              <div style={orderRow}>
                <Text style={orderLabel}>
                  Accommodation ({accommodationNights} night{accommodationNights > 1 ? "s" : ""} × ${PRICING.accommodation})
                </Text>
                <Text style={orderValue}>${accommodationTotal.toLocaleString()}</Text>
              </div>
            )}

            {/* Total */}
            <div style={totalRow}>
              <Text style={totalLabel}>TOTAL</Text>
              <Text style={totalValue}>${totalAmount.toLocaleString()}</Text>
            </div>
          </Section>

          <Hr style={divider} />

          {/* Reference */}
          <Section style={section}>
            <Text style={text}>
              <strong>How did you hear about us?</strong> {reference}
            </Text>
          </Section>

          {/* Payment Notes */}
          <Section style={notesSection}>
            <Heading as="h3" style={sectionHeading}>
              Next Steps
            </Heading>
            <Text style={noteText}>
              • An invoice for ${totalAmount.toLocaleString()} will be sent separately with payment instructions
            </Text>
            <Text style={noteText}>
              • You will receive further details about booth setup and exhibitor guidelines closer to the event
            </Text>
            <Text style={noteText}>
              • Please contact us if you have any questions or need to make changes to your registration
            </Text>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              ICS Conference Registration
            </Text>
            <Text style={footerText}>
              {configs.contact.address}
            </Text>
            <Text style={footerText}>
              Email: {configs.contact.email}
            </Text>
            <Text style={footerText}>
              Phone: {configs.contact.phone}
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// Styles
const main = {
  backgroundColor: "#f3f4f6",
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  margin: "40px auto",
  backgroundColor: "#ffffff",
  borderRadius: "8px",
  overflow: "hidden" as const,
  maxWidth: "600px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
};

const header = {
  backgroundColor: "#155de9",
  padding: "32px 24px",
  textAlign: "center" as const,
};

const headerTitle = {
  fontSize: "28px",
  fontWeight: "bold",
  color: "#ffffff",
  margin: "0 0 8px 0",
  letterSpacing: "1px",
};

const headerSubtitle = {
  fontSize: "16px",
  color: "#dbeafe",
  margin: "0",
};

const invoiceBar = {
  backgroundColor: "#1f2937",
  padding: "16px 24px",
  display: "flex",
  justifyContent: "space-between",
};

const invoiceText = {
  fontSize: "14px",
  color: "#ffffff",
  margin: "0",
};

const section = {
  padding: "24px",
};

const sectionHeading = {
  fontSize: "18px",
  fontWeight: "600",
  color: "#1f2937",
  margin: "0 0 16px 0",
  borderBottom: "2px solid #155de9",
  paddingBottom: "8px",
};

const text = {
  fontSize: "14px",
  color: "#374151",
  lineHeight: "24px",
  margin: "4px 0",
};

const descriptionStyle = {
  fontSize: "14px",
  color: "#374151",
  lineHeight: "24px",
  margin: "8px 0",
  padding: "12px",
  backgroundColor: "#f9fafb",
  borderRadius: "4px",
  borderLeft: "4px solid #155de9",
};

const divider = {
  borderColor: "#e5e7eb",
  margin: "0",
};

const exhibitorCard = {
  marginBottom: "20px",
  padding: "16px",
  backgroundColor: "#f9fafb",
  borderRadius: "6px",
  border: "1px solid #e5e7eb",
};

const exhibitorName = {
  fontSize: "16px",
  fontWeight: "600",
  color: "#1f2937",
  margin: "0 0 8px 0",
};

const exhibitorDetails = {
  fontSize: "14px",
  color: "#6b7280",
  margin: "4px 0",
};

const exhibitorExtras = {
  marginTop: "12px",
  paddingTop: "12px",
  borderTop: "1px solid #e5e7eb",
};

const extrasTitle = {
  fontSize: "13px",
  fontWeight: "600",
  color: "#374151",
  margin: "0 0 8px 0",
};

const extraItem = {
  fontSize: "13px",
  color: "#6b7280",
  margin: "4px 0",
};

const orderSection = {
  padding: "24px",
  backgroundColor: "#f9fafb",
};

const orderRow = {
  display: "flex",
  justifyContent: "space-between",
  padding: "12px 0",
  borderBottom: "1px solid #e5e7eb",
};

const orderLabel = {
  fontSize: "14px",
  color: "#374151",
  margin: "0",
};

const orderValue = {
  fontSize: "14px",
  color: "#1f2937",
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

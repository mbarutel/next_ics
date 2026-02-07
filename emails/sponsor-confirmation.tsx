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
import { SponsorRepresentativeType } from "@/lib/types";
import { PRICING } from "@/helpers/data";
import { configs } from "@/lib/data";

interface SponsorPackageInfo {
  id: string;
  name: string;
  price: number;
  badge: string;
  color: string;
  includedRepresentatives: number;
  includedDinners: number;
  benefits: readonly string[];
}

interface SponsorConfirmationEmailProps {
  conferenceTitle: string;
  organizationName: string;
  organizationAddress: {
    street: string;
    city: string;
    stateProvince: string;
    postalCode: string;
    country: string;
  };
  selectedPackage: SponsorPackageInfo;
  sponsors: SponsorRepresentativeType[];
  reference: string;
  invoiceNumber: string;
  invoiceDate: string;
  totalAmount: number;
  eventVenue?: string;
  eventStartDate?: Date;
  eventEndDate?: Date;
}

export default function SponsorConfirmationEmail({
  conferenceTitle,
  organizationName,
  organizationAddress,
  selectedPackage,
  sponsors,
  reference,
  invoiceNumber,
  invoiceDate,
  totalAmount,
  eventVenue,
  eventStartDate,
  eventEndDate,
}: SponsorConfirmationEmailProps) {
  const primarySponsor = sponsors[0];

  // Calculate counts for display
  const dinnerCount = sponsors.filter((s) => s.dinner).length;
  const dinnerTotal = dinnerCount * PRICING.dinner;

  const accommodationNights = sponsors.reduce(
    (sum, s) => sum + s.accommodationNights,
    0
  );
  const accommodationTotal = accommodationNights * PRICING.accommodation;

  const masterclassCount = sponsors.filter((s) => s.masterclass !== null && s.masterclass !== "").length;
  const masterclassTotal = masterclassCount * PRICING.masterclass;

  const packageTotal = selectedPackage.price;

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
      <Preview>{selectedPackage.name} Registration Confirmed - {conferenceTitle}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Heading style={headerTitle}>SPONSORSHIP REGISTRATION</Heading>
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
              Thank you for becoming a {selectedPackage.name}! Your sponsorship registration has been received and confirmed.
            </Text>
          </Section>

          <Hr style={divider} />

          {/* Primary Contact Information */}
          <Section style={section}>
            <Heading as="h2" style={sectionHeading}>
              Primary Contact
            </Heading>
            <Text style={text}>
              <strong>{primarySponsor.firstName} {primarySponsor.lastName}</strong>
            </Text>
            <Text style={text}>{primarySponsor.jobTitle}</Text>
            <Text style={text}>{primarySponsor.email}</Text>
            <Text style={text}>{primarySponsor.phone}</Text>
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

          {/* Sponsorship Package */}
          <Section style={packageSection}>
            <Heading as="h2" style={sectionHeading}>
              {selectedPackage.badge} {selectedPackage.name}
            </Heading>
            <Text style={packagePrice}>
              ${selectedPackage.price.toLocaleString()}
            </Text>
            <Heading as="h3" style={benefitsHeading}>
              What&apos;s Included:
            </Heading>
            <ul style={benefitsList}>
              {selectedPackage.benefits.map((benefit, index) => (
                <li key={index} style={benefitItem}>
                  {benefit}
                </li>
              ))}
            </ul>
          </Section>

          <Hr style={divider} />

          {/* All Sponsors */}
          <Section style={section}>
            <Heading as="h2" style={sectionHeading}>
              Sponsor Representatives ({sponsors.length})
            </Heading>
            {sponsors.map((sponsor, index) => (
              <div key={index} style={sponsorCard}>
                <Text style={sponsorName}>
                  {index + 1}. {sponsor.firstName} {sponsor.lastName}
                </Text>
                <Text style={sponsorDetails}>{sponsor.jobTitle}</Text>
                <Text style={sponsorDetails}>{sponsor.email}</Text>
                <Text style={sponsorDetails}>{sponsor.phone}</Text>
                {(sponsor.dinner || sponsor.masterclass || sponsor.accommodationNights > 0) && (
                  <div style={sponsorExtras}>
                    <Text style={extrasTitle}>Event Preferences:</Text>
                    {sponsor.dinner && (
                      <Text style={extraItem}>• Conference Networking Dinner</Text>
                    )}
                    {sponsor.masterclass && (
                      <Text style={extraItem}>• Masterclass: {sponsor.masterclass}</Text>
                    )}
                    {sponsor.accommodationNights > 0 && (
                      <Text style={extraItem}>
                        • Accommodation: {sponsor.accommodationNights} night{sponsor.accommodationNights > 1 ? "s" : ""}
                      </Text>
                    )}
                    <Text style={extraItem}>• Dietary Requirements: {sponsor.diet}</Text>
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

            {/* Package */}
            <div style={orderRow}>
              <Text style={orderLabel}>
                {selectedPackage.name} Package
              </Text>
              <Text style={orderValue}>${packageTotal.toLocaleString()}</Text>
            </div>

            {/* Show inclusions */}
            <div style={{ ...orderRow, borderBottom: 'none', paddingTop: '8px', paddingBottom: '4px' }}>
              <Text style={{ fontSize: '12px', color: '#10b981', margin: '0' }}>
                ✓ Includes {selectedPackage.includedRepresentatives} complimentary representative{selectedPackage.includedRepresentatives > 1 ? 's' : ''}
              </Text>
            </div>
            <div style={{ ...orderRow, borderBottom: '1px solid #e5e7eb', paddingTop: '0', paddingBottom: '8px' }}>
              <Text style={{ fontSize: '12px', color: '#10b981', margin: '0' }}>
                ✓ Includes {selectedPackage.includedDinners} complimentary dinner{selectedPackage.includedDinners > 1 ? 's' : ''}
              </Text>
            </div>

            {/* Additional Representatives */}
            {(() => {
              const additionalReps = Math.max(0, sponsors.length - selectedPackage.includedRepresentatives);
              return additionalReps > 0 && (
                <div style={orderRow}>
                  <Text style={orderLabel}>
                    Additional Representatives ({additionalReps} × ${PRICING.sponsorRegistration})
                  </Text>
                  <Text style={orderValue}>
                    ${(additionalReps * PRICING.sponsorRegistration).toLocaleString()}
                  </Text>
                </div>
              );
            })()}

            {/* Dinner (only if additional dinners selected) */}
            {(() => {
              const totalDinners = sponsors.filter((s) => s.dinner).length;
              const additionalDinners = Math.max(0, totalDinners - selectedPackage.includedDinners);
              return additionalDinners > 0 && (
                <div style={orderRow}>
                  <Text style={orderLabel}>
                    Additional Dinners ({additionalDinners} × ${PRICING.dinner})
                  </Text>
                  <Text style={orderValue}>${(additionalDinners * PRICING.dinner).toLocaleString()}</Text>
                </div>
              );
            })()}

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
              • You will receive further details about your sponsorship benefits and logo submission guidelines closer to the event
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

const divider = {
  borderColor: "#e5e7eb",
  margin: "0",
};

const packageSection = {
  padding: "24px",
  backgroundColor: "#f0f9ff",
  borderLeft: "4px solid #155de9",
};

const packagePrice = {
  fontSize: "32px",
  fontWeight: "bold",
  color: "#155de9",
  margin: "16px 0",
};

const benefitsHeading = {
  fontSize: "16px",
  fontWeight: "600",
  color: "#1f2937",
  margin: "16px 0 12px 0",
};

const benefitsList = {
  margin: "0",
  padding: "0 0 0 24px",
  listStyleType: "none",
};

const benefitItem = {
  fontSize: "14px",
  color: "#374151",
  lineHeight: "24px",
  margin: "8px 0",
  paddingLeft: "8px",
  position: "relative" as const,
};

const sponsorCard = {
  marginBottom: "20px",
  padding: "16px",
  backgroundColor: "#f9fafb",
  borderRadius: "6px",
  border: "1px solid #e5e7eb",
};

const sponsorName = {
  fontSize: "16px",
  fontWeight: "600",
  color: "#1f2937",
  margin: "0 0 8px 0",
};

const sponsorDetails = {
  fontSize: "14px",
  color: "#6b7280",
  margin: "4px 0",
};

const sponsorExtras = {
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

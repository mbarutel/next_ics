import { DelegateType, ExhibitorSubmissionType, SponsorSubmissionType } from "@/lib/types";
import { validatePromoCode, calculateDiscount } from "./promo-codes";
import { PRICING, SPONSOR_PACKAGES } from "./data";

type SubmissionType = {
  delegates: DelegateType[];
  selectedPriceTier?: { price: number; date: string };
  promoCode: string;
};

export function calculateOrderTotal(submission: SubmissionType): number {
  // Calculate subtotal (before discount)
  let subtotal = 0;

  // Base price per delegate
  const basePrice = submission.selectedPriceTier?.price || 0;
  subtotal += basePrice * submission.delegates.length;

  // Add dinner costs
  const dinnerCount = submission.delegates.filter((d) => d.dinner).length;
  subtotal += dinnerCount * PRICING.dinner;

  // Add accommodation costs
  const accommodationNights = submission.delegates.reduce(
    (sum, d) => sum + d.accommodationNights,
    0
  );
  subtotal += accommodationNights * PRICING.accommodation;

  // Add masterclass costs
  const masterclassCount = submission.delegates.filter(
    (d) => d.masterclass !== null
  ).length;
  subtotal += masterclassCount * PRICING.masterclass;

  // Calculate discount if promo code is applied
  let discount = 0;
  if (submission.promoCode) {
    const promoValidation = validatePromoCode(submission.promoCode, submission);
    if (promoValidation.isValid && promoValidation.promoCode) {
      discount = calculateDiscount(promoValidation.promoCode, submission);
    }
  }

  return subtotal - discount;
}

export function calculateExhibitorTotal(submission: ExhibitorSubmissionType): number {
  let subtotal = 0;

  // Base registration: $750 per exhibitor
  subtotal += PRICING.exhibitorRegistration * submission.exhibitors.length;

  // Dinner costs
  const dinnerCount = submission.exhibitors.filter((e) => e.dinner).length;
  subtotal += dinnerCount * PRICING.dinner;

  // Accommodation costs
  const accommodationNights = submission.exhibitors.reduce(
    (sum, e) => sum + e.accommodationNights,
    0
  );
  subtotal += accommodationNights * PRICING.accommodation;

  // Masterclass costs
  const masterclassCount = submission.exhibitors.filter(
    (e) => e.masterclass !== null && e.masterclass !== ""
  ).length;
  subtotal += masterclassCount * PRICING.masterclass;

  return subtotal; // No discount for exhibitors
}

export function calculateSponsorTotal(submission: SponsorSubmissionType): number {
  let total = 0;

  // Base package price (gold/silver/bronze)
  total += submission.packagePrice;

  // Get package details for inclusions
  const selectedPackage = SPONSOR_PACKAGES[submission.selectedPackage!];
  const includedReps = selectedPackage.includedRepresentatives;
  const includedDinners = selectedPackage.includedDinners;
  const totalReps = submission.sponsors.length;
  
  // Calculate additional representative fees (beyond included count)
  const additionalReps = Math.max(0, totalReps - includedReps);
  total += additionalReps * PRICING.sponsorRegistration;

  // Calculate dinner costs (only for dinners beyond included count)
  const totalDinners = submission.sponsors.filter((s) => s.dinner).length;
  const additionalDinners = Math.max(0, totalDinners - includedDinners);
  total += additionalDinners * PRICING.dinner;

  // Accommodation costs (for ALL representatives - not included in package)
  const accommodationNights = submission.sponsors.reduce(
    (sum, s) => sum + s.accommodationNights,
    0
  );
  total += accommodationNights * PRICING.accommodation;

  // Masterclass costs (for ALL representatives - not included in package)
  const masterclassCount = submission.sponsors.filter(
    (s) => s.masterclass !== null && s.masterclass !== ""
  ).length;
  total += masterclassCount * PRICING.masterclass;

  return total; // No discount for sponsors
}

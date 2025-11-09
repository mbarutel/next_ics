import { DinnerParticipantType } from "@/lib/types";
import { PRICING } from "./data";

type PaperSubmissionType = {
  dinnerParticipants: DinnerParticipantType[];
  accomodation: string;
  masterclass: string;
  discount?: string;
};

/**
 * Calculates the total cost for a paper submission
 * Includes: speaker registration, dinner, accommodation, masterclass
 */
export function calculatePaperTotal(submission: PaperSubmissionType): number {
  // Base speaker registration fee
  let total = PRICING.speakerRegistration;

  // Add dinner costs
  const dinnerCount = submission.dinnerParticipants.length;
  total += dinnerCount * PRICING.dinner;

  // Add accommodation costs
  const accommodationNights = submission.accomodation
    ? parseInt(submission.accomodation, 10) || 0
    : 0;
  total += accommodationNights * PRICING.accommodation;

  // Add masterclass cost
  if (submission.masterclass) {
    total += PRICING.masterclass;
  }

  // Apply discount if provided (assuming it's a dollar amount)
  const discountAmount = submission.discount ? parseFloat(submission.discount) || 0 : 0;
  total -= discountAmount;

  return Math.max(0, total); // Ensure non-negative
}

/**
 * Calculates the subtotal before discount
 */
export function calculatePaperSubtotal(submission: PaperSubmissionType): number {
  let subtotal = PRICING.speakerRegistration;

  const dinnerCount = submission.dinnerParticipants.length;
  subtotal += dinnerCount * PRICING.dinner;

  const accommodationNights = submission.accomodation
    ? parseInt(submission.accomodation, 10) || 0
    : 0;
  subtotal += accommodationNights * PRICING.accommodation;

  if (submission.masterclass) {
    subtotal += PRICING.masterclass;
  }

  return subtotal;
}

/**
 * Gets the breakdown of costs for display
 */
export function getPaperPricingBreakdown(submission: PaperSubmissionType) {
  const speakerRegistration = PRICING.speakerRegistration;

  const dinnerCount = submission.dinnerParticipants.length;
  const dinnerTotal = dinnerCount * PRICING.dinner;

  const accommodationNights = submission.accomodation
    ? parseInt(submission.accomodation, 10) || 0
    : 0;
  const accommodationTotal = accommodationNights * PRICING.accommodation;

  const masterclassTotal = submission.masterclass ? PRICING.masterclass : 0;

  const subtotal = speakerRegistration + dinnerTotal + accommodationTotal + masterclassTotal;

  const discountAmount = submission.discount ? parseFloat(submission.discount) || 0 : 0;

  const total = Math.max(0, subtotal - discountAmount);

  return {
    speakerRegistration,
    dinnerCount,
    dinnerTotal,
    accommodationNights,
    accommodationTotal,
    masterclassTotal,
    subtotal,
    discountAmount,
    total,
  };
}

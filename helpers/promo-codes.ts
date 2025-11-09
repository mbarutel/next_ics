import { DelegateType } from "@/lib/types";
import { PRICING } from "./data";

export type PromoCodeType = {
  code: string;
  description: string;
  type: "percentage" | "fixed" | "buy_x_get_y";
  value?: number; // For percentage or fixed discount
  buyX?: number; // For buy X get Y deals
  getY?: number; // For buy X get Y deals
  minDelegates?: number; // Minimum delegates required
  expiryDate?: Date;
};

// Promo codes database
export const PROMO_CODES: PromoCodeType[] = [
  {
    code: "EARLYBIRD",
    description: "Early bird discount - 15% off total",
    type: "percentage",
    value: 15,
    expiryDate: new Date("2025-12-31"),
  },
  {
    code: "SAVE20",
    description: "Save $20 per delegate",
    type: "fixed",
    value: 20,
  },
  {
    code: "REGISTER3PAY2",
    description: "Register 3 delegates, pay for 2",
    type: "buy_x_get_y",
    buyX: 3,
    getY: 2,
    minDelegates: 3,
  },
  {
    code: "BULK5",
    description: "Register 5 delegates, pay for 4",
    type: "buy_x_get_y",
    buyX: 5,
    getY: 4,
    minDelegates: 5,
  },
  {
    code: "CONFERENCE2025",
    description: "10% off entire order",
    type: "percentage",
    value: 10,
  },
  {
    code: "FIRSTTIME",
    description: "First-time attendee - $50 off",
    type: "fixed",
    value: 50,
  },
];

export type PromoValidationResult = {
  isValid: boolean;
  message: string;
  promoCode?: PromoCodeType;
  discount?: number;
};

type SubmissionType = {
  delegates: DelegateType[];
  selectedPriceTier?: { price: number; date: string };
  promoCode: string;
};

/**
 * Validates a promo code and returns validation result
 */
export function validatePromoCode(
  code: string,
  submission: SubmissionType
): PromoValidationResult {
  const trimmedCode = code.trim().toUpperCase();

  // Find the promo code
  const promoCode = PROMO_CODES.find((p) => p.code === trimmedCode);

  if (!promoCode) {
    return {
      isValid: false,
      message: "Invalid promo code. Please check and try again.",
    };
  }

  // Check if expired
  if (promoCode.expiryDate && new Date() > promoCode.expiryDate) {
    return {
      isValid: false,
      message: "This promo code has expired.",
    };
  }

  // Check minimum delegates requirement
  const delegateCount = submission.delegates.length;
  if (promoCode.minDelegates && delegateCount < promoCode.minDelegates) {
    return {
      isValid: false,
      message: `This promo code requires at least ${promoCode.minDelegates} delegates. You currently have ${delegateCount}.`,
    };
  }

  // Calculate discount
  const discount = calculateDiscount(promoCode, submission);

  return {
    isValid: true,
    message: `${promoCode.description} - You save $${discount}!`,
    promoCode,
    discount,
  };
}

/**
 * Calculates the discount amount based on promo code type
 */
export function calculateDiscount(
  promoCode: PromoCodeType,
  submission: SubmissionType
): number {
  const basePrice = submission.selectedPriceTier?.price || 0;
  const delegateCount = submission.delegates.length;

  switch (promoCode.type) {
    case "percentage":
      // Calculate total first
      const total = calculateTotal(submission);
      return Math.round((total * (promoCode.value || 0)) / 100);

    case "fixed":
      // Fixed discount per delegate
      return (promoCode.value || 0) * delegateCount;

    case "buy_x_get_y":
      // Buy X get Y free logic
      const buyX = promoCode.buyX || 0;
      const payFor = promoCode.getY || 0;

      // Calculate how many complete sets of X delegates
      const sets = Math.floor(delegateCount / buyX);
      // Calculate free delegates
      const freeDelegates = sets * (buyX - payFor);
      // Discount is the number of free delegates times base price
      return freeDelegates * basePrice;

    default:
      return 0;
  }
}

/**
 * Calculates the total cost including all extras
 */
function calculateTotal(submission: SubmissionType): number {
  let total = 0;

  // Base price per delegate
  const basePrice = submission.selectedPriceTier?.price || 0;
  total += basePrice * submission.delegates.length;

  // Add dinner costs
  const dinnerCount = submission.delegates.filter((d) => d.dinner).length;
  total += dinnerCount * PRICING.dinner;

  // Add accommodation costs
  const accommodationNights = submission.delegates.reduce(
    (sum, d) => sum + d.accommodationNights,
    0
  );
  total += accommodationNights * PRICING.accommodation;

  // Add masterclass costs
  const masterclassCount = submission.delegates.filter(
    (d) => d.masterclass !== null
  ).length;
  total += masterclassCount * PRICING.masterclass;

  return total;
}

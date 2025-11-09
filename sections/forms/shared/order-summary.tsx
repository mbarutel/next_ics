"use client";

import { DelegateType } from "@/lib/types";
import { validatePromoCode, calculateDiscount } from "@/helpers/promo-codes";
import { IoReceiptOutline, IoCheckmarkCircle } from "react-icons/io5";
import { PRICING } from "@/helpers/data";

type SubmissionType = {
  conferenceTitle?: string;
  selectedPriceTier?: { price: number; date: string };
  delegates: DelegateType[];
  promoCode: string;
};

export default function OrderSummary({
  submission,
}: {
  submission: SubmissionType;
}) {
  // Calculate subtotal (before discount)
  const calculateSubtotal = () => {
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
  };

  const subtotal = calculateSubtotal();
  const dinnerCount = submission.delegates.filter((d) => d.dinner).length;
  const accommodationNights = submission.delegates.reduce(
    (sum, d) => sum + d.accommodationNights,
    0
  );
  const masterclassCount = submission.delegates.filter(
    (d) => d.masterclass !== null
  ).length;

  // Calculate discount if promo code is applied
  let discount = 0;
  let promoValidation = null;
  if (submission.promoCode) {
    promoValidation = validatePromoCode(submission.promoCode, submission);
    if (promoValidation.isValid && promoValidation.promoCode) {
      discount = calculateDiscount(promoValidation.promoCode, submission);
    }
  }

  const total = subtotal - discount;

  // Don't show summary if basic info is missing
  if (!submission.conferenceTitle || !submission.selectedPriceTier) {
    return null;
  }

  return (
    <div className="w-full form_section_wrapper">
      <div className="form-section-spacing">
        <h2 className="form-heading flex-center-gap-1">
          <IoReceiptOutline className="w-6 h-6" />
          Order Summary
        </h2>
        <p className="text-xs sm:text-sm text-gray-400">
          Review your registration details and total cost
        </p>
      </div>

      <div className="bg-stone-700/50 border-2 border-yellow-400/30 rounded-md p-4 sm:p-6">
        {/* Conference & Price Tier */}
        <div className="mb-4 sm:mb-6">
          <h3 className="text-sm font-semibold text-yellow-400 uppercase tracking-wide mb-3">
            Event Details
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between items-start">
              <span className="text-sm text-gray-400">Conference:</span>
              <span className="text-sm font-semibold text-white text-right">
                {submission.conferenceTitle}
              </span>
            </div>
            <div className="flex justify-between items-start">
              <span className="text-sm text-gray-400">Registration Tier:</span>
              <span className="text-sm font-medium text-white text-right">
                Early bird - Register by {submission.selectedPriceTier?.date || "TBD"}
              </span>
            </div>
          </div>
        </div>

        <hr className="my-4" />

        {/* Delegates */}
        <div className="form-section-spacing">
          <h3 className="text-sm font-semibold text-yellow-400 uppercase tracking-wide mb-3">
            Delegates ({submission.delegates.length})
          </h3>
          <div className="space-y-3">
            {submission.delegates.map((delegate, index) => (
              <div
                key={index}
                className="bg-stone-800 rounded-md p-3 border border-stone-600"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-semibold text-white text-sm">
                      {delegate.firstName && delegate.lastName
                        ? `${delegate.firstName} ${delegate.lastName}`
                        : `Delegate ${index + 1}`}
                    </p>
                    {delegate.organization && (
                      <p className="text-xs text-gray-400">
                        {delegate.organization}
                      </p>
                    )}
                  </div>
                  <span className="text-sm font-bold text-yellow-400">
                    ${submission.selectedPriceTier?.price || 0}
                  </span>
                </div>

                {/* Extras */}
                {(delegate.dinner ||
                  delegate.masterclass ||
                  delegate.accommodationNights > 0) && (
                  <div className="text-xs text-gray-300 space-y-1 mt-2 pt-2 border-t border-stone-600">
                    {delegate.dinner && (
                      <div className="flex-center-gap-1">
                        <IoCheckmarkCircle className="icon-sm text-green-600" />
                        <span>
                          Gala Dinner (+${PRICING.dinner})
                        </span>
                      </div>
                    )}
                    {delegate.masterclass && (
                      <div className="flex-center-gap-1">
                        <IoCheckmarkCircle className="icon-sm text-green-600" />
                        <span>
                          Masterclass: {delegate.masterclass} (+$
                          {PRICING.masterclass})
                        </span>
                      </div>
                    )}
                    {delegate.accommodationNights > 0 && (
                      <div className="flex-center-gap-1">
                        <IoCheckmarkCircle className="icon-sm text-green-600" />
                        <span>
                          Accommodation: {delegate.accommodationNights} night
                          {delegate.accommodationNights > 1 ? "s" : ""} (+$
                          {delegate.accommodationNights * PRICING.accommodation})
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <hr className="my-4" />

        {/* Cost Breakdown */}
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-yellow-400 uppercase tracking-wide mb-3">
            Cost Breakdown
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">
                Registration ({submission.delegates.length} ×{" "}
                ${submission.selectedPriceTier?.price || 0})
              </span>
              <span className="font-medium text-white">
                $
                {(submission.selectedPriceTier?.price || 0) *
                  submission.delegates.length}
              </span>
            </div>

            {dinnerCount > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-400">
                  Gala Dinner ({dinnerCount} × ${PRICING.dinner})
                </span>
                <span className="font-medium text-white">
                  ${dinnerCount * PRICING.dinner}
                </span>
              </div>
            )}

            {masterclassCount > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-400">
                  Masterclass ({masterclassCount} × ${PRICING.masterclass})
                </span>
                <span className="font-medium text-white">
                  ${masterclassCount * PRICING.masterclass}
                </span>
              </div>
            )}

            {accommodationNights > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-400">
                  Accommodation ({accommodationNights} night
                  {accommodationNights > 1 ? "s" : ""} × ${PRICING.accommodation}
                  )
                </span>
                <span className="font-medium text-white">
                  ${accommodationNights * PRICING.accommodation}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Show discount if promo code is valid */}
        {discount > 0 && (
          <>
            <div className="border-t border-stone-600 pt-3 pb-3">
              <div className="flex justify-between items-center text-green-400">
                <div className="flex items-center gap-2">
                  <IoCheckmarkCircle className="icon-sm" />
                  <span className="text-sm font-semibold">
                    Promo Code ({submission.promoCode})
                  </span>
                </div>
                <span className="text-sm font-bold">-${discount.toLocaleString()}</span>
              </div>
              {promoValidation?.promoCode?.description && (
                <p className="text-xs text-gray-400 mt-1 ml-6">
                  {promoValidation.promoCode.description}
                </p>
              )}
            </div>
          </>
        )}

        <div className="border-t-2 border-yellow-400/30 pt-4">
          <div className="space-y-2">
            {discount > 0 && (
              <div className="flex justify-between items-center text-sm text-gray-400">
                <span>Subtotal</span>
                <span className="font-medium">${subtotal.toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-white">Total</span>
              <span className="text-2xl font-extrabold text-yellow-400">
                ${total.toLocaleString()}
              </span>
            </div>
            {discount > 0 && (
              <p className="text-xs text-green-400 font-medium">
                You saved ${discount.toLocaleString()}!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { PaperSubmissionType } from "@/lib/types";
import { validatePromoCode, calculateDiscount } from "@/helpers/promo-codes";
import { IoReceiptOutline, IoCheckmarkCircle } from "react-icons/io5";
import { PRICING } from "@/helpers/data";

export default function SpeakerOrderSummary({
  submission,
}: {
  submission: PaperSubmissionType;
}) {
  // Calculate subtotal (before discount)
  const calculateSubtotal = () => {
    let total = 0;

    // Base price per speaker (speaker registration fee)
    const basePrice = PRICING.speakerRegistration;
    total += basePrice * submission.speakers.length;

    // Add dinner costs
    const dinnerCount = submission.speakers.filter((s) => s.dinner).length;
    total += dinnerCount * PRICING.dinner;

    // Add accommodation costs
    const accommodationNights = submission.speakers.reduce(
      (sum, s) => sum + s.accommodationNights,
      0
    );
    total += accommodationNights * PRICING.accommodation;

    // Add masterclass costs
    const masterclassCount = submission.speakers.filter(
      (s) => s.masterclass !== null
    ).length;
    total += masterclassCount * PRICING.masterclass;

    return total;
  };

  const subtotal = calculateSubtotal();
  const dinnerCount = submission.speakers.filter((s) => s.dinner).length;
  const accommodationNights = submission.speakers.reduce(
    (sum, s) => sum + s.accommodationNights,
    0
  );
  const masterclassCount = submission.speakers.filter(
    (s) => s.masterclass !== null
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
  if (!submission.conferenceTitle) {
    return null;
  }

  return (
    <div>
      <div className="form-section-spacing">
        <h2 className="text-2xl sm:text-3xl font-semibold text-yellow-400 mb-2 flex-center-gap-1">
          <IoReceiptOutline className="w-6 h-6" />
          Order Summary
        </h2>
        <p className="text-xs sm:text-sm text-white">
          Review your paper submission details and total cost
        </p>
      </div>

      <div className="bg-stone-800 border-2 border-yellow-400/30 rounded-md p-4 sm:p-6">
        {/* Conference & Paper Info */}
        <div className="mb-4 sm:mb-6">
          <h3 className="text-sm font-semibold text-yellow-400 uppercase tracking-wide mb-3">
            Event Details
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between items-start">
              <span className="text-sm text-gray-300">Conference:</span>
              <span className="text-sm font-semibold text-white text-right max-w-[60%]">
                {submission.conferenceTitle}
              </span>
            </div>
            {submission.paperTitle && (
              <div className="flex justify-between items-start">
                <span className="text-sm text-gray-300">Paper Title:</span>
                <span className="text-sm font-medium text-white text-right max-w-[60%]">
                  {submission.paperTitle}
                </span>
              </div>
            )}
          </div>
        </div>

        <hr className="border-stone-600 my-4" />

        {/* Speakers */}
        <div className="form-section-spacing">
          <h3 className="text-sm font-semibold text-yellow-400 uppercase tracking-wide mb-3">
            Speakers ({submission.speakers.length})
          </h3>
          <div className="space-y-3">
            {submission.speakers.map((speaker, index) => (
              <div
                key={index}
                className="bg-stone-900 rounded-md p-3 border border-stone-600"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-semibold text-white text-sm">
                      {speaker.firstName && speaker.lastName
                        ? `${speaker.firstName} ${speaker.lastName}`
                        : `Speaker ${index + 1}`}
                    </p>
                    {speaker.organization && (
                      <p className="text-xs text-gray-400">
                        {speaker.organization}
                      </p>
                    )}
                  </div>
                  <span className="text-sm font-bold text-yellow-400">
                    ${PRICING.speakerRegistration}
                  </span>
                </div>

                {/* Extras */}
                {(speaker.dinner ||
                  speaker.masterclass ||
                  speaker.accommodationNights > 0) && (
                  <div className="text-xs text-gray-400 space-y-1 mt-2 pt-2 border-t border-stone-600">
                    {speaker.dinner && (
                      <div className="flex-center-gap-1">
                        <IoCheckmarkCircle className="icon-sm text-green-400" />
                        <span>
                          Gala Dinner (+${PRICING.dinner})
                        </span>
                      </div>
                    )}
                    {speaker.masterclass && (
                      <div className="flex-center-gap-1">
                        <IoCheckmarkCircle className="icon-sm text-green-400" />
                        <span>
                          Masterclass: {speaker.masterclass} (+$
                          {PRICING.masterclass})
                        </span>
                      </div>
                    )}
                    {speaker.accommodationNights > 0 && (
                      <div className="flex-center-gap-1">
                        <IoCheckmarkCircle className="icon-sm text-green-400" />
                        <span>
                          Accommodation: {speaker.accommodationNights} night
                          {speaker.accommodationNights > 1 ? "s" : ""} (+$
                          {speaker.accommodationNights * PRICING.accommodation})
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <hr className="border-stone-600 my-4" />

        {/* Cost Breakdown */}
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-yellow-400 uppercase tracking-wide mb-3">
            Cost Breakdown
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-300">
                Speaker Registration ({submission.speakers.length} ×{" "}
                ${PRICING.speakerRegistration})
              </span>
              <span className="font-medium text-white">
                $
                {PRICING.speakerRegistration *
                  submission.speakers.length}
              </span>
            </div>

            {dinnerCount > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-300">
                  Gala Dinner ({dinnerCount} × ${PRICING.dinner})
                </span>
                <span className="font-medium text-white">
                  ${dinnerCount * PRICING.dinner}
                </span>
              </div>
            )}

            {masterclassCount > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-300">
                  Masterclass ({masterclassCount} × ${PRICING.masterclass})
                </span>
                <span className="font-medium text-white">
                  ${masterclassCount * PRICING.masterclass}
                </span>
              </div>
            )}

            {accommodationNights > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-300">
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
              <div className="flex justify-between items-center text-sm text-gray-300">
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

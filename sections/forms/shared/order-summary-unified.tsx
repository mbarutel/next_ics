"use client";

import { DelegateType, SpeakerParticipantType, PaperSubmissionType } from "@/lib/types";
import { validatePromoCode, calculateDiscount } from "@/helpers/promo-codes";
import { IoReceiptOutline, IoCheckmarkCircle } from "react-icons/io5";
import { PRICING } from "@/helpers/data";

type DelegateSubmissionType = {
  conferenceTitle?: string;
  selectedPriceTier?: { price: number; date: string };
  delegates: DelegateType[];
  promoCode: string;
  paperTitle?: never;
  speakers?: never;
};

type SpeakerSubmissionType = {
  conferenceTitle: string | null;
  speakers: SpeakerParticipantType[];
  paperTitle: string;
  paperDescription: string;
  promoCode: string;
  selectedPriceTier?: never;
  delegates?: never;
};

type UnifiedSubmissionType = DelegateSubmissionType | SpeakerSubmissionType;

interface OrderSummaryProps {
  submission: UnifiedSubmissionType;
  participantType?: 'delegate' | 'speaker';
}

export default function OrderSummary({
  submission,
  participantType = 'delegates' in submission ? 'delegate' : 'speaker',
}: OrderSummaryProps) {
  const isDelegateForm = participantType === 'delegate';
  const participants = isDelegateForm
    ? (submission as DelegateSubmissionType).delegates
    : (submission as SpeakerSubmissionType).speakers;

  // Calculate subtotal (before discount)
  const calculateSubtotal = () => {
    let total = 0;

    if (isDelegateForm) {
      const delegateSubmission = submission as DelegateSubmissionType;
      const basePrice = delegateSubmission.selectedPriceTier?.price || 0;
      total += basePrice * delegateSubmission.delegates.length;

      // Add dinner costs
      const dinnerCount = delegateSubmission.delegates.filter((d) => d.dinner).length;
      total += dinnerCount * PRICING.dinner;

      // Add accommodation costs
      const accommodationNights = delegateSubmission.delegates.reduce(
        (sum, d) => sum + d.accommodationNights,
        0
      );
      total += accommodationNights * PRICING.accommodation;

      // Add masterclass costs
      const masterclassCount = delegateSubmission.delegates.filter(
        (d) => d.masterclass !== null
      ).length;
      total += masterclassCount * PRICING.masterclass;
    } else {
      const speakerSubmission = submission as SpeakerSubmissionType;
      // Base price per speaker
      total += PRICING.speakerRegistration * speakerSubmission.speakers.length;

      // Add dinner costs
      const dinnerCount = speakerSubmission.speakers.filter((s) => s.dinner).length;
      total += dinnerCount * PRICING.dinner;

      // Add accommodation costs
      const accommodationNights = speakerSubmission.speakers.reduce(
        (sum, s) => sum + s.accommodationNights,
        0
      );
      total += accommodationNights * PRICING.accommodation;

      // Add masterclass costs
      const masterclassCount = speakerSubmission.speakers.filter(
        (s) => s.masterclass !== null
      ).length;
      total += masterclassCount * PRICING.masterclass;
    }

    return total;
  };

  const subtotal = calculateSubtotal();
  const dinnerCount = participants.filter((p) => p.dinner).length;
  const accommodationNights = participants.reduce(
    (sum, p) => sum + p.accommodationNights,
    0
  );
  const masterclassCount = participants.filter(
    (p) => p.masterclass !== null
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

  if (isDelegateForm && !(submission as DelegateSubmissionType).selectedPriceTier) {
    return null;
  }

  const basePrice = isDelegateForm
    ? (submission as DelegateSubmissionType).selectedPriceTier?.price || 0
    : PRICING.speakerRegistration;

  const participantLabel = isDelegateForm ? 'Delegates' : 'Speakers';
  const participantSingular = isDelegateForm ? 'Delegate' : 'Speaker';
  const registrationLabel = isDelegateForm ? 'Delegate Registration' : 'Speaker Registration';

  return (
    <div className="w-full form_section_wrapper">
      <div className="form-section-spacing">
        <h2 className="text-2xl sm:text-3xl font-semibold text-yellow-400 mb-2 flex-center-gap-1">
          <IoReceiptOutline className="w-6 h-6" />
          Order Summary
        </h2>
        <p className="text-xs sm:text-sm text-white">
          Review your {isDelegateForm ? 'registration' : 'paper submission'} details and total cost
        </p>
      </div>

      <div className="bg-stone-800 border-2 border-yellow-400/30 rounded-md p-4 sm:p-6">
        {/* Conference & Details */}
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
            {isDelegateForm && (submission as DelegateSubmissionType).selectedPriceTier && (
              <div className="flex justify-between items-start">
                <span className="text-sm text-gray-300">Registration Tier:</span>
                <span className="text-sm font-medium text-white text-right">
                  Early bird - Register by {(submission as DelegateSubmissionType).selectedPriceTier?.date || "TBD"}
                </span>
              </div>
            )}
            {!isDelegateForm && (submission as SpeakerSubmissionType).paperTitle && (
              <div className="flex justify-between items-start">
                <span className="text-sm text-gray-300">Paper Title:</span>
                <span className="text-sm font-medium text-white text-right max-w-[60%]">
                  {(submission as SpeakerSubmissionType).paperTitle}
                </span>
              </div>
            )}
          </div>
        </div>

        <hr className="border-stone-600 my-4" />

        {/* Participants */}
        <div className="form-section-spacing">
          <h3 className="text-sm font-semibold text-yellow-400 uppercase tracking-wide mb-3">
            {participantLabel} ({participants.length})
          </h3>
          <div className="space-y-3">
            {participants.map((participant, index) => (
              <div
                key={index}
                className="bg-stone-900 rounded-md p-3 border border-stone-600"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-semibold text-white text-sm">
                      {participant.firstName && participant.lastName
                        ? `${participant.firstName} ${participant.lastName}`
                        : `${participantSingular} ${index + 1}`}
                    </p>
                    {participant.organization && (
                      <p className="text-xs text-gray-400">
                        {participant.organization}
                      </p>
                    )}
                  </div>
                  <span className="text-sm font-bold text-yellow-400">
                    ${basePrice}
                  </span>
                </div>

                {/* Extras */}
                {(participant.dinner ||
                  participant.masterclass ||
                  participant.accommodationNights > 0) && (
                  <div className="text-xs text-gray-400 space-y-1 mt-2 pt-2 border-t border-stone-600">
                    {participant.dinner && (
                      <div className="flex-center-gap-1">
                        <IoCheckmarkCircle className="icon-sm text-green-400" />
                        <span>
                          Gala Dinner (+${PRICING.dinner})
                        </span>
                      </div>
                    )}
                    {participant.masterclass && (
                      <div className="flex-center-gap-1">
                        <IoCheckmarkCircle className="icon-sm text-green-400" />
                        <span>
                          Masterclass: {participant.masterclass} (+$
                          {PRICING.masterclass})
                        </span>
                      </div>
                    )}
                    {participant.accommodationNights > 0 && (
                      <div className="flex-center-gap-1">
                        <IoCheckmarkCircle className="icon-sm text-green-400" />
                        <span>
                          Accommodation: {participant.accommodationNights} night
                          {participant.accommodationNights > 1 ? "s" : ""} (+$
                          {participant.accommodationNights * PRICING.accommodation})
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
                {registrationLabel} ({participants.length} × ${basePrice})
              </span>
              <span className="font-medium text-white">
                ${basePrice * participants.length}
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

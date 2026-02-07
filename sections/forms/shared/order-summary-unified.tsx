"use client";

import { DelegateType, SpeakerParticipantType, ExhibitorType, PaperSubmissionType, SponsorRepresentativeType } from "@/lib/types";
import { validatePromoCode, calculateDiscount } from "@/helpers/promo-codes";
import { IoReceiptOutline, IoCheckmarkCircle } from "react-icons/io5";
import { PRICING, SPONSOR_PACKAGES } from "@/helpers/data";

type DelegateSubmissionType = {
  conferenceTitle?: string;
  selectedPriceTier?: { price: number; date: string };
  delegates: DelegateType[];
  promoCode: string;
  paperTitle?: never;
  speakers?: never;
  exhibitors?: never;
};

type SpeakerSubmissionType = {
  conferenceTitle: string | null;
  speakers: SpeakerParticipantType[];
  paperTitle: string;
  paperDescription: string;
  promoCode: string;
  selectedPriceTier?: never;
  delegates?: never;
  exhibitors?: never;
};

type ExhibitorSubmissionType = {
  conferenceTitle: string | null;
  exhibitors: ExhibitorType[];
  organizationName: string;
  promoCode?: never;
  selectedPriceTier?: never;
  delegates?: never;
  speakers?: never;
  paperTitle?: never;
  sponsors?: never;
  selectedPackage?: never;
  packagePrice?: never;
};

type SponsorSubmissionType = {
  conferenceTitle: string | null;
  sponsors: SponsorRepresentativeType[];
  organizationName: string;
  selectedPackage: 'gold' | 'silver' | 'bronze' | null;
  packagePrice: number;
  promoCode?: never;
  selectedPriceTier?: never;
  delegates?: never;
  speakers?: never;
  paperTitle?: never;
  exhibitors?: never;
};

type UnifiedSubmissionType = DelegateSubmissionType | SpeakerSubmissionType | ExhibitorSubmissionType | SponsorSubmissionType;

interface OrderSummaryProps {
  submission: UnifiedSubmissionType;
  participantType?: 'delegate' | 'speaker' | 'exhibitor' | 'sponsor';
}

export default function OrderSummary({
  submission,
  participantType = 'delegates' in submission ? 'delegate' : 'speakers' in submission ? 'speaker' : 'sponsors' in submission ? 'sponsor' : 'exhibitor',
}: OrderSummaryProps) {
  const isDelegateForm = participantType === 'delegate';
  const isSpeakerForm = participantType === 'speaker';
  const isExhibitorForm = participantType === 'exhibitor';
  const isSponsorForm = participantType === 'sponsor';
  
  const participants = isDelegateForm
    ? (submission as DelegateSubmissionType).delegates
    : isSpeakerForm
    ? (submission as SpeakerSubmissionType).speakers
    : isSponsorForm
    ? (submission as SponsorSubmissionType).sponsors
    : (submission as ExhibitorSubmissionType).exhibitors;

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
    } else if (isSpeakerForm) {
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
    } else if (isSponsorForm) {
      const sponsorSubmission = submission as SponsorSubmissionType;
      
      // Don't calculate if package not selected yet
      if (!sponsorSubmission.selectedPackage) {
        return 0;
      }
      
      const selectedPackage = SPONSOR_PACKAGES[sponsorSubmission.selectedPackage];
      const includedReps = selectedPackage.includedRepresentatives;
      const includedDinners = selectedPackage.includedDinners;
      
      // Package price
      total += sponsorSubmission.packagePrice;

      // Additional representative fees (beyond included count)
      const totalReps = sponsorSubmission.sponsors.length;
      const additionalReps = Math.max(0, totalReps - includedReps);
      total += additionalReps * PRICING.sponsorRegistration;

      // Dinner costs (only beyond included count)
      const totalDinners = sponsorSubmission.sponsors.filter((s) => s.dinner).length;
      const additionalDinners = Math.max(0, totalDinners - includedDinners);
      total += additionalDinners * PRICING.dinner;

      // Accommodation costs
      const accommodationNights = sponsorSubmission.sponsors.reduce(
        (sum, s) => sum + s.accommodationNights,
        0
      );
      total += accommodationNights * PRICING.accommodation;

      // Masterclass costs
      const masterclassCount = sponsorSubmission.sponsors.filter(
        (s) => s.masterclass !== null && s.masterclass !== ""
      ).length;
      total += masterclassCount * PRICING.masterclass;
    } else {
      const exhibitorSubmission = submission as ExhibitorSubmissionType;
      // Base price per exhibitor
      total += PRICING.exhibitorRegistration * exhibitorSubmission.exhibitors.length;

      // Add dinner costs
      const dinnerCount = exhibitorSubmission.exhibitors.filter((e) => e.dinner).length;
      total += dinnerCount * PRICING.dinner;

      // Add accommodation costs
      const accommodationNights = exhibitorSubmission.exhibitors.reduce(
        (sum, e) => sum + e.accommodationNights,
        0
      );
      total += accommodationNights * PRICING.accommodation;

      // Add masterclass costs
      const masterclassCount = exhibitorSubmission.exhibitors.filter(
        (e) => e.masterclass !== null && e.masterclass !== ""
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

  // Calculate discount if promo code is applied (not for exhibitors or sponsors)
  let discount = 0;
  let promoValidation = null;
  if (submission.promoCode && !isExhibitorForm && !isSponsorForm) {
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

  if (isSponsorForm && !(submission as SponsorSubmissionType).selectedPackage) {
    return null;
  }

  const basePrice = isDelegateForm
    ? (submission as DelegateSubmissionType).selectedPriceTier?.price || 0
    : isSpeakerForm
    ? PRICING.speakerRegistration
    : isSponsorForm
    ? 0 // Sponsors don't have per-person base price, they have package price
    : PRICING.exhibitorRegistration;

  const participantLabel = isDelegateForm ? 'Delegates' : isSpeakerForm ? 'Speakers' : isSponsorForm ? 'Sponsor Representatives' : 'Exhibitors';
  const participantSingular = isDelegateForm ? 'Delegate' : isSpeakerForm ? 'Speaker' : isSponsorForm ? 'Sponsor Representative' : 'Exhibitor';
  const registrationLabel = isDelegateForm ? 'Delegate Registration' : isSpeakerForm ? 'Speaker Registration' : isSponsorForm ? 'Sponsorship Package' : 'Exhibitor Registration';

  return (
    <div className="w-full form_section_wrapper">
      <div className="form-section-spacing">
        <h2 className="text-2xl sm:text-3xl font-semibold text-yellow-400 mb-2 flex-center-gap-1">
          <IoReceiptOutline className="w-6 h-6" />
          Order Summary
        </h2>
        <p className="text-xs sm:text-sm text-white">
          Review your {isDelegateForm ? 'registration' : isSpeakerForm ? 'paper submission' : isSponsorForm ? 'sponsorship registration' : 'exhibitor registration'} details and total cost
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
            {isSpeakerForm && (submission as SpeakerSubmissionType).paperTitle && (
              <div className="flex justify-between items-start">
                <span className="text-sm text-gray-300">Paper Title:</span>
                <span className="text-sm font-medium text-white text-right max-w-[60%]">
                  {(submission as SpeakerSubmissionType).paperTitle}
                </span>
              </div>
            )}
            {(isExhibitorForm || isSponsorForm) && (submission as ExhibitorSubmissionType | SponsorSubmissionType).organizationName && (
              <div className="flex justify-between items-start">
                <span className="text-sm text-gray-300">Organization:</span>
                <span className="text-sm font-medium text-white text-right max-w-[60%]">
                  {(submission as ExhibitorSubmissionType | SponsorSubmissionType).organizationName}
                </span>
              </div>
            )}
            {isSponsorForm && (submission as SponsorSubmissionType).selectedPackage && (
              <div className="flex justify-between items-start">
                <span className="text-sm text-gray-300">Package:</span>
                <span className="text-sm font-medium text-white text-right">
                  {SPONSOR_PACKAGES[(submission as SponsorSubmissionType).selectedPackage!].badge} {SPONSOR_PACKAGES[(submission as SponsorSubmissionType).selectedPackage!].name}
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
                    {('organization' in participant && (participant as DelegateType | SpeakerParticipantType).organization) && (
                      <p className="text-xs text-gray-400">
                        {(participant as DelegateType | SpeakerParticipantType).organization}
                      </p>
                    )}
                  </div>
                  {!isSponsorForm && (
                    <span className="text-sm font-bold text-yellow-400">
                      ${basePrice}
                    </span>
                  )}
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
                          Networking Dinner (+${PRICING.dinner})
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
            {isSponsorForm ? (
              <>
                <div className="flex justify-between">
                  <span className="text-gray-300">
                    {SPONSOR_PACKAGES[(submission as SponsorSubmissionType).selectedPackage!].name}
                  </span>
                  <span className="font-medium text-white">
                    ${(submission as SponsorSubmissionType).packagePrice.toLocaleString()}
                  </span>
                </div>
                
                {/* Show what's included */}
                <div className="text-xs text-green-400 space-y-0.5 pl-4">
                  <div>✓ Includes {SPONSOR_PACKAGES[(submission as SponsorSubmissionType).selectedPackage!].includedRepresentatives} complimentary representative{SPONSOR_PACKAGES[(submission as SponsorSubmissionType).selectedPackage!].includedRepresentatives > 1 ? 's' : ''}</div>
                  <div>✓ Includes {SPONSOR_PACKAGES[(submission as SponsorSubmissionType).selectedPackage!].includedDinners} complimentary dinner{SPONSOR_PACKAGES[(submission as SponsorSubmissionType).selectedPackage!].includedDinners > 1 ? 's' : ''}</div>
                </div>
                
                {/* Additional representatives */}
                {(() => {
                  const sponsorSub = submission as SponsorSubmissionType;
                  const pkg = SPONSOR_PACKAGES[sponsorSub.selectedPackage!];
                  const additionalReps = Math.max(0, sponsorSub.sponsors.length - pkg.includedRepresentatives);
                  return additionalReps > 0 && (
                    <div className="flex justify-between mt-2">
                      <span className="text-gray-300">
                        Additional Representatives ({additionalReps} × ${PRICING.sponsorRegistration})
                      </span>
                      <span className="font-medium text-white">
                        ${(additionalReps * PRICING.sponsorRegistration).toLocaleString()}
                      </span>
                    </div>
                  );
                })()}
              </>
            ) : (
              <div className="flex justify-between">
                <span className="text-gray-300">
                  {registrationLabel} ({participants.length} × ${basePrice})
                </span>
                <span className="font-medium text-white">
                  ${basePrice * participants.length}
                </span>
              </div>
            )}

            {isSponsorForm ? (
              (() => {
                const sponsorSub = submission as SponsorSubmissionType;
                const pkg = SPONSOR_PACKAGES[sponsorSub.selectedPackage!];
                const totalDinners = sponsorSub.sponsors.filter((s) => s.dinner).length;
                const additionalDinners = Math.max(0, totalDinners - pkg.includedDinners);
                return additionalDinners > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-300">
                      Additional Dinners ({additionalDinners} × ${PRICING.dinner})
                    </span>
                    <span className="font-medium text-white">
                      ${additionalDinners * PRICING.dinner}
                    </span>
                  </div>
                );
              })()
            ) : (
              dinnerCount > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-300">
                    Networking Dinner ({dinnerCount} × ${PRICING.dinner})
                  </span>
                  <span className="font-medium text-white">
                    ${dinnerCount * PRICING.dinner}
                  </span>
                </div>
              )
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

"use client";

import { validatePromoCode, PromoValidationResult } from "@/helpers/promo-codes";
import { IoTicketOutline, IoCheckmarkCircleOutline, IoCloseCircleOutline } from "react-icons/io5";
import { useState } from "react";
import { DelegateType, SpeakerParticipantType } from "@/lib/types";

type SubmissionType = {
  delegates?: DelegateType[];
  speakers?: SpeakerParticipantType[];
  selectedPriceTier?: { price: number; date: string };
  promoCode: string;
};

export default function PromoCode<T extends SubmissionType>({
  submission,
  setSubmission,
}: {
  submission: T;
  setSubmission: React.Dispatch<React.SetStateAction<T>>;
}) {
  const [isVerifying, setIsVerifying] = useState(false);
  const [validationResult, setValidationResult] = useState<PromoValidationResult | null>(null);

  const handleChange = (value: string) => {
    setSubmission((prev) => ({
      ...prev,
      promoCode: value,
    }));
    // Reset validation when user types
    setValidationResult(null);
  };

  const handleVerify = () => {
    if (!submission.promoCode) return;

    setIsVerifying(true);
    // Simulate API delay
    setTimeout(() => {
      const result = validatePromoCode(submission.promoCode, submission);
      setValidationResult(result);
      setIsVerifying(false);
    }, 800);
  };

  return (
    <div className="w-full form_section_wrapper">
      <div className="form-section-spacing">
        <h2 className="form-heading flex items-center gap-2">
          <IoTicketOutline className="w-6 h-6" />
          Promo Code
        </h2>
        <p className="text-xs sm:text-sm text-gray-400">
          Have a promo code? Enter it below to receive your discount
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <input
            type="text"
            name="promoCode"
            value={submission.promoCode}
            onChange={(e) => handleChange(e.target.value.toUpperCase())}
            placeholder="Enter promo code"
            className="w-full bg-transparent border-b border-b-white p-2 text-white placeholder-gray-400 uppercase placeholder:normal-case focus:outline-none focus:border-yellow-400 transition-colors"
          />
        </div>

        <button
          type="button"
          onClick={handleVerify}
          disabled={!submission.promoCode || isVerifying}
          className="px-6 py-3 bg-yellow-400 text-black font-semibold rounded-md hover:bg-yellow-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
        >
          {isVerifying ? "Verifying..." : "Apply Code"}
        </button>
      </div>

      {/* Validation feedback */}
      {validationResult?.isValid === true && (
        <div className="mt-3 p-3 bg-green-900/30 border border-green-600 rounded-md">
          <div className="flex items-start gap-2">
            <IoCheckmarkCircleOutline className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm text-green-400 font-medium">
                Promo code applied successfully!
              </p>
              <p className="text-xs text-green-300 mt-1">
                {validationResult.message}
              </p>
            </div>
          </div>
        </div>
      )}

      {validationResult?.isValid === false && (
        <div className="mt-3 p-3 bg-red-900/30 border border-red-600 rounded-md">
          <div className="flex items-start gap-2">
            <IoCloseCircleOutline className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm text-red-400 font-medium">
                {validationResult.message}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

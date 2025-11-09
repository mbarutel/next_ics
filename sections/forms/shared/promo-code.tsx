"use client";

import { validatePromoCode, PromoValidationResult } from "@/helpers/promo-codes";
import { IoTicketOutline, IoCheckmarkCircleOutline, IoCloseCircleOutline } from "react-icons/io5";
import { useState } from "react";
import { DelegateType } from "@/lib/types";

type SubmissionType = {
  delegates: DelegateType[];
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
    <div className="w-full">
      <div className="form-section-spacing">
        <h2 className="form-heading flex items-center gap-2">
          <IoTicketOutline className="w-6 h-6" />
          Promo Code
        </h2>
        <p className="text-xs sm:text-sm text-gray-600">
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
            className="w-full border-2 border-gray-300 rounded-md px-4 py-3 text-gray-900 uppercase placeholder:normal-case focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-colors"
          />
        </div>

        <button
          type="button"
          onClick={handleVerify}
          disabled={!submission.promoCode || isVerifying}
          className="px-6 py-3 bg-gray-100 text-gray-900 font-semibold rounded-md hover:bg-gray-200 transition-colors border-2 border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
        >
          {isVerifying ? "Verifying..." : "Apply Code"}
        </button>
      </div>

      {/* Validation feedback */}
      {validationResult?.isValid === true && (
        <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-md">
          <div className="flex items-start gap-2">
            <IoCheckmarkCircleOutline className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm text-green-700 font-medium">
                Promo code applied successfully!
              </p>
              <p className="text-xs text-green-600 mt-1">
                {validationResult.message}
              </p>
            </div>
          </div>
        </div>
      )}

      {validationResult?.isValid === false && (
        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-md">
          <div className="flex items-start gap-2">
            <IoCloseCircleOutline className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm text-red-700 font-medium">
                {validationResult.message}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

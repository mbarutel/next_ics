"use client";

import { useEffect } from "react";
import { generateMidEndMonthPriceTiers, getCurrentPriceTier, PriceTier } from "@/helpers/utils";
import { ConferenceType } from "@/lib/types";
import { clsx } from "clsx";
import { IoAlertCircleOutline } from "react-icons/io5";

type SubmissionType = {
  conferenceTitle?: string;
  selectedConference?: ConferenceType;
  selectedPriceTier?: PriceTier;
};

export default function PriceSelection<T extends SubmissionType>({
  submission,
  setSubmissionAction,
  error,
}: {
  submission: T;
  setSubmissionAction: React.Dispatch<React.SetStateAction<T>>;
  error?: string;
}) {
  // Get the walk-in date from the selected conference's start date
  const conferenceDate = submission.selectedConference?.date?.startDate;
  const walkInDate = conferenceDate ? new Date(conferenceDate) : new Date("2026-01-15");

  // Get delegation price from the selected conference's prices
  const delegationPrice = submission.selectedConference?.prices?.walkIn || 2500;

  const tiers = generateMidEndMonthPriceTiers({
    walkInDate,
    walkInPrice: delegationPrice,
    steps: 8,
    discountPerStep: 200,
    isPercentageDiscount: false,
  });

  const dateNow = new Date();

  // Auto-select the current tier based on today's date
  useEffect(() => {
    if (!submission.conferenceTitle) return; // Only auto-select if conference is chosen

    // Find the current applicable tier using the helper function
    const currentTier = getCurrentPriceTier(tiers);

    // If there's a current tier and nothing is selected, auto-select it
    if (currentTier && !submission.selectedPriceTier) {
      setSubmissionAction((prev) => ({
        ...prev,
        selectedPriceTier: currentTier,
      } as T));
    }
  }, [submission.conferenceTitle, tiers, submission.selectedPriceTier, setSubmissionAction]);

  return (
    <div id="price-selection" className="w-full">
      <div className="form-section-spacing">
        <h2 className="form-heading">Registration Pricing</h2>
        <p className="text-xs sm:text-sm text-gray-600">
          Your registration tier is automatically selected based on today's date. View all pricing tiers below.
        </p>
        {error && (
          <p className="text-red-600 text-sm font-medium mt-2 flex-center-gap-1">
            <IoAlertCircleOutline className="icon-sm" />
            {error}
          </p>
        )}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
        {tiers.map((tier, index) => {
          const tierDate = new Date(tier.date);
          const isExpired = dateNow > tierDate;
          const isCurrent =
            submission.selectedPriceTier?.price === tier.price &&
            submission.selectedPriceTier?.date === tier.date;
          const isUpcoming = dateNow < tierDate && !isCurrent;

          return (
            <div
              key={index}
              className={clsx(
                "relative border p-3 sm:p-4 rounded-md transition-all",
                {
                  // Current/Selected state
                  "bg-yellow-400/10 border-yellow-400 shadow-lg": isCurrent,

                  // Expired state
                  "bg-gray-100 border-gray-300 opacity-60": isExpired,

                  // Upcoming state
                  "bg-blue-50 border-blue-300": isUpcoming,
                }
              )}
            >
              <div className="flex flex-col gap-1.5 sm:gap-2">
                <div className="text-left">
                  <p className="text-[9px] sm:text-[10px] uppercase tracking-wide text-gray-600">
                    Pay By
                  </p>
                  <p
                    className={clsx(
                      "text-xs sm:text-sm font-bold leading-tight italic",
                      isExpired ? "text-gray-500" : "text-yellow-600"
                    )}
                  >
                    {tier.date}
                  </p>
                </div>

                <div className="text-left">
                  <p className="text-[9px] sm:text-[10px] uppercase tracking-wide text-gray-600">
                    Price
                  </p>
                  <p
                    className={clsx(
                      "text-lg sm:text-xl font-bold leading-tight",
                      isExpired ? "text-gray-500" : "text-yellow-600"
                    )}
                  >
                    ${tier.price}
                  </p>
                </div>

                {/* Status badges */}
                {isExpired && (
                  <span className="absolute top-1 right-1 text-[9px] font-semibold text-red-600 uppercase bg-red-100 px-1.5 py-0.5 rounded-md">
                    Expired
                  </span>
                )}
                {isCurrent && (
                  <span className="absolute top-1 right-1 text-[9px] font-semibold text-green-600 uppercase bg-green-100 px-1.5 py-0.5 rounded-md">
                    Current
                  </span>
                )}
                {isUpcoming && (
                  <span className="absolute top-1 right-1 text-[9px] font-semibold text-blue-600 uppercase bg-blue-100 px-1.5 py-0.5 rounded-md">
                    Upcoming
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

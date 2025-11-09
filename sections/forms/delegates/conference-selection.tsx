"use client";

import { ConferenceType } from "@/lib/types";
import { clsx } from "clsx";
import Image from "next/image";
import { IoAlertCircleOutline, IoCheckmarkOutline, IoCalendarOutline, IoLocationOutline } from "react-icons/io5";

type SubmissionType = {
  conferenceTitle?: string;
  selectedConference?: ConferenceType;
};

export default function ConferenceSelection<T extends SubmissionType>({
  conferences,
  submission,
  setSubmissionAction,
  error,
}: {
  conferences: ConferenceType[];
  submission: T;
  setSubmissionAction: React.Dispatch<React.SetStateAction<T>>;
  error?: string;
}) {
  const handleChange = (conference: ConferenceType) => {
    setSubmissionAction((prev) => ({
      ...prev,
      conferenceTitle: conference.title,
      selectedConference: conference,
      // Reset price tier when conference changes so it can be auto-selected
      selectedPriceTier: undefined,
    } as T));
  };

  const formatDate = (date: Date | undefined) => {
    if (!date) return null;
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div id="conference-selection" className="w-full">
      <div className="form-section-spacing">
        <h2 className="form-heading">Select Your Conference</h2>
        <p className="text-xs sm:text-sm text-gray-600">
          Choose the conference you wish to attend
        </p>
        {error && (
          <p className="text-red-600 text-sm font-medium mt-2 flex-center-gap-1">
            <IoAlertCircleOutline className="icon-sm" />
            {error}
          </p>
        )}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {conferences.map((conf, index) => {
          const isSelected = submission.conferenceTitle === conf.title;
          const startDate = formatDate(conf.date?.startDate);
          const endDate = formatDate(conf.date?.endDate);

          return (
            <button
              key={index}
              type="button"
              onClick={() => handleChange(conf)}
              className={clsx(
                "relative border rounded-md transition-all overflow-hidden",
                "focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2",
                "text-left hover:shadow-lg",
                {
                  "bg-yellow-400/10 border-yellow-400 shadow-lg": isSelected,
                  "bg-white border-gray-300 hover:border-yellow-400": !isSelected,
                }
              )}
            >
              <div className="flex gap-3 sm:gap-4 p-3 sm:p-4">
                {/* Cover Image */}
                <div className="relative w-20 h-30 sm:w-24 sm:h-36 flex-shrink-0">
                  <Image
                    src={conf.coverImage.src}
                    alt={conf.coverImage.alt}
                    fill
                    className="object-cover rounded-md"
                  />
                  {isSelected && (
                    <div className="absolute inset-0 bg-yellow-400/20 border-2 border-yellow-400 rounded-md flex items-center justify-center">
                      <div className="bg-yellow-400 text-black rounded-full w-8 h-8 flex items-center justify-center">
                        <IoCheckmarkOutline className="w-5 h-5" strokeWidth={3} />
                      </div>
                    </div>
                  )}
                </div>

                {/* Conference Details */}
                <div className="flex-1 min-w-0">
                  <h3
                    className={clsx(
                      "font-semibold text-base sm:text-lg leading-tight mb-1 sm:mb-2",
                      isSelected ? "text-yellow-600" : "text-gray-900"
                    )}
                  >
                    {conf.title}
                  </h3>

                  <div className="flex flex-col gap-0.5 sm:gap-1 text-xs text-gray-700">
                    {(startDate || endDate) && (
                      <div className="flex-center-gap-1">
                        <IoCalendarOutline className="icon-sm" />
                        <span className="font-medium">
                          {startDate && endDate && startDate !== endDate
                            ? `${startDate} - ${endDate}`
                            : startDate || endDate}
                        </span>
                      </div>
                    )}

                    {conf.venue && (
                      <div className="flex-center-gap-1">
                        <IoLocationOutline className="icon-sm" />
                        <span className="truncate">{conf.venue}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

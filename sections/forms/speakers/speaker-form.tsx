"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { ConferenceType, PaperSubmissionType } from "@/lib/types";
import { saveFormData, loadFormData, clearFormData } from "@/helpers/local-storage";
import { validatePaperSubmission, hasPaperValidationErrors, getFirstPaperErrorField, PaperValidationErrors } from "@/helpers/validation";
import ConferenceSelection from "./conference-selection";
import PaperDetails from "./paper-details";
import SpeakerDetails from "./speakers";
import PromoCode from "../shared/promo-code";
import OrderSummary from "../shared/order-summary-unified";
import SharedReference from "../shared/reference";
import toast from "react-hot-toast";

const INITIAL_SUBMISSION: PaperSubmissionType = {
  conferenceTitle: null,
  speakers: [
    {
      firstName: "",
      lastName: "",
      jobTitle: "",
      organization: "",
      email: "",
      phone: "",
      diet: "normal",
      dinner: false,
      masterclass: null,
      accommodationNights: 0,
      biography: "",
    },
  ],
  paperTitle: "",
  paperDescription: "",
  promoCode: "",
  reference: "Manager, Family, Friend or Colleague",
};

export default function SpeakerForm({
  conferences,
  preSelectedConferenceSlug,
}: {
  conferences: ConferenceType[];
  preSelectedConferenceSlug?: string;
}) {
  const [submission, setSubmission] = useState<PaperSubmissionType>(INITIAL_SUBMISSION);
  const [isLoaded, setIsLoaded] = useState(false);
  const [errors, setErrors] = useState<PaperValidationErrors>({});
  const [showErrors, setShowErrors] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = loadFormData<PaperSubmissionType>("speaker-form");
    if (savedData) {
      setSubmission(savedData);
    } else if (preSelectedConferenceSlug) {
      // If no saved data but we have a pre-selected conference, set it
      const preSelectedConference = conferences.find(
        (c) => c.slug === preSelectedConferenceSlug
      );
      if (preSelectedConference) {
        setSubmission((prev) => ({
          ...prev,
          conferenceTitle: preSelectedConference.title,
        }));
      }
    }
    setIsLoaded(true);
  }, [preSelectedConferenceSlug, conferences]);

  // Debounced save function (2 seconds delay)
  const debouncedSave = useCallback((data: PaperSubmissionType) => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    debounceTimerRef.current = setTimeout(() => {
      saveFormData(data, "speaker-form");
    }, 2000);
  }, []);

  // Cleanup debounce timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  // Custom setState that handles saving
  const updateSubmission = useCallback((
    updater: React.SetStateAction<PaperSubmissionType>,
    saveImmediately: boolean = false
  ) => {
    setSubmission((prev) => {
      const newState = typeof updater === 'function' ? updater(prev) : updater;

      // Only save if component has loaded (prevents saving initial state)
      if (isLoaded) {
        if (saveImmediately) {
          // Immediate save for major actions
          saveFormData(newState, "speaker-form");
        } else {
          // Debounced save for text inputs
          debouncedSave(newState);
        }
      }

      return newState;
    });
  }, [isLoaded, debouncedSave]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate the form
    const validationErrors = validatePaperSubmission(submission);
    setErrors(validationErrors);
    setShowErrors(true);

    // If there are errors, scroll to the first error
    if (hasPaperValidationErrors(validationErrors)) {
      const firstErrorField = getFirstPaperErrorField(validationErrors);
      if (firstErrorField) {
        scrollToError(firstErrorField);
      }
      toast.error("Please fix the errors in the form before submitting");
      return;
    }

    setIsSubmitting(true);

    try {
      // Send to API
      const response = await fetch("/api/submit-paper", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...submission,
          submittedAt: new Date(),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit paper");
      }

      // Clear localStorage on successful submission
      clearFormData("speaker-form");

      // Show success message
      toast.success(
        `Paper submitted successfully! A confirmation email has been sent to ${submission.speakers[0].email}`
      );

      // Optional: Reset form or redirect
      // setSubmission(INITIAL_SUBMISSION);
      // window.location.href = "/thank-you";
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(
        "Failed to submit paper. Please try again or contact support if the problem persists."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToError = (fieldId: string) => {
    const element = document.getElementById(fieldId);
    if (element) {
      // Scroll with offset for fixed headers if any
      const yOffset = -100;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });

      // Focus the element if it's an input
      setTimeout(() => {
        if (element.tagName === "INPUT" || element.tagName === "SELECT" || element.tagName === "TEXTAREA") {
          element.focus();
        }
      }, 500);
    }
  };

  // Don't render until we've checked localStorage
  if (!isLoaded) {
    return (
      <div className="bg-white rounded-md shadow-lg border border-gray-200 overflow-hidden">
        <div className="px-8 py-20 text-center">
          <p className="text-gray-600">Loading form...</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Form Body */}
      <div className="space-y-6">
        {/* Section 1: Conference Selection */}
        <section className="w-full">
          <ConferenceSelection
            conferences={conferences}
            submission={submission}
            setSubmissionAction={(updater) => updateSubmission(updater, true)}
            error={showErrors ? errors.conferenceTitle : undefined}
          />
        </section>

        <hr className="my-2" />

        {/* Section 2: Paper Details */}
        <section className="w-full">
          <PaperDetails
            submission={submission}
            setSubmission={updateSubmission}
            errors={showErrors ? {
              paperTitle: errors.paperTitle,
              paperDescription: errors.paperDescription,
            } : undefined}
          />
        </section>

        <hr className="my-2" />

        {/* Section 3: Speaker Details */}
        <section className="w-full">
          <SpeakerDetails
            submission={submission}
            setSubmission={updateSubmission}
            errors={showErrors ? errors.speakers : undefined}
          />
        </section>

        <hr className="my-2" />

        {/* Section 4: Promo Code */}
        <section className="w-full">
          <PromoCode
            submission={submission}
            setSubmission={(updater) => updateSubmission(updater, true)}
          />
        </section>

        <hr className="my-2" />

        {/* Section 5: Order Summary */}
        <section className="w-full">
          <OrderSummary submission={submission} participantType="speaker" />
        </section>

        <hr className="my-2" />

        {/* Section 6: Reference */}
        <section className="w-full">
          <SharedReference
            submission={submission}
            setSubmission={(updater) => updateSubmission(updater, true)}
            error={showErrors ? errors.reference : undefined}
          />
        </section>
      </div>

      <hr className="my-6" />

      {/* Form Footer with Submit Button */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
        <p className="text-xs sm:text-sm text-white text-center sm:text-left">
          All fields are required unless marked optional
        </p>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 sm:px-8 py-3 bg-yellow-400 text-stone-900 font-semibold rounded-md hover:bg-yellow-300 transition-colors shadow-md hover:shadow-lg whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Submitting..." : "Submit Paper"}
        </button>
      </div>
    </form>
  );
}

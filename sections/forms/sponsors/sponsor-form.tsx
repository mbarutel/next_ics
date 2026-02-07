"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { ConferenceType, SponsorSubmissionType } from "@/lib/types";
import { saveFormData, loadFormData, clearFormData } from "@/helpers/local-storage";
import { validateSponsorSubmission, hasSponsorValidationErrors, getFirstSponsorErrorField, SponsorValidationErrors } from "@/helpers/validation";
import { calculateSponsorTotal } from "@/helpers/order-calculations";
import ConferenceSelection from "./conference-selection";
import OrganizationDetails from "./organization-details";
import PackageSelection from "./package-selection";
import SponsorDetails from "./sponsors";
import OrderSummary from "../shared/order-summary-unified";
import SharedReference from "../shared/reference";
import toast from "react-hot-toast";

const INITIAL_SUBMISSION: SponsorSubmissionType = {
  conferenceTitle: null,
  selectedConference: undefined,
  organizationName: "",
  organizationStreetAddress: "",
  organizationCity: "",
  organizationStateProvince: "",
  organizationPostalCode: "",
  organizationCountry: "",
  selectedPackage: null,
  packagePrice: 0,
  sponsors: [
    {
      firstName: "",
      lastName: "",
      jobTitle: "",
      email: "",
      phone: "",
      diet: "normal",
      dinner: false,
      masterclass: null,
      accommodationNights: 0,
    },
  ],
  reference: "Manager, Family, Friend or Colleague",
};

export default function SponsorForm({
  conferences,
  preSelectedConferenceSlug,
}: {
  conferences: ConferenceType[];
  preSelectedConferenceSlug?: string;
}) {
  const [submission, setSubmission] = useState<SponsorSubmissionType>(INITIAL_SUBMISSION);
  const [isLoaded, setIsLoaded] = useState(false);
  const [errors, setErrors] = useState<SponsorValidationErrors>({});
  const [showErrors, setShowErrors] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = loadFormData<SponsorSubmissionType>("sponsor-form");
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
          selectedConference: preSelectedConference,
        }));
      }
    }
    setIsLoaded(true);
  }, [preSelectedConferenceSlug, conferences]);

  // Debounced save function (2 seconds delay)
  const debouncedSave = useCallback((data: SponsorSubmissionType) => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    debounceTimerRef.current = setTimeout(() => {
      saveFormData(data, "sponsor-form");
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
    updater: React.SetStateAction<SponsorSubmissionType>,
    saveImmediately: boolean = false
  ) => {
    setSubmission((prev) => {
      const newState = typeof updater === 'function' ? updater(prev) : updater;

      // Only save if component has loaded (prevents saving initial state)
      if (isLoaded) {
        if (saveImmediately) {
          // Immediate save for major actions
          saveFormData(newState, "sponsor-form");
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
    const validationErrors = validateSponsorSubmission(submission);
    setErrors(validationErrors);
    setShowErrors(true);

    // If there are errors, scroll to the first error
    if (hasSponsorValidationErrors(validationErrors)) {
      const firstErrorField = getFirstSponsorErrorField(validationErrors);
      if (firstErrorField) {
        scrollToError(firstErrorField);
      }
      toast.error("Please fix the errors in the form before submitting");
      return;
    }

    setIsSubmitting(true);

    try {
      // Calculate total amount
      const totalAmount = calculateSponsorTotal(submission);

      // Send to API
      const response = await fetch("/api/submit-sponsor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...submission,
          submittedAt: new Date(),
          totalAmount,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit sponsor registration");
      }

      // Clear localStorage on successful submission
      clearFormData("sponsor-form");

      // Show success message
      toast.success(
        `Sponsor registration submitted successfully! A confirmation email has been sent to ${submission.sponsors[0].email}`
      );

      // Redirect to home page after successful submission
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(
        "Failed to submit sponsor registration. Please try again or contact support if the problem persists."
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

        {/* Section 2: Organization Details */}
        <section className="w-full">
          <OrganizationDetails
            submission={submission}
            setSubmission={updateSubmission}
            errors={showErrors ? {
              organizationName: errors.organizationName,
              organizationStreetAddress: errors.organizationStreetAddress,
              organizationCity: errors.organizationCity,
              organizationStateProvince: errors.organizationStateProvince,
              organizationPostalCode: errors.organizationPostalCode,
              organizationCountry: errors.organizationCountry,
            } : undefined}
          />
        </section>

        <hr className="my-2" />

        {/* Section 3: Package Selection */}
        <section className="w-full">
          <PackageSelection
            submission={submission}
            setSubmission={(updater) => updateSubmission(updater, true)}
            errors={showErrors ? {
              selectedPackage: errors.selectedPackage,
            } : undefined}
          />
        </section>

        <hr className="my-2" />

        {/* Section 4: Sponsor Representatives */}
        <section className="w-full">
          <SponsorDetails
            submission={submission}
            setSubmission={updateSubmission}
            masterclasses={submission.selectedConference?.masterclass}
            errors={showErrors ? errors.sponsors : undefined}
          />
        </section>

        <hr className="my-2" />

        {/* Section 5: Reference */}
        <section className="w-full">
          <SharedReference
            submission={submission}
            setSubmission={(updater) => updateSubmission(updater, true)}
            error={showErrors ? errors.reference : undefined}
          />
        </section>

        <hr className="my-2" />

        {/* Section 6: Order Summary */}
        <section className="w-full">
          <OrderSummary submission={submission} participantType="sponsor" />
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
          {isSubmitting ? "Submitting..." : "Submit Registration"}
        </button>
      </div>
    </form>
  );
}

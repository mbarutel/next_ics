"use client";

import { SponsorRepresentativeType, MasterclassType, SponsorPackageTier } from "@/lib/types";
import {
  IoPersonCircleOutline,
  IoMailOutline,
  IoCloseOutline,
  IoAddOutline,
} from "react-icons/io5";
import FormLabel from "@/components/form-label";
import FormInput from "@/components/form-input";
import ErrorMessage from "@/components/error-message";
import FieldGroupLabel from "@/components/field-group-label";
import EventPreferencesSection from "../shared/event-preferences-section";
import { SPONSOR_PACKAGES, PRICING } from "@/helpers/data";

type SubmissionType = {
  sponsors: SponsorRepresentativeType[];
  selectedPackage?: SponsorPackageTier | null;
};

export default function SponsorDetails<T extends SubmissionType>({
  submission,
  setSubmission,
  masterclasses,
  errors,
}: {
  submission: T;
  setSubmission: React.Dispatch<React.SetStateAction<T>>;
  masterclasses?: MasterclassType[];
  errors?: {
    [sponsorIndex: number]: {
      firstName?: string;
      lastName?: string;
      jobTitle?: string;
      email?: string;
      phone?: string;
    };
  };
}) {
  const dietSelection = ["normal", "vegan", "vegetarian", "gluten free"];

  const handleChange = (
    index: number,
    field: keyof SponsorRepresentativeType,
    value: string
  ) => {
    setSubmission((prev) => {
      const updatedSponsors = [...prev.sponsors];

      switch (field) {
        case "dinner":
          updatedSponsors[index][field] = value === "true";
          break;
        case "masterclass":
          updatedSponsors[index][field] = value === "" ? null : value;
          break;
        case "accommodationNights":
          updatedSponsors[index][field] = parseInt(value, 10);
          break;
        default:
          updatedSponsors[index][field] = value as never;
      }

      return {
        ...prev,
        sponsors: updatedSponsors,
      } as T;
    });
  };

  const addSponsor = () => {
    setSubmission((prev) => {
      const sponsors = prev.sponsors;
      return {
        ...prev,
        sponsors: [
          ...sponsors,
          {
            firstName: "",
            lastName: "",
            jobTitle: "",
            email: "",
            phone: "",
            diet: dietSelection[0],
            dinner: sponsors[0].dinner,
            masterclass: sponsors[0].masterclass,
            accommodationNights: sponsors[0].accommodationNights,
          },
        ],
      } as T;
    });
  };

  const removeSponsor = (indexToRemove: number) => {
    setSubmission((prev) => ({
      ...prev,
      sponsors: prev.sponsors.filter((_, i) => i !== indexToRemove),
    } as T));
  };

  return (
    <div className="w-full form_section_wrapper">
      <div className="form-section-spacing">
        <h2 className="form-heading">Sponsor Representatives</h2>
        
        {submission.selectedPackage && (
          <div className="bg-stone-800 border border-yellow-400/30 rounded-md p-4 mb-4">
            <p className="text-sm text-white">
              Your <strong className="text-yellow-400">{SPONSOR_PACKAGES[submission.selectedPackage].name}</strong> includes:
            </p>
            <ul className="text-sm text-green-400 mt-2 space-y-1">
              <li>✓ {SPONSOR_PACKAGES[submission.selectedPackage].includedRepresentatives} complimentary representative{SPONSOR_PACKAGES[submission.selectedPackage].includedRepresentatives > 1 ? 's' : ''}</li>
              <li>✓ {SPONSOR_PACKAGES[submission.selectedPackage].includedDinners} complimentary dinner{SPONSOR_PACKAGES[submission.selectedPackage].includedDinners > 1 ? 's' : ''}</li>
            </ul>
            
            {submission.sponsors.length > SPONSOR_PACKAGES[submission.selectedPackage].includedRepresentatives && (
              <p className="text-sm text-yellow-300 mt-3 pt-3 border-t border-stone-600">
                ⚠️ You have added{' '}
                <strong>
                  {submission.sponsors.length - SPONSOR_PACKAGES[submission.selectedPackage].includedRepresentatives} additional representative
                  {(submission.sponsors.length - SPONSOR_PACKAGES[submission.selectedPackage].includedRepresentatives) > 1 ? 's' : ''}
                </strong>
                {' '}(${PRICING.sponsorRegistration} each)
              </p>
            )}
            
            {(() => {
              const dinnerCount = submission.sponsors.filter(s => s.dinner).length;
              const additionalDinners = Math.max(0, dinnerCount - SPONSOR_PACKAGES[submission.selectedPackage!].includedDinners);
              return additionalDinners > 0 && (
                <p className="text-sm text-yellow-300 mt-2">
                  ⚠️ You have selected{' '}
                  <strong>{additionalDinners} additional dinner{additionalDinners > 1 ? 's' : ''}</strong>
                  {' '}(${PRICING.dinner} each)
                </p>
              );
            })()}
          </div>
        )}
        
        <p className="text-xs sm:text-sm text-gray-400">
          Provide details for all sponsor representatives (minimum 1 required). You can add multiple representatives below.
        </p>
      </div>

      <div className="space-y-4 sm:space-y-6">
        {submission.sponsors.map((sponsor, index) => (
          <div
            key={index}
            className="bg-stone-800 border border-stone-600 p-4 sm:p-6 rounded-md relative"
          >
            {/* Sponsor Header */}
            <div className="flex items-center justify-between mb-3 sm:mb-4 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <div className="bg-yellow-400 text-black rounded-full w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center font-bold text-xs sm:text-sm">
                  {index + 1}
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-white">
                  Sponsor {index + 1}
                </h3>
              </div>
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => removeSponsor(index)}
                  className="text-red-600 hover:text-white hover:bg-red-600 font-medium text-xs sm:text-sm flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 rounded-md transition-all duration-200 border-2 border-red-600 active:scale-95"
                >
                  <IoCloseOutline className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>Remove</span>
                </button>
              )}
              
              {/* Show message on first representative */}
              {index === 0 && submission.sponsors.length === 1 && (
                <span className="text-xs text-gray-400 italic">
                  Required (minimum 1 representative)
                </span>
              )}
            </div>

            {/* Personal Information */}
            <div className="form-section-spacing">
              <FieldGroupLabel icon={<IoPersonCircleOutline className="icon-sm sm:w-5 sm:h-5" />}>
                Personal Details
              </FieldGroupLabel>
              <div className="grid-cols-responsive">
                <label className="block">
                  <FormLabel htmlFor={`sponsor-${index}-firstName`} required>
                    First Name
                  </FormLabel>
                  <FormInput
                    id={`sponsor-${index}-firstName`}
                    type="text"
                    name="firstName"
                    value={sponsor.firstName}
                    onChange={(e) => handleChange(index, "firstName", e.target.value)}
                    placeholder="Enter first name"
                    error={errors?.[index]?.firstName}
                  />
                  <ErrorMessage>{errors?.[index]?.firstName}</ErrorMessage>
                </label>

                <label className="block">
                  <FormLabel htmlFor={`sponsor-${index}-lastName`} required>
                    Last Name
                  </FormLabel>
                  <FormInput
                    id={`sponsor-${index}-lastName`}
                    type="text"
                    name="lastName"
                    value={sponsor.lastName}
                    onChange={(e) => handleChange(index, "lastName", e.target.value)}
                    placeholder="Enter last name"
                    error={errors?.[index]?.lastName}
                  />
                  <ErrorMessage>{errors?.[index]?.lastName}</ErrorMessage>
                </label>

                <label className="block sm:col-span-2">
                  <FormLabel htmlFor={`sponsor-${index}-jobTitle`} required>
                    Job Title
                  </FormLabel>
                  <FormInput
                    id={`sponsor-${index}-jobTitle`}
                    type="text"
                    name="jobTitle"
                    value={sponsor.jobTitle}
                    onChange={(e) => handleChange(index, "jobTitle", e.target.value)}
                    placeholder="Enter job title"
                    error={errors?.[index]?.jobTitle}
                  />
                  <ErrorMessage>{errors?.[index]?.jobTitle}</ErrorMessage>
                </label>
              </div>
            </div>

            {/* Contact Information */}
            <div className="form-section-spacing">
              <FieldGroupLabel icon={<IoMailOutline className="icon-sm sm:w-5 sm:h-5" />}>
                Contact Information
              </FieldGroupLabel>
              <div className="grid-cols-responsive">
                <label className="block">
                  <FormLabel htmlFor={`sponsor-${index}-email`} required>
                    Email Address
                  </FormLabel>
                  <FormInput
                    id={`sponsor-${index}-email`}
                    type="email"
                    name="email"
                    value={sponsor.email}
                    onChange={(e) => handleChange(index, "email", e.target.value)}
                    placeholder="example@email.com"
                    error={errors?.[index]?.email}
                  />
                  <ErrorMessage>{errors?.[index]?.email}</ErrorMessage>
                </label>

                <label className="block">
                  <FormLabel htmlFor={`sponsor-${index}-phone`} required>
                    Phone Number
                  </FormLabel>
                  <FormInput
                    id={`sponsor-${index}-phone`}
                    type="tel"
                    name="phone"
                    value={sponsor.phone}
                    onChange={(e) => handleChange(index, "phone", e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    error={errors?.[index]?.phone}
                  />
                  <ErrorMessage>{errors?.[index]?.phone}</ErrorMessage>
                </label>
              </div>
            </div>

            {/* Event Preferences */}
            <EventPreferencesSection
              index={index}
              participant={sponsor}
              onFieldChange={handleChange}
              masterclasses={masterclasses}
              dietOptions={dietSelection}
            />
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addSponsor}
        className="mt-4 sm:mt-6 px-4 sm:px-6 py-2.5 sm:py-3 bg-yellow-400 text-black font-semibold rounded-md hover:bg-yellow-300 transition-colors shadow-md hover:shadow-lg flex items-center justify-center gap-2 w-full sm:w-auto"
      >
        <IoAddOutline className="w-5 h-5" />
        Add Another Sponsor
      </button>
    </div>
  );
}

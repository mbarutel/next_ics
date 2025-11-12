"use client";

import { DelegateType, MasterclassType } from "@/lib/types";
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

type SubmissionType = {
  delegates: DelegateType[];
};

export default function DelegateDetails<T extends SubmissionType>({
  submission,
  setSubmission,
  masterclasses,
  errors,
}: {
  submission: T;
  setSubmission: React.Dispatch<React.SetStateAction<T>>;
  masterclasses?: MasterclassType[];
  errors?: {
    [delegateIndex: number]: {
      firstName?: string;
      lastName?: string;
      jobTitle?: string;
      organization?: string;
      email?: string;
      phone?: string;
    };
  };
}) {
  const dietSelection = ["normal", "vegan", "vegetarian", "gluten free"];

  const handleChange = (
    index: number,
    field: keyof DelegateType,
    value: string
  ) => {
    setSubmission((prev) => {
      const updatedDelegates = [...prev.delegates];

      switch (field) {
        case "dinner":
          updatedDelegates[index][field] = value === "true";
          break;
        case "masterclass":
          updatedDelegates[index][field] = value === "" ? null : value;
          break;
        case "accommodationNights":
          updatedDelegates[index][field] = parseInt(value, 10);
          break;
        default:
          updatedDelegates[index][field] = value as never;
      }

      return {
        ...prev,
        delegates: updatedDelegates,
      } as T;
    });
  };

  const addDelegate = () => {
    setSubmission((prev) => {
      const delegates = prev.delegates;
      return {
        ...prev,
        delegates: [
          ...delegates,
          {
            firstName: "",
            lastName: "",
            jobTitle: "",
            organization: delegates[0].organization,
            email: "",
            phone: "",
            diet: dietSelection[0],
            dinner: delegates[0].dinner,
            masterclass: delegates[0].masterclass,
            accommodationNights: delegates[0].accommodationNights,
          },
        ],
      } as T;
    });
  };

  const removeDelegate = (indexToRemove: number) => {
    setSubmission((prev) => ({
      ...prev,
      delegates: prev.delegates.filter((_, i) => i !== indexToRemove),
    } as T));
  };

  return (
    <div className="w-full form_section_wrapper">
      <div className="form-section-spacing">
        <h2 className="form-heading">Delegate Information</h2>
        <p className="text-xs sm:text-sm text-gray-400">
          Provide details for all attendees. You can add multiple delegates below.
        </p>
      </div>

      <div className="space-y-4 sm:space-y-6">
        {submission.delegates.map((delegate, index) => (
          <div
            key={index}
            className="bg-stone-800 border border-stone-600 p-4 sm:p-6 rounded-md relative"
          >
            {/* Delegate Header */}
            <div className="flex items-center justify-between mb-3 sm:mb-4 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <div className="bg-yellow-400 text-black rounded-full w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center font-bold text-xs sm:text-sm">
                  {index + 1}
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-white">
                  Delegate {index + 1}
                </h3>
              </div>
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => removeDelegate(index)}
                  className="text-red-600 hover:text-white hover:bg-red-600 font-medium text-xs sm:text-sm flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 rounded-md transition-all duration-200 border-2 border-red-600 active:scale-95"
                >
                  <IoCloseOutline className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">Remove</span>
                  <span className="sm:hidden">Remove</span>
                </button>
              )}
            </div>

            {/* Personal Information */}
            <div className="form-section-spacing">
              <FieldGroupLabel icon={<IoPersonCircleOutline className="icon-sm sm:w-5 sm:h-5" />}>
                Personal Details
              </FieldGroupLabel>
              <div className="grid-cols-responsive">
                <label className="block">
                  <FormLabel htmlFor={`delegate-${index}-firstName`} required>
                    First Name
                  </FormLabel>
                  <FormInput
                    id={`delegate-${index}-firstName`}
                    type="text"
                    name="firstName"
                    value={delegate.firstName}
                    onChange={(e) => handleChange(index, "firstName", e.target.value)}
                    placeholder="Enter first name"
                    error={errors?.[index]?.firstName}
                  />
                  <ErrorMessage>{errors?.[index]?.firstName}</ErrorMessage>
                </label>

                <label className="block">
                  <FormLabel htmlFor={`delegate-${index}-lastName`} required>
                    Last Name
                  </FormLabel>
                  <FormInput
                    id={`delegate-${index}-lastName`}
                    type="text"
                    name="lastName"
                    value={delegate.lastName}
                    onChange={(e) => handleChange(index, "lastName", e.target.value)}
                    placeholder="Enter last name"
                    error={errors?.[index]?.lastName}
                  />
                  <ErrorMessage>{errors?.[index]?.lastName}</ErrorMessage>
                </label>

                <label className="block">
                  <FormLabel htmlFor={`delegate-${index}-jobTitle`} required>
                    Job Title
                  </FormLabel>
                  <FormInput
                    id={`delegate-${index}-jobTitle`}
                    type="text"
                    name="jobTitle"
                    value={delegate.jobTitle}
                    onChange={(e) => handleChange(index, "jobTitle", e.target.value)}
                    placeholder="Enter job title"
                    error={errors?.[index]?.jobTitle}
                  />
                  <ErrorMessage>{errors?.[index]?.jobTitle}</ErrorMessage>
                </label>

                <label className="block">
                  <FormLabel htmlFor={`delegate-${index}-organization`} required>
                    Organization
                  </FormLabel>
                  <FormInput
                    id={`delegate-${index}-organization`}
                    type="text"
                    name="organization"
                    value={delegate.organization}
                    onChange={(e) => handleChange(index, "organization", e.target.value)}
                    placeholder="Enter organization"
                    error={errors?.[index]?.organization}
                  />
                  <ErrorMessage>{errors?.[index]?.organization}</ErrorMessage>
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
                  <FormLabel htmlFor={`delegate-${index}-email`} required>
                    Email Address
                  </FormLabel>
                  <FormInput
                    id={`delegate-${index}-email`}
                    type="email"
                    name="email"
                    value={delegate.email}
                    onChange={(e) => handleChange(index, "email", e.target.value)}
                    placeholder="example@email.com"
                    error={errors?.[index]?.email}
                  />
                  <ErrorMessage>{errors?.[index]?.email}</ErrorMessage>
                </label>

                <label className="block">
                  <FormLabel htmlFor={`delegate-${index}-phone`} required>
                    Phone Number
                  </FormLabel>
                  <FormInput
                    id={`delegate-${index}-phone`}
                    type="tel"
                    name="phone"
                    value={delegate.phone}
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
              participant={delegate}
              onFieldChange={handleChange}
              masterclasses={masterclasses}
              dietOptions={dietSelection}
            />
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addDelegate}
        className="mt-4 sm:mt-6 px-4 sm:px-6 py-2.5 sm:py-3 bg-yellow-400 text-black font-semibold rounded-md hover:bg-yellow-300 transition-colors shadow-md hover:shadow-lg flex items-center justify-center gap-2 w-full sm:w-auto"
      >
        <IoAddOutline className="w-5 h-5" />
        Add Another Delegate
      </button>
    </div>
  );
}

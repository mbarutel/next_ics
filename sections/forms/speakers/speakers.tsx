"use client";

import { SpeakerParticipantType, PaperSubmissionType, MasterclassType } from "@/lib/types";
import { IoPersonCircleOutline, IoMailOutline, IoCloseOutline, IoAddOutline, IoDocumentTextOutline } from "react-icons/io5";
import FormLabel from "@/components/form-label";
import FormInput from "@/components/form-input";
import ErrorMessage from "@/components/error-message";
import FieldGroupLabel from "@/components/field-group-label";
import EventPreferencesSection from "../shared/event-preferences-section";

export default function SpeakerDetails({
  submission,
  setSubmission,
  masterclasses,
  errors,
}: {
  submission: PaperSubmissionType;
  setSubmission: React.Dispatch<React.SetStateAction<PaperSubmissionType>>;
  masterclasses?: MasterclassType[];
  errors?: {
    [speakerIndex: number]: {
      firstName?: string;
      lastName?: string;
      jobTitle?: string;
      organization?: string;
      email?: string;
      phone?: string;
      biography?: string;
    };
  };
}) {
  const dietSelection = ["normal", "vegan", "vegetarian", "gluten free"];

  const handleChange = (
    index: number,
    field: keyof SpeakerParticipantType,
    value: string,
  ) => {
    setSubmission((prev) => {
      const updatedSpeakers = [...prev.speakers];

      switch (field) {
        case "dinner":
          updatedSpeakers[index][field] = value === "true";
          break;
        case "masterclass":
          updatedSpeakers[index][field] = value === "" ? null : value;
          break;
        case "accommodationNights":
          updatedSpeakers[index][field] = parseInt(value, 10);
          break;
        default:
          updatedSpeakers[index][field] = value;
      }

      return {
        ...prev,
        speakers: updatedSpeakers,
      };
    });
  };

  const addSpeaker = () => {
    setSubmission((prev) => {
      const speakers = prev.speakers;
      return {
        ...prev,
        speakers: [
          ...speakers,
          {
            firstName: "",
            lastName: "",
            jobTitle: "",
            organization: speakers[0].organization,
            email: "",
            phone: "",
            diet: dietSelection[0],
            dinner: speakers[0].dinner,
            masterclass: speakers[0].masterclass,
            accommodationNights: speakers[0].accommodationNights,
            biography: "",
          },
        ],
      };
    });
  };

  const removeSpeaker = (indexToRemove: number) => {
    setSubmission((prev) => ({
      ...prev,
      speakers: prev.speakers.filter((_, i) => i !== indexToRemove),
    }));
  };

  return (
    <div className="w-full form_section_wrapper">
      <div className="form-section-spacing">
        <h2 className="text-2xl sm:text-3xl font-semibold text-yellow-400 mb-2">
          Speaker Information
        </h2>
        <p className="text-xs sm:text-sm text-white">
          Provide details for all speakers presenting this paper. You can add multiple speakers below.
        </p>
      </div>

      <div className="space-y-4 sm:space-y-6">
        {submission.speakers.map((speaker, index) => (
          <div
            key={index}
            className="bg-stone-800 border border-stone-600 p-4 sm:p-6 rounded-md relative"
          >
            {/* Speaker Header */}
            <div className="flex items-center justify-between mb-3 sm:mb-4 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <div className="bg-yellow-400/20 text-yellow-400 rounded-full w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center font-bold text-xs sm:text-sm">
                  {index + 1}
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-yellow-400">
                  Speaker {index + 1}
                </h3>
              </div>
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => removeSpeaker(index)}
                  className="text-red-400 hover:text-white hover:bg-red-600 font-medium text-xs sm:text-sm flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 rounded-md transition-all duration-200 border-2 border-red-600 active:scale-95"
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
                <span className="text-white">Personal Details</span>
              </FieldGroupLabel>
              <div className="grid-cols-responsive">
                <label className="block">
                  <FormLabel htmlFor={`speaker-${index}-firstName`} required>
                    <span className="text-white">First Name</span>
                  </FormLabel>
                  <FormInput
                    id={`speaker-${index}-firstName`}
                    type="text"
                    name="firstName"
                    value={speaker.firstName}
                    onChange={(e) => handleChange(index, "firstName", e.target.value)}
                    placeholder="Enter first name"
                    error={errors?.[index]?.firstName}
                  />
                  <ErrorMessage>{errors?.[index]?.firstName}</ErrorMessage>
                </label>

                <label className="block">
                  <FormLabel htmlFor={`speaker-${index}-lastName`} required>
                    <span className="text-white">Last Name</span>
                  </FormLabel>
                  <FormInput
                    id={`speaker-${index}-lastName`}
                    type="text"
                    name="lastName"
                    value={speaker.lastName}
                    onChange={(e) => handleChange(index, "lastName", e.target.value)}
                    placeholder="Enter last name"
                    error={errors?.[index]?.lastName}
                  />
                  <ErrorMessage>{errors?.[index]?.lastName}</ErrorMessage>
                </label>

                <label className="block">
                  <FormLabel htmlFor={`speaker-${index}-jobTitle`} required>
                    <span className="text-white">Job Title</span>
                  </FormLabel>
                  <FormInput
                    id={`speaker-${index}-jobTitle`}
                    type="text"
                    name="jobTitle"
                    value={speaker.jobTitle}
                    onChange={(e) => handleChange(index, "jobTitle", e.target.value)}
                    placeholder="Enter job title"
                    error={errors?.[index]?.jobTitle}
                  />
                  <ErrorMessage>{errors?.[index]?.jobTitle}</ErrorMessage>
                </label>

                <label className="block">
                  <FormLabel htmlFor={`speaker-${index}-organization`} required>
                    <span className="text-white">Organization</span>
                  </FormLabel>
                  <FormInput
                    id={`speaker-${index}-organization`}
                    type="text"
                    name="organization"
                    value={speaker.organization}
                    onChange={(e) =>
                      handleChange(index, "organization", e.target.value)
                    }
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
                <span className="text-white">Contact Information</span>
              </FieldGroupLabel>
              <div className="grid-cols-responsive">
                <label className="block">
                  <FormLabel htmlFor={`speaker-${index}-email`} required>
                    <span className="text-white">Email Address</span>
                  </FormLabel>
                  <FormInput
                    id={`speaker-${index}-email`}
                    type="email"
                    name="email"
                    value={speaker.email}
                    onChange={(e) => handleChange(index, "email", e.target.value)}
                    placeholder="example@email.com"
                    error={errors?.[index]?.email}
                  />
                  <ErrorMessage>{errors?.[index]?.email}</ErrorMessage>
                </label>

                <label className="block">
                  <FormLabel htmlFor={`speaker-${index}-phone`} required>
                    <span className="text-white">Phone Number</span>
                  </FormLabel>
                  <FormInput
                    id={`speaker-${index}-phone`}
                    type="tel"
                    name="phone"
                    value={speaker.phone}
                    onChange={(e) => handleChange(index, "phone", e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    error={errors?.[index]?.phone}
                  />
                  <ErrorMessage>{errors?.[index]?.phone}</ErrorMessage>
                </label>
              </div>
            </div>

            {/* Biography */}
            <div className="form-section-spacing">
              <FieldGroupLabel icon={<IoDocumentTextOutline className="icon-sm sm:w-5 sm:h-5" />}>
                <span className="text-white">Biography</span>
              </FieldGroupLabel>
              <label className="block">
                <FormLabel htmlFor={`speaker-${index}-biography`} required>
                  <span className="text-white">Speaker Biography</span>
                </FormLabel>
                <textarea
                  id={`speaker-${index}-biography`}
                  name="biography"
                  value={speaker.biography}
                  onChange={(e) => handleChange(index, "biography", e.target.value)}
                  placeholder="Enter a brief biography for the speaker (minimum 50 characters)"
                  rows={4}
                  className={`form-input bg-stone-900 text-white border-stone-600 ${errors?.[index]?.biography ? "border-red-500" : ""}`}
                />
                <ErrorMessage>{errors?.[index]?.biography}</ErrorMessage>
                <p className="text-xs text-gray-400 mt-1">
                  {speaker.biography.length} characters
                </p>
              </label>
            </div>

            {/* Event Preferences */}
            <EventPreferencesSection
              index={index}
              participant={speaker}
              onFieldChange={handleChange}
              masterclasses={masterclasses}
              dietOptions={dietSelection}
            />
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addSpeaker}
        className="mt-4 sm:mt-6 px-4 sm:px-6 py-2.5 sm:py-3 bg-yellow-400 text-stone-900 font-semibold rounded-md hover:bg-yellow-300 transition-colors shadow-md hover:shadow-lg flex items-center justify-center gap-2 w-full sm:w-auto"
      >
        <IoAddOutline className="w-5 h-5" />
        Add Another Speaker
      </button>
    </div>
  );
}

"use client";

import { PaperSubmissionType } from "@/lib/types";
import { IoDocumentTextOutline } from "react-icons/io5";
import FormLabel from "@/components/form-label";
import FormInput from "@/components/form-input";
import ErrorMessage from "@/components/error-message";
import FieldGroupLabel from "@/components/field-group-label";

export default function PaperDetails({
  submission,
  setSubmission,
  errors,
}: {
  submission: PaperSubmissionType;
  setSubmission: React.Dispatch<React.SetStateAction<PaperSubmissionType>>;
  errors?: {
    paperTitle?: string;
    paperDescription?: string;
  };
}) {
  const handleChange = (field: "paperTitle" | "paperDescription", value: string) => {
    setSubmission((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="w-full form_section_wrapper">
      <div className="form-section-spacing">
        <h2 className="text-2xl sm:text-3xl font-semibold text-yellow-400 mb-2">
          Paper Details
        </h2>
        <p className="text-xs sm:text-sm text-white">
          Provide information about the paper you wish to present
        </p>
      </div>

      <div className="space-y-4 sm:space-y-6">
        {/* Paper Title */}
        <div>
          <FieldGroupLabel icon={<IoDocumentTextOutline className="icon-sm sm:w-5 sm:h-5" />}>
            <span className="text-white">Paper Information</span>
          </FieldGroupLabel>
          <div className="space-y-4">
            <label className="block">
              <FormLabel htmlFor="paper-title" required>
                <span className="text-white">Paper Title</span>
              </FormLabel>
              <FormInput
                id="paper-title"
                type="text"
                name="paperTitle"
                value={submission.paperTitle}
                onChange={(e) => handleChange("paperTitle", e.target.value)}
                placeholder="Enter the title of your paper"
                error={errors?.paperTitle}
              />
              <ErrorMessage>{errors?.paperTitle}</ErrorMessage>
            </label>

            <label className="block">
              <FormLabel htmlFor="paper-description" required>
                <span className="text-white">Paper Description/Abstract</span>
              </FormLabel>
              <textarea
                id="paper-description"
                name="paperDescription"
                value={submission.paperDescription}
                onChange={(e) => handleChange("paperDescription", e.target.value)}
                placeholder="Provide a detailed description or abstract of your paper (minimum 100 characters)"
                rows={6}
                className={`form-input bg-stone-900 text-white border-stone-600 ${errors?.paperDescription ? "border-red-500" : ""}`}
              />
              <ErrorMessage>{errors?.paperDescription}</ErrorMessage>
              <p className="text-xs text-gray-400 mt-1">
                {submission.paperDescription.length} characters
              </p>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

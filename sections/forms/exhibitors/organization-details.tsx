"use client";

import { ExhibitorSubmissionType } from "@/lib/types";
import { IoBusinessOutline, IoDocumentTextOutline } from "react-icons/io5";
import FormLabel from "@/components/form-label";
import FormInput from "@/components/form-input";
import ErrorMessage from "@/components/error-message";
import FieldGroupLabel from "@/components/field-group-label";
import { useState } from "react";

export default function OrganizationDetails({
  submission,
  setSubmission,
  errors,
}: {
  submission: ExhibitorSubmissionType;
  setSubmission: React.Dispatch<React.SetStateAction<ExhibitorSubmissionType>>;
  errors?: {
    organizationName?: string;
    organizationStreetAddress?: string;
    organizationCity?: string;
    organizationStateProvince?: string;
    organizationPostalCode?: string;
    organizationCountry?: string;
    productServicesDescription?: string;
  };
}) {
  const [descriptionLength, setDescriptionLength] = useState(
    submission.productServicesDescription.length
  );

  const handleChange = (
    field: keyof ExhibitorSubmissionType,
    value: string
  ) => {
    setSubmission((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (field === "productServicesDescription") {
      setDescriptionLength(value.length);
    }
  };

  const minDescriptionLength = 50;
  const isDescriptionValid = descriptionLength >= minDescriptionLength;

  return (
    <div className="w-full form_section_wrapper">
      <div className="form-section-spacing">
        <FieldGroupLabel icon={<IoBusinessOutline className="icon-sm sm:w-5 sm:h-5" />}>
          <span className="text-white">Organization Information</span>
        </FieldGroupLabel>
        
        <div className="grid-cols-responsive mb-6">
          {/* Organization Name */}
          <label className="block">
            <FormLabel htmlFor="organization-name">
              <span className="text-white">
                Organization Name <span className="text-red-400">*</span>
              </span>
            </FormLabel>
            <FormInput
              type="text"
              id="organization-name"
              name="organizationName"
              value={submission.organizationName}
              onChange={(e) => handleChange("organizationName", e.target.value)}
              placeholder="Enter your organization name"
              className={errors?.organizationName ? "border-red-400" : ""}
            />
            {errors?.organizationName && (
              <ErrorMessage>{errors.organizationName}</ErrorMessage>
            )}
          </label>
        </div>

        <div className="grid-cols-responsive mb-6">
          {/* Street Address */}
          <label className="block sm:col-span-2">
            <FormLabel htmlFor="organization-street-address">
              <span className="text-white">
                Street Address <span className="text-red-400">*</span>
              </span>
            </FormLabel>
            <FormInput
              type="text"
              id="organization-street-address"
              name="organizationStreetAddress"
              value={submission.organizationStreetAddress}
              onChange={(e) =>
                handleChange("organizationStreetAddress", e.target.value)
              }
              placeholder="Enter street address"
              className={errors?.organizationStreetAddress ? "border-red-400" : ""}
            />
            {errors?.organizationStreetAddress && (
              <ErrorMessage>{errors.organizationStreetAddress}</ErrorMessage>
            )}
          </label>
        </div>

        <div className="grid-cols-responsive mb-6">
          {/* City */}
          <label className="block">
            <FormLabel htmlFor="organization-city">
              <span className="text-white">
                City <span className="text-red-400">*</span>
              </span>
            </FormLabel>
            <FormInput
              type="text"
              id="organization-city"
              name="organizationCity"
              value={submission.organizationCity}
              onChange={(e) => handleChange("organizationCity", e.target.value)}
              placeholder="Enter city"
              className={errors?.organizationCity ? "border-red-400" : ""}
            />
            {errors?.organizationCity && (
              <ErrorMessage>{errors.organizationCity}</ErrorMessage>
            )}
          </label>

          {/* State/Province */}
          <label className="block">
            <FormLabel htmlFor="organization-state-province">
              <span className="text-white">
                State/Province <span className="text-red-400">*</span>
              </span>
            </FormLabel>
            <FormInput
              type="text"
              id="organization-state-province"
              name="organizationStateProvince"
              value={submission.organizationStateProvince}
              onChange={(e) =>
                handleChange("organizationStateProvince", e.target.value)
              }
              placeholder="Enter state or province"
              className={errors?.organizationStateProvince ? "border-red-400" : ""}
            />
            {errors?.organizationStateProvince && (
              <ErrorMessage>{errors.organizationStateProvince}</ErrorMessage>
            )}
          </label>
        </div>

        <div className="grid-cols-responsive">
          {/* Postal Code */}
          <label className="block">
            <FormLabel htmlFor="organization-postal-code">
              <span className="text-white">
                Postal Code <span className="text-red-400">*</span>
              </span>
            </FormLabel>
            <FormInput
              type="text"
              id="organization-postal-code"
              name="organizationPostalCode"
              value={submission.organizationPostalCode}
              onChange={(e) =>
                handleChange("organizationPostalCode", e.target.value)
              }
              placeholder="Enter postal code"
              className={errors?.organizationPostalCode ? "border-red-400" : ""}
            />
            {errors?.organizationPostalCode && (
              <ErrorMessage>{errors.organizationPostalCode}</ErrorMessage>
            )}
          </label>

          {/* Country */}
          <label className="block">
            <FormLabel htmlFor="organization-country">
              <span className="text-white">
                Country <span className="text-red-400">*</span>
              </span>
            </FormLabel>
            <FormInput
              type="text"
              id="organization-country"
              name="organizationCountry"
              value={submission.organizationCountry}
              onChange={(e) =>
                handleChange("organizationCountry", e.target.value)
              }
              placeholder="Enter country"
              className={errors?.organizationCountry ? "border-red-400" : ""}
            />
            {errors?.organizationCountry && (
              <ErrorMessage>{errors.organizationCountry}</ErrorMessage>
            )}
          </label>
        </div>
      </div>

      {/* Product & Services Description */}
      <div className="form-section-spacing">
        <FieldGroupLabel
          icon={<IoDocumentTextOutline className="icon-sm sm:w-5 sm:h-5" />}
        >
          <span className="text-white">Product & Services</span>
        </FieldGroupLabel>

        <label className="block">
          <FormLabel htmlFor="product-services-description">
            <span className="text-white">
              Brief Description of Products/Services to Showcase{" "}
              <span className="text-red-400">*</span>
            </span>
          </FormLabel>
          <textarea
            id="product-services-description"
            name="productServicesDescription"
            rows={5}
            value={submission.productServicesDescription}
            onChange={(e) =>
              handleChange("productServicesDescription", e.target.value)
            }
            placeholder="Describe the products and services your organization will showcase at the conference (minimum 50 characters)"
            className={`form-input resize-y bg-stone-900 text-white border-stone-600 ${
              errors?.productServicesDescription ? "border-red-400" : ""
            }`}
          />
          <div className="flex justify-between items-start mt-1">
            <div className="flex-1">
              {errors?.productServicesDescription && (
                <ErrorMessage>{errors.productServicesDescription}</ErrorMessage>
              )}
            </div>
            <p
              className={`text-xs mt-1 ${
                isDescriptionValid ? "text-gray-400" : "text-yellow-400"
              }`}
            >
              {descriptionLength} / {minDescriptionLength} characters
            </p>
          </div>
        </label>
      </div>
    </div>
  );
}

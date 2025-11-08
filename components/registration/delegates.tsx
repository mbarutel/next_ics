"use client";

import { FieldArray, FormikErrors } from "formik";
import { DelegateType, FormValuesType, MasterclassType } from "@/lib/types";
import { InputField } from "./input-field";
import QuestionTitle from "./question-title";
import EmptyWarning from "./empty-warning";

type DelegatesProps = {
  values: FormValuesType;
  errors: FormikErrors<FormValuesType>;
  touched: any;
  setFieldValue: Function;
  masterclasses: MasterclassType[];
  dinnerPrice: number;
  masterclassPrice: number;
};

const DIET_OPTIONS = ["normal", "vegan", "vegetarian", "gluten free"];

export default function Delegates({
  values,
  errors,
  touched,
  setFieldValue,
  masterclasses,
  dinnerPrice,
  masterclassPrice,
}: DelegatesProps) {
  const handleDelegateChange = (
    index: number,
    field: keyof DelegateType,
    value: any
  ) => {
    setFieldValue(`delegates.${index}.${field}`, value);
  };

  const getInitialDelegate = (existingDelegates: DelegateType[]): DelegateType => {
    // If there are existing delegates, inherit some values from the first delegate
    if (existingDelegates.length > 0) {
      return {
        firstName: "",
        lastName: "",
        jobTitle: "",
        organization: existingDelegates[0].organization,
        email: "",
        phone: "",
        diet: DIET_OPTIONS[0],
        dinner: existingDelegates[0].dinner,
        masterclass: existingDelegates[0].masterclass,
        accommodationNights: existingDelegates[0].accommodationNights,
      };
    }

    // Default delegate
    return {
      firstName: "",
      lastName: "",
      jobTitle: "",
      organization: "",
      email: "",
      phone: "",
      diet: DIET_OPTIONS[0],
      dinner: false,
      masterclass: null,
      accommodationNights: 0,
    };
  };

  return (
    <div className="my-3">
      <QuestionTitle>Delegate Information</QuestionTitle>
      <p className="text-sm text-gray-300 mb-4">
        Provide details for all attendees. You can add multiple delegates below.
      </p>

      <FieldArray name="delegates">
        {({ push, remove }) => (
          <>
            {values.delegates && values.delegates.length > 0 ? (
              <div className="space-y-4">
                {values.delegates.map((delegate, index) => {
                  const delegateErrors = errors.delegates?.[index] as FormikErrors<DelegateType> | undefined;
                  const delegateTouched = touched.delegates?.[index];

                  return (
                    <div
                      key={index}
                      className="bg-stone-700/50 border-2 border-stone-600 p-4 rounded-md relative"
                    >
                      {/* Delegate Header */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <div className="bg-yellow-500/20 text-yellow-500 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm border-2 border-yellow-500">
                            {index + 1}
                          </div>
                          <h3 className="text-lg font-semibold">
                            Delegate {index + 1}
                          </h3>
                        </div>
                        {index > 0 && (
                          <button
                            type="button"
                            onClick={() => remove(index)}
                            className="text-red-400 hover:text-white hover:bg-red-600 font-medium text-sm flex items-center gap-1 px-3 py-1.5 rounded-md transition-all duration-200 border-2 border-red-500 active:scale-95"
                          >
                            ✕ Remove
                          </button>
                        )}
                      </div>

                      {/* Personal Information */}
                      <div className="mb-4">
                        <h4 className="font-semibold text-sm mb-3 text-yellow-500">
                          Personal Details
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <InputField
                            name={`delegates.${index}.firstName`}
                            type="text"
                            label="First Name *"
                            error={delegateErrors?.firstName}
                            touched={delegateTouched?.firstName}
                          />
                          <InputField
                            name={`delegates.${index}.lastName`}
                            type="text"
                            label="Last Name *"
                            error={delegateErrors?.lastName}
                            touched={delegateTouched?.lastName}
                          />
                          <InputField
                            name={`delegates.${index}.jobTitle`}
                            type="text"
                            label="Job Title *"
                            error={delegateErrors?.jobTitle}
                            touched={delegateTouched?.jobTitle}
                          />
                          <InputField
                            name={`delegates.${index}.organization`}
                            type="text"
                            label="Organization *"
                            error={delegateErrors?.organization}
                            touched={delegateTouched?.organization}
                          />
                        </div>
                      </div>

                      {/* Contact Information */}
                      <div className="mb-4">
                        <h4 className="font-semibold text-sm mb-3 text-yellow-500">
                          Contact Information
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <InputField
                            name={`delegates.${index}.email`}
                            type="email"
                            label="Email Address *"
                            error={delegateErrors?.email}
                            touched={delegateTouched?.email}
                          />
                          <InputField
                            name={`delegates.${index}.phone`}
                            type="tel"
                            label="Phone Number *"
                            error={delegateErrors?.phone}
                            touched={delegateTouched?.phone}
                          />
                        </div>
                      </div>

                      {/* Event Preferences */}
                      <div>
                        <h4 className="font-semibold text-sm mb-3 text-yellow-500">
                          Event Preferences
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {/* Dietary Requirements */}
                          <div className="flex_col">
                            <span className="flex gap-0.5">
                              <EmptyWarning
                                text={delegateErrors?.diet || ""}
                                error={delegateErrors?.diet}
                                touched={delegateTouched?.diet}
                              />
                              <label>Dietary Requirements *</label>
                            </span>
                            <select
                              name={`delegates.${index}.diet`}
                              value={delegate.diet}
                              onChange={(e) =>
                                handleDelegateChange(index, "diet", e.target.value)
                              }
                              className="field_input text-black"
                            >
                              {DIET_OPTIONS.map((option) => (
                                <option key={option} value={option}>
                                  {option.charAt(0).toUpperCase() + option.slice(1)}
                                </option>
                              ))}
                            </select>
                          </div>

                          {/* Dinner Attendance */}
                          <div className="flex_col">
                            <span className="flex gap-0.5">
                              <label>Gala Dinner Attendance (${dinnerPrice})</label>
                            </span>
                            <select
                              name={`delegates.${index}.dinner`}
                              value={delegate.dinner.toString()}
                              onChange={(e) =>
                                handleDelegateChange(
                                  index,
                                  "dinner",
                                  e.target.value === "true"
                                )
                              }
                              className="field_input text-black"
                            >
                              <option value="true">Yes, I will attend</option>
                              <option value="false">No, I will not attend</option>
                            </select>
                          </div>

                          {/* Masterclass Selection */}
                          <div className="flex_col">
                            <span className="flex gap-0.5">
                              <label>Masterclass Selection (${masterclassPrice})</label>
                            </span>
                            <select
                              name={`delegates.${index}.masterclass`}
                              value={delegate.masterclass ?? ""}
                              onChange={(e) =>
                                handleDelegateChange(
                                  index,
                                  "masterclass",
                                  e.target.value === "" ? null : e.target.value
                                )
                              }
                              className="field_input text-black"
                            >
                              <option value="">No masterclass</option>
                              {masterclasses.map((mc) => (
                                <option key={mc.slug} value={mc.title}>
                                  {mc.title}
                                </option>
                              ))}
                            </select>
                          </div>

                          {/* Accommodation Nights */}
                          <div className="flex_col">
                            <span className="flex gap-0.5">
                              <label>Accommodation Nights</label>
                            </span>
                            <select
                              name={`delegates.${index}.accommodationNights`}
                              value={delegate.accommodationNights.toString()}
                              onChange={(e) =>
                                handleDelegateChange(
                                  index,
                                  "accommodationNights",
                                  parseInt(e.target.value, 10)
                                )
                              }
                              className="field_input text-black"
                            >
                              {[0, 1, 2, 3, 4, 5].map((n) => (
                                <option key={n} value={n}>
                                  {n === 0
                                    ? "No accommodation needed"
                                    : `${n} night${n > 1 ? "s" : ""}`}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : null}

            {/* Add Delegate Button */}
            <button
              type="button"
              onClick={() => push(getInitialDelegate(values.delegates || []))}
              className="mt-4 px-6 py-3 bg-gradient-to-b gradient rounded-md border font-semibold hover:scale-105 transition-all shadow-md flex items-center justify-center gap-2 w-full md:w-auto text-black"
            >
              <span className="text-xl">+</span> Add Another Delegate
            </button>
          </>
        )}
      </FieldArray>
    </div>
  );
}

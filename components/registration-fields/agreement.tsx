"use client";

import { Field, FormikErrors, FormikTouched } from "formik";
import React from "react";
import { FormValuesType } from "@/lib/types";
import clsx from "clsx";
import { CiWarning } from "react-icons/ci";

export default function Agreement(
  { choice, setFieldValue, errors, touched }: {
    choice: boolean;
    setFieldValue: Function;
    errors: FormikErrors<FormValuesType>;
    touched: FormikTouched<FormValuesType>;
  },
) {
  return (
    <div className="question_wrapper">
      <div className="flex justify-between">
        <h2 className="question_title">Agreement</h2>
        {errors.agreement && touched.agreement
          ? (
            <div className="validation_message">
              <CiWarning />
              {errors.agreement}
            </div>
          )
          : null}
      </div>
      <p className="question_description mb-2 sm:mb-6">
        BY COMPLETING AND SUBMITTING THIS REGISTRATION, YOU ARE NOW ENTERING
        INTO A LEGAL CONTRACT TO COMMIT, ATTEND AND PAY ALL COSTS OUTLINED IN
        THIS DOCUMENT TO ATTEND THE ABOVE CONFERENCE.
      </p>
      <div className="grid grid-cols-2">
        <button
          type="button"
          className={clsx("fee_label items-center", {
            "!bg-teal-300 shadow-sm shadow-teal-600/70": choice === true,
          })}
          onClick={() => (setFieldValue(
            "agreement",
            choice === true ? false : true,
          ))}
        >
          <Field
            type="checkbox"
            name="agreement"
            value={true}
            checked={choice === true}
          />
          I agree
        </button>
      </div>
    </div>
  );
}

"use client";

import clsx from "clsx";
import React from "react";
import EmptyWarning from "./empty-warning";
import { FormValuesType } from "@/lib/types";
import { Field, FormikErrors, FormikTouched } from "formik";

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
      <h2 className="question_title">Agreement</h2>
      <p className="question_description mb-2 sm:mb-6">
        BY COMPLETING AND SUBMITTING THIS REGISTRATION, YOU ARE NOW ENTERING
        INTO A LEGAL CONTRACT TO COMMIT, ATTEND AND PAY ALL COSTS OUTLINED IN
        THIS DOCUMENT TO ATTEND THE ABOVE CONFERENCE.
      </p>
      <EmptyWarning
        text={errors.agreement as string}
        error={errors.agreement}
        touched={touched.agreement}
      />
      <button
        type="button"
        className={clsx("fee_label", {
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
  );
}

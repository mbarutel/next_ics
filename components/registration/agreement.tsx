"use client";

import React from "react";
import EmptyWarning from "./empty-warning";
import { FormValuesType } from "@/lib/types";
import { Field, FormikErrors, FormikTouched } from "formik";
import QuestionTitle from "./question-title";

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
      <QuestionTitle>Agreement</QuestionTitle>
      <p className="-mt-1 mb-2 leading-tight">
        BY COMPLETING AND SUBMITTING THIS REGISTRATION, YOU ARE NOW ENTERING
        INTO A LEGAL CONTRACT TO COMMIT, ATTEND AND PAY ALL COSTS OUTLINED IN
        THIS DOCUMENT TO ATTEND THE ABOVE CONFERENCE.
      </p>
      <button
        type="button"
        onClick={() => (setFieldValue(
          "agreement",
          choice === true ? false : true,
        ))}
        className="flex gap-1 items-center text-xl"
      >
        <Field
          type="checkbox"
          name="agreement"
          value={true}
          checked={choice === true}
        />
        <EmptyWarning
          text={errors.agreement as string}
          error={errors.agreement}
          touched={touched.agreement}
        />
        I agree
      </button>
    </div>
  );
}

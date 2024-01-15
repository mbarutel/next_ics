"use client";

import React from "react";
import Select from "react-select";
import { FormValuesType } from "@/lib/types";
import { CiWarning } from "react-icons/ci";
import { referralOptions } from "@/lib/data";
import { FormikErrors, FormikTouched } from "formik";

export default function ReferralQuestion(
  { choice, setFieldValue, errors, touched }: {
    choice: string;
    setFieldValue: Function;
    errors: FormikErrors<FormValuesType>;
    touched: FormikTouched<FormValuesType>;
  },
) {
  const options = referralOptions.map((item) => ({
    value: item.toLowerCase(),
    label: item,
  }));

  return (
    <div className="question_wrapper">
      <div className="flex justify-between mb-2 sm:mb-6">
        <h2 className="question_title">
          How did you hear about the conferences?
        </h2>
        {errors.referral && touched.referral
          ? (
            <div className="validation_message">
              <CiWarning />
              {errors.referral}
            </div>
          )
          : null}
      </div>
      <Select
        options={options}
        name="referral"
        instanceId="referral.select"
        value={options.filter((option) => option.value === choice)}
        onChange={(event) => setFieldValue("referral", event?.value)}
      />
    </div>
  );
}

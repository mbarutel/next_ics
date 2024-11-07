"use client";

import React from "react";
import Select from "react-select";
import EmptyWarning from "./empty-warning";
import { FormValuesType } from "@/lib/types";
import { referralOptions } from "@/lib/data";
import QuestionTitle from "./question-title";
import { customStyles } from "./select-style";
import { FormikErrors, FormikTouched } from "formik";

export default function Referral({
  choice,
  setFieldValue,
  errors,
  touched,
}: {
  choice: string;
  setFieldValue: Function;
  errors: FormikErrors<FormValuesType>;
  touched: FormikTouched<FormValuesType>;
}) {
  const options = referralOptions.map((item) => ({
    value: item.toLowerCase(),
    label: item,
  }));

  return (
    <div className="question_wrapper">
      <div className="flex gap-1">
        <EmptyWarning
          text={errors.referral as string}
          error={errors.referral}
          touched={touched.referral}
        />
        <QuestionTitle>How did you hear about the conferences?</QuestionTitle>
      </div>
      <Select
        options={options}
        name="referral"
        instanceId="referral.select"
        value={options.filter((option) => option.value === choice)}
        onChange={(event) => setFieldValue("referral", event?.value)}
        styles={customStyles}
      />
    </div>
  );
}

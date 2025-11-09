"use client";

import React from "react";
import Select, { SingleValue } from "react-select";
import { accomodationOption } from "@/lib/data";
import { FormikErrors, FormikTouched } from "formik";
import { FormValuesType } from "@/lib/types";
import { customStyles } from "./select-style";
import EmptyWarning from "./empty-warning";
import QuestionTitle from "./question-title";

export default function Accomodation({
  choice,
  setFieldValue,
  errors,
  touched,
}: {
  choice: number;
  setFieldValue: Function;
  errors: FormikErrors<FormValuesType>;
  touched: FormikTouched<FormValuesType>;
}) {
  const options = accomodationOption.map((item) => ({
    value: item.value,
    label: item.label,
  }));

  return (
    <div className="question_wrapper">
      <QuestionTitle>Accommodation</QuestionTitle>
      <EmptyWarning
        text={errors.accomodation as string}
        error={errors.accomodation}
        touched={touched.accomodation}
      />
      <Select
        options={options}
        instanceId="accomodation"
        name="accomodation.select"
        value={options.filter((option) => option.value === choice)}
        onChange={(event: SingleValue<{ value: number; label: string }>) => {
          setFieldValue("accomodation", event?.value);
        }}
        styles={customStyles}
      />
    </div>
  );
}

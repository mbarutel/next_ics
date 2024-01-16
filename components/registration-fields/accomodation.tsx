"use client";

import React from "react";
import Select from "react-select";
import { CiWarning } from "react-icons/ci";
import { accomodationOption } from "@/lib/data";
import { FormikErrors, FormikTouched } from "formik";
import { FormValuesType } from "@/lib/types";
import { customStyles } from "./select-style";
import EmptyWarning from "./empty-warning";

export default function Accomodation(
  { choice, setFieldValue, errors, touched }: {
    choice: number;
    setFieldValue: Function;
    errors: FormikErrors<FormValuesType>;
    touched: FormikTouched<FormValuesType>;
  },
) {
  const options = accomodationOption.map((item) => ({
    value: item.value,
    label: item.label,
  }));

  return (
    <div className="question_wrapper">
      <h2 className="question_title mb-2 sm:mb-6">
        Do you want to receive a quote for hotel accommodation?
      </h2>
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
        onChange={(event) => {
          setFieldValue("accomodation", event?.value);
        }}
        className="z-20"
        styles={customStyles}
      />
    </div>
  );
}

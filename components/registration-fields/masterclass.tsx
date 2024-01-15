"use client";

import React from "react";
import Select from "react-select";
import { CiWarning } from "react-icons/ci";
import { FormikErrors, FormikTouched } from "formik";
import { FormValuesType, MasterclassType } from "@/lib/types";
import { customStyles } from "./select-style";

export default function Masterclass(
  { choice, masterclasses, errors, touched, setFieldValue }: {
    choice: string;
    masterclasses: MasterclassType[] | undefined;
    errors: FormikErrors<FormValuesType>;
    touched: FormikTouched<FormValuesType>;
    setFieldValue: Function;
  },
) {
  if (masterclasses === undefined) {
    return null;
  }

  const masterclassOptions = masterclasses.map((item) => ({
    value: item.title.toLowerCase(),
    label: item.title,
  }));

  const options = [...masterclassOptions, {
    value: "no",
    label: "No, Thank you",
  }];

  return (
    <div>
      <div>
        <h2 className="question_title">
          Post-Conference Masterclass
        </h2>
        {errors.accomodation && touched.accomodation
          ? (
            <div className="validation_message">
              <CiWarning />
              {errors.accomodation}
            </div>
          )
          : null}
      </div>
      <p className="question_description mb-2 sm:mb-6">AU$350</p>
      <Select
        options={options}
        name="masterclass"
        instanceId="masterclass.select"
        value={options.filter((option) => option.value === choice)}
        onChange={(event) => {
          setFieldValue("masterclass", event?.value);
        }}
        styles={customStyles}
        className="z-40"
      />
    </div>
  );
}

"use client";

import React from "react";
import Select from "react-select";
import { FormikErrors, FormikTouched } from "formik";
import { FormValuesType, MasterclassType } from "@/lib/types";
import { customStyles } from "./select-style";
import EmptyWarning from "./empty-warning";
import QuestionTitle from "./question-title";

export default function Masterclass(
  { choice, price, masterclasses, errors, touched, setFieldValue }: {
    choice: string;
    price: number;
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
      <div className="flex gap-1">
        <EmptyWarning
          text={errors.masterclass as string}
          error={errors.masterclass}
          touched={touched.masterclass}
        />
        <QuestionTitle>Post-Conference Masterclass</QuestionTitle>
      </div>
      <p className="-mt-2 mb-2">{`AU$${price} Per Session`}</p>
      <Select
        options={options}
        name="masterclass"
        instanceId="masterclass.select"
        value={options.filter((option) => option.value === choice)}
        onChange={(event) => {
          setFieldValue("masterclass", event?.value);
        }}
        styles={customStyles}
      />
    </div>
  );
}

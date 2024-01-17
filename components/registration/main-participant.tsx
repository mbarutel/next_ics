"use client";

import React from "react";
import { FormValuesType } from "@/lib/types";
import { FormikErrors, FormikTouched } from "formik";
import { InputField } from "./input-field";
import QuestionTitle from "./question-title";

export default function MainParticipant(
  { errors, touched }: {
    errors: FormikErrors<FormValuesType>;
    touched: FormikTouched<FormValuesType>;
  },
) {
  return (
    <div>
      <QuestionTitle>Personal Details</QuestionTitle>
      <div className="flex_col sm:gap-1">
        <InputField
          name="name"
          type="text"
          label="Full Name"
          error={errors.name}
          touched={touched.name}
        />

        <InputField
          name="company"
          type="text"
          label="Company"
          error={errors.company}
          touched={touched.company}
        />

        <InputField
          name="position"
          type="text"
          label="Position"
          error={errors.position}
          touched={touched.position}
        />

        <InputField
          name="phone"
          type="text"
          label="Phone"
          error={errors.phone}
          touched={touched.phone}
        />

        <InputField
          name="email"
          type="text"
          label="Email"
          error={errors.email}
          touched={touched.email}
        />

        <InputField
          name="address"
          type="text"
          label="Address"
          error={errors.address}
          touched={touched.address}
        />
      </div>
    </div>
  );
}

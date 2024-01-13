"use client";

import React from "react";
import { FormValuesType } from "@/lib/types";
import { FormikErrors, FormikTouched } from "formik";
import { InputField } from "./input-field";

export default function MainParticipant(
  { errors, touched }: {
    errors: FormikErrors<FormValuesType>;
    touched: FormikTouched<FormValuesType>;
  },
) {
  return (
    <div>
      <h2 className="question_title">Personal Details</h2>
      <div className="flex_col sm:gap-3">
        <InputField
          name="name"
          type="text"
          placeholder="Name"
          error={errors.name}
          touched={touched.name}
        />

        <InputField
          name="company"
          type="text"
          placeholder="Company"
          error={errors.company}
          touched={touched.company}
        />

        <InputField
          name="position"
          type="text"
          placeholder="Position"
          error={errors.position}
          touched={touched.position}
        />

        <InputField
          name="phone"
          type="text"
          placeholder="Phone"
          error={errors.phone}
          touched={touched.phone}
        />

        <InputField
          name="email"
          type="text"
          placeholder="Email"
          error={errors.email}
          touched={touched.email}
        />

        <InputField
          name="address"
          type="text"
          placeholder="Address"
          error={errors.address}
          touched={touched.address}
        />
      </div>
    </div>
  );
}

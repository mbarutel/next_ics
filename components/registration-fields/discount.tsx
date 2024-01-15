"use client";

import { Field } from "formik";
import React from "react";

export default function DiscountQuestion() {
  return (
    <div className="question_wrapper">
      <h2 className="question_title">Do you have a discount code?</h2>
      <p className="question_description mb-2 sm:mb-6">
        You can get our discount codes by our newsletter!
      </p>
      <Field type="text" name="discount" className="field_input w-full" />
    </div>
  );
}

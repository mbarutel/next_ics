"use client";

import { Field } from "formik";
import React from "react";
import QuestionTitle from "./question-title";

export default function DiscountQuestion() {
  return (
    <div className="question_wrapper">
      <QuestionTitle>Discount Code</QuestionTitle>
      <p className="-mt-2 mb-2">
        You can get our discount codes by our newsletter!
      </p>
      <Field type="text" name="discount" className="field_input w-full" />
    </div>
  );
}

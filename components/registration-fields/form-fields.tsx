"use client";

import clsx from "clsx";
import React from "react";
import MainParticipant from "./main-participant";
import { Form, FormikErrors, FormikTouched } from "formik";
import { ConferenceType, FormValuesType } from "@/lib/types";
import ExtraParticipants from "./extra-participants";
import { Events } from "./events";
import Dinner from "./dinner";
import Masterclass from "./masterclass";

type FormikFormProps = {
  review: boolean;
  setReview: Function;
  isSubmitting: boolean;
  values: FormValuesType;
  setFieldValue: Function;
  conference: ConferenceType;
  errors: FormikErrors<FormValuesType>;
  touched: FormikTouched<FormValuesType>;
};

export default function FormFields(
  {
    conference,
    values,
    isSubmitting,
    errors,
    touched,
    setFieldValue,
    review,
    setReview,
  }: FormikFormProps,
) {
  return (
    <Form>
      <div style={{ display: review === false ? "block" : "hidden" }}>
        <Events
          errors={errors}
          touched={touched}
          choices={values.events}
          events={conference.events}
          setFieldValue={setFieldValue}
        />

        <MainParticipant
          errors={errors}
          touched={touched}
        />
        <ExtraParticipants extraParticipants={values.extraParticipants} />

        <Dinner
          name={values.name}
          setFieldValue={setFieldValue}
          participants={values.extraParticipants}
          dinnerParticipants={values.dinnerParticipants}
        />

        <Masterclass
          errors={errors}
          touched={touched}
          choice={values.masterclass}
          setFieldValue={setFieldValue}
          masterclasses={conference.masterclass}
        />
      </div>
      <SubmissionButton
        review={review}
        setReview={setReview}
        isSubmitting={isSubmitting}
      />
    </Form>
  );
}

function SubmissionButton(
  { review, setReview, isSubmitting }: {
    review: boolean;
    setReview: Function;
    isSubmitting: boolean;
  },
) {
  return (
    <div className="flex gap-2">
      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-green-200 rounded-sm border px-4 py-2 mt-4 text-slate-800/80 hover:scale-105 focus:scale-105 active:scale-95 transition ease-in-out font-semibold min-w-[8rem] flex justify-center"
      >
        {isSubmitting
          ? (
            <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-slate-800" />
          )
          : (
            <span>
              Submit
            </span>
          )}
      </button>
      <button
        type="button"
        className={clsx(
          "bg-sky-200 rounded-sm border px-4 py-2 mt-4 text-slate-800/80 hover:scale-105 focus:scale-105 active:scale-95 transition ease-in-out font-semibold min-w-[8rem] flex justify-center",
          { "hidden": review === false },
        )}
        onClick={() => setReview(!review)}
      >
        Make Changes
      </button>
    </div>
  );
}

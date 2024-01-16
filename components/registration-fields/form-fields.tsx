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
import Accomodation from "./accomodation";
import DiscountQuestion from "./discount";
import Agreement from "./agreement";
import Price from "./price";

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
  }: FormikFormProps,
) {
  return (
    <div className="bg-neutral-400 rounded-md px-5 lg:col-span-2">
      <Form>
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

        <Price
          errors={errors}
          touched={touched}
          prices={conference.prices}
          priceChoice={values.price.priceChoice}
          setFieldValue={setFieldValue}
          defaultDueDate={conference.date?.startDate.toString()}
        />

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

        <Accomodation
          errors={errors}
          touched={touched}
          choice={values.accomodation}
          setFieldValue={setFieldValue}
        />

        <DiscountQuestion />

        <Agreement
          errors={errors}
          touched={touched}
          choice={values.agreement}
          setFieldValue={setFieldValue}
        />

        {/* Submit Buttons */}
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
        </div>
      </Form>
    </div>
  );
}

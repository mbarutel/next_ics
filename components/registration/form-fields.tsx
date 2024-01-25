"use client";

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
import Referral from "./referral";
import QuestionTitle from "./question-title";
import dayjs from "dayjs";

type FormikFormProps = {
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
    <Form>
      <div className="grid grid-cols-1 gap-2 xl:grid-cols-3 xl:gap-3">
        <div className="border-2 rounded-md px-5 xl:col-span-2 bg-stone-800">
          <MainParticipant
            errors={errors}
            touched={touched}
          />

          <Events
            errors={errors}
            touched={touched}
            choices={values.events}
            events={conference.events}
            setFieldValue={setFieldValue}
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

          <Referral
            errors={errors}
            touched={touched}
            choice={values.referral}
            setFieldValue={setFieldValue}
          />

          <DiscountQuestion />

          <Agreement
            errors={errors}
            touched={touched}
            choice={values.agreement}
            setFieldValue={setFieldValue}
          />
        </div>
        <div className="border-2 rounded-md px-5 h-fit sticky top-5 py-4 bg-stone-800">
          <ReviewBox conference={conference} values={values} />
          {/* Submit Buttons */}
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-gradient-to-b gradient rounded-md border px-4 py-2 mt-4 hover:scale-105 focus:scale-105 active:scale-95 transition ease-in-out  min-w-[8rem] flex justify-center text-black"
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
        </div>
      </div>
    </Form>
  );
}

function ReviewBox(
  { conference, values }: {
    conference: ConferenceType;
    values: FormValuesType;
  },
) {
  if (!conference.prices) return null;

  const participantQty = values.extraParticipants.length + 1;
  const total = values.price.priceChoice * participantQty +
    values.dinnerParticipants.length * conference.prices?.dinner +
    (values.masterclass !== "no" ? conference.prices?.masterclass : 0);

  return (
    <>
      <QuestionTitle>Summary</QuestionTitle>
      <div>
        <h3 className="font-semibold">Event(s):</h3>
        <div className="pl-4">
          {values.events.map((event, index) => <p key={index}>• {event}</p>)}
        </div>
      </div>
      <div>
        <h3>
          <span className="font-semibold">Participant(s):</span>{" "}
          {participantQty}
        </h3>
      </div>
      <div>
        <h3>
          <span className="font-semibold">
            Registration Fee:
          </span>{" "}
          {values.price.dueDate && (
            <span className="italic">
              Before {dayjs(values.price.dueDate).format("DD, MMM YYYY")}
              {" "}
            </span>
          )}
          ${values.price.priceChoice}
        </h3>
      </div>
      <div>
        <h3>
          <span className="font-semibold">Dinner:</span>{" "}
          {values.dinnerParticipants.length === 0 ? "No" : "Yes"}
        </h3>
        {values.dinnerParticipants.length > 0 && (
          <h3 className="pl-4">
            Dinner Participant(s): {values.dinnerParticipants.length}
          </h3>
        )}
      </div>
      <div>
        <h3>
          <span className="font-semibold">Masterclass:</span>{" "}
          {values.masterclass === "no" && "No"}
        </h3>
        {values.masterclass !== "no" && (
          <p className="capitalize pl-4">• {values.masterclass}</p>
        )}
      </div>
      <div>
        <h3>
          <span className="font-semibold">
            Accomodation:
          </span>{" "}
          {values.accomodation === 0
            ? "No"
            : (values.accomodation) + " night(s)"}
        </h3>
        {values.accomodation > 0 && (
          <p className="italic pl-4">
            We will contact you for accomodation invoicing
          </p>
        )}
      </div>
      <div>
        <h3>
          <span className="font-semibold">Discount Code:</span>{" "}
          {values.discount === "" ? "None" : values.discount}
        </h3>
      </div>
      {values.agreement && (
        <div>
          <h3>
            <span className="font-semibold">Agreement:</span> I agree
          </h3>
        </div>
      )}
      <div className="h-1 bg-white rounded-full my-3" />
      <QuestionTitle>Total</QuestionTitle>
      {values.discount !== "" && (
        <p className="italic -mt-2 mb-2 text-sm">
          Discount Code will be reflected in the invoice we send you.
        </p>
      )}
      {values.price.dueDate && (
        <h3>
          Registration: ${values.price.priceChoice} x {participantQty}{" "}
          person(s) = ${values.price.priceChoice * participantQty}
        </h3>
      )}
      {values.dinnerParticipants.length > 0 && (
        <h3>
          Dinner: ${conference.prices?.dinner} x{" "}
          {values.dinnerParticipants.length}{" "}
          person(s) = ${conference.prices?.dinner *
            values.dinnerParticipants.length}
        </h3>
      )}
      {values.masterclass !== "no" && (
        <h3>
          Masterclass: ${conference.prices?.masterclass}
        </h3>
      )}
      {total > 0 && <h3>Total: ${total}</h3>}
      <div className="h-1 bg-white/90 rounded-full mt-3" />
    </>
  );
}

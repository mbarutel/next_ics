"use client";

import dayjs from "dayjs";
import React from "react";
import Price from "./price";
import Dinner from "./dinner";
import { Events } from "./events";
import Referral from "./referral";
import Agreement from "./agreement";
import Masterclass from "./masterclass";
import Accomodation from "./accomodation";
import DiscountQuestion from "./discount";
import QuestionTitle from "./question-title";
import MainParticipant from "./main-participant";
import ExtraParticipants from "./extra-participants";
import Delegates from "./delegates";
import Divider from "../divider";
import { Form, FormikErrors, FormikTouched } from "formik";
import { ConferenceType, FormValuesType } from "@/lib/types";

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
    <Form className="bg-stone-800 rounded-md shadow-lg border-2 border-stone-700 overflow-hidden">
      {/* Form Header */}
      <div className="bg-gradient-to-b gradient text-black px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-10 border-b-2 border-stone-700">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 sm:mb-2">
          Registration Form
        </h1>
        <p className="text-black/80 text-base sm:text-lg">{conference.title}</p>
      </div>

      {/* Form Body */}
      <div className="px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-10 space-y-8 sm:space-y-10 md:space-y-12">
        {/* Section 1: Event Selection */}
        <section>
          <Events
            errors={errors}
            touched={touched}
            choices={values.events}
            events={conference.events}
            setFieldValue={setFieldValue}
          />
        </section>

        <Divider />

        {/* Section 2: Registration Fee */}
        <section>
          <Price
            errors={errors}
            touched={touched}
            prices={conference.prices}
            priceChoice={values.price.priceChoice}
            setFieldValue={setFieldValue}
            defaultDueDate={conference.date?.startDate.toString()}
          />
        </section>

        <Divider />

        {/* Section 3: Delegate Information */}
        <section>
          <Delegates
            values={values}
            errors={errors}
            touched={touched}
            setFieldValue={setFieldValue}
            masterclasses={conference.masterclass}
            dinnerPrice={conference.prices?.dinner || 150}
            masterclassPrice={conference.prices?.masterclass || 350}
          />
        </section>

        <Divider />

        {/* Section 4: Discount Code */}
        <section>
          <DiscountQuestion />
        </section>

        <Divider />

        {/* Section 5: Order Summary */}
        <section>
          <ReviewBox conference={conference} values={values} />
        </section>

        <Divider />

        {/* Section 6: How did you hear about us */}
        <section>
          <Referral
            errors={errors}
            touched={touched}
            choice={values.referral}
            setFieldValue={setFieldValue}
          />
        </section>

        <Divider />

        {/* Section 7: Agreement */}
        <section>
          <Agreement
            errors={errors}
            touched={touched}
            choice={values.agreement}
            setFieldValue={setFieldValue}
          />
        </section>
      </div>

      {/* Form Footer */}
      <div className="bg-stone-700/50 px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6 border-t-2 border-stone-700 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
        <p className="text-xs sm:text-sm text-gray-400 text-center sm:text-left">
          All fields are required unless marked optional
        </p>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 sm:px-8 py-3 bg-gradient-to-b gradient text-black font-semibold rounded-md hover:scale-105 transition-all shadow-md hover:shadow-lg whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Submitting..." : "Submit Registration"}
        </button>
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

  // Calculate from delegates if they exist, otherwise use old method
  const useDelegates = values.delegates && values.delegates.length > 0;

  let participantQty: number;
  let dinnerCount: number;
  let masterclassCount: number;
  let accommodationTotal: number = 0;

  if (useDelegates) {
    participantQty = values.delegates.length;
    dinnerCount = values.delegates.filter(d => d.dinner).length;
    masterclassCount = values.delegates.filter(d => d.masterclass !== null && d.masterclass !== "").length;
    accommodationTotal = values.delegates.reduce((sum, d) => sum + d.accommodationNights, 0);
  } else {
    participantQty = values.extraParticipants.length + 1;
    dinnerCount = values.dinnerParticipants.length;
    masterclassCount = values.masterclass !== "no" ? 1 : 0;
  }

  const registrationFee = values.price.priceChoice * participantQty;
  const dinnerFee = dinnerCount * conference.prices?.dinner;
  const masterclassFee = masterclassCount * conference.prices?.masterclass;
  const total = registrationFee + dinnerFee + masterclassFee;
  const gst = total * 0.1;

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
        {useDelegates && values.delegates.length > 0 && (
          <div className="pl-4 mt-2 space-y-2">
            {values.delegates.map((delegate, index) => (
              <div key={index} className="text-sm border-l-2 border-yellow-500 pl-2">
                <p className="font-medium">
                  {index + 1}. {delegate.firstName} {delegate.lastName}
                </p>
                <p className="text-xs text-gray-400">
                  {delegate.jobTitle} at {delegate.organization}
                </p>
                {(delegate.dinner || delegate.masterclass || delegate.accommodationNights > 0) && (
                  <div className="text-xs text-gray-300 mt-1">
                    {delegate.dinner && <span>• Dinner </span>}
                    {delegate.masterclass && <span>• Masterclass </span>}
                    {delegate.accommodationNights > 0 && (
                      <span>• {delegate.accommodationNights} night(s) accommodation</span>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
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
          {useDelegates ? (dinnerCount === 0 ? "No" : "Yes") : (values.dinnerParticipants.length === 0 ? "No" : "Yes")}
        </h3>
        {dinnerCount > 0 && (
          <h3 className="pl-4">
            Dinner Participant(s): {dinnerCount}
          </h3>
        )}
      </div>
      <div>
        <h3>
          <span className="font-semibold">Masterclass:</span>{" "}
          {useDelegates ? (masterclassCount === 0 ? "No" : "Yes") : (values.masterclass === "no" ? "No" : "Yes")}
        </h3>
        {useDelegates && masterclassCount > 0 && (
          <h3 className="pl-4">
            Masterclass Participant(s): {masterclassCount}
          </h3>
        )}
        {!useDelegates && values.masterclass !== "no" && (
          <p className="capitalize pl-4">• {values.masterclass}</p>
        )}
      </div>
      <div>
        <h3>
          <span className="font-semibold">
            Accommodation:
          </span>{" "}
          {useDelegates
            ? (accommodationTotal === 0 ? "No" : `${accommodationTotal} night(s)`)
            : (values.accomodation === 0 ? "No" : `${values.accomodation} night(s)`)
          }
        </h3>
        {(useDelegates ? accommodationTotal > 0 : values.accomodation > 0) && (
          <p className="italic pl-4">
            We will contact you for accommodation invoicing
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
          person(s) = ${registrationFee}
        </h3>
      )}
      {dinnerCount > 0 && (
        <h3>
          Dinner: ${conference.prices?.dinner} x {dinnerCount}{" "}
          person(s) = ${dinnerFee}
        </h3>
      )}
      {masterclassCount > 0 && (
        <h3>
          Masterclass: ${conference.prices?.masterclass} x {masterclassCount}{" "}
          person(s) = ${masterclassFee}
        </h3>
      )}
      {total > 0 && <h3>10% GST: ${gst}</h3>}
      {total > 0 && <h3>Total: ${total + gst}</h3>}
      <div className="h-1 bg-white/90 rounded-full mt-3" />
    </>
  );
}

"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import { Formik, FormikHelpers } from "formik";
import FormFields from "./registration-fields/form-fields";
import { ConferenceType, FormValuesType, ParticipantType } from "@/lib/types";
import FormValidation from "./registration-fields/form-validation";

export default function RegistrationForm(conference: ConferenceType) {
  const [review, setReview] = useState<boolean>(false);

  const handleOnSubmit = async (
    { values }: { values: FormValuesType },
  ) => {
    console.log("hello before trying");
    try {
      const rawResponse = await fetch("/api/registration", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          conference: conference.title,
        }),
      });

      const response = await rawResponse.json();

      if ("error" in response) {
        toast.error(response.error);
        return;
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }

    // try {
    //   const body = JSON.stringify({
    //     ...values,
    //     conference: conference.title,
    //     prices: {
    //       dinner: conference.fees?.dinner,
    //       masterclass: conference.fees?.masterclass,
    //     },
    //   });
    //   const rawXeroResponse = await fetch("/api/xero", {
    //     method: "POST",
    //     body,
    //   });
    //
    //   const response = await rawXeroResponse.json();
    //
    //   if ("error" in response) {
    //     toast.error(response.error);
    //     return;
    //   } else {
    //     toast.success("Registration Successful");
    //   }
    // } catch (error) {
    //   if (error instanceof Error) {
    //     console.log(error.message);
    //   }
    // }
  };

  return (
    <div>
      <Formik
        initialValues={{
          name: "",
          company: "",
          position: "",
          phone: "",
          email: "",
          address: "",
          events: [],
          extraParticipants: [],
          price: { priceChoice: 0, dueDate: null },
          dinnerParticipants: [],
          masterclass: "",
          accomodation: 0,
          discount: "",
          referral: "",
          agreement: false,
        }}
        validationSchema={FormValidation}
        onSubmit={async (
          values: FormValuesType,
          { setSubmitting }: FormikHelpers<FormValuesType>,
        ) => {
          // if (review === false) {
          //   setReview(true);
          //   return;
          // }

          // Need to convert Values type to registrations type
          console.log("helllllo");
          setSubmitting(true);
          // await handleOnSubmit({ values });
          // redirect("/");
          console.log(values);
          setSubmitting(false);
        }}
      >
        {({ values, isSubmitting, errors, touched, setFieldValue }) => (
          <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-5">
            <FormFields
              review={review}
              setReview={setReview}
              values={values}
              errors={errors}
              touched={touched}
              conference={conference}
              isSubmitting={isSubmitting}
              setFieldValue={setFieldValue}
            />

            <ReviewBox values={values} />
          </div>
        )}
      </Formik>
    </div>
  );
}

function ReviewBox({ values }: { values: FormValuesType }) {
  return (
    <div className="bg-neutral-400 rounded-md px-5 h-fit sticky top-5 py-4">
      <h2 className="question_title">Summary</h2>
      <div>
        <h3>Events</h3>
        <div className="pl-4">
          {values.events.map((event, index) => <p key={index}>{event}</p>)}
        </div>
      </div>
      <div>
        <h3>Main Participant</h3>
        <div className="pl-4">
          <p>Name: {values.name}</p>
          <p>Company: {values.company}</p>
          <p>Position: {values.position}</p>
          <p>Phone: {values.phone}</p>
          <p>Email: {values.email}</p>
          <p>Address: {values.address}</p>
        </div>
      </div>
      {values.extraParticipants.length > 0 && (
        <div>
          <h3>Extra Participants</h3>
          <div className="pl-4">
            {values.extraParticipants.map((participant, index) => {
              const participantAsType = participant as ParticipantType;

              return (
                <div key={index}>
                  <p>Name: {participantAsType.name}</p>
                  <p>Position: {participantAsType.position}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

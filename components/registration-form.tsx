"use client";

import Link from "next/link";
import toast from "react-hot-toast";
import React, { useState } from "react";
import { Formik, FormikHelpers } from "formik";
import FormFields from "./registration/form-fields";
import { registrationObjectApiParser } from "@/lib/utils";
import FormValidation from "./registration/form-validation";
import { ConferenceType, FormValuesType } from "@/lib/types";

export default function RegistrationForm(conference: ConferenceType) {
  const [complete, setComplete] = useState<boolean>(false);

  const handleOnSubmit = async (
    { values, conference }: {
      values: FormValuesType;
      conference: ConferenceType;
    },
  ) => {
    try {
      const registrationObject = registrationObjectApiParser({
        values: values,
        conference: conference,
      });

      // Google API
      try {
        try {
          const rawResponse = await fetch("/api/registration", {
            method: "POST",
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...registrationObject,
            }),
          });

          const response = await rawResponse.json();

          if ("error" in response) {
            toast.error(
              "There was an error. We would appreciate it if you contact us about. Sorry for the inconvenience.",
            );
            return;
          }
        } catch {
          toast.error(
            "There was an error. We would appreciate it if you contact us about. Sorry for the inconvenience.",
          );
          return;
        }

        // XERO API
        try {
          const rawXeroResponse = await fetch("/api/xero", {
            method: "POST",
            body: JSON.stringify({ ...registrationObject }),
          });

          const response = await rawXeroResponse.json();

          if ("error" in response) {
            toast.error(
              "There was an error. We would appreciate it if you contact us about. Sorry for the inconvenience.",
            );
            return;
          }

          setComplete(true);
        } catch {
          toast.error(
            "There was an error. We would appreciate it if you contact us about. Sorry for the inconvenience.",
          );
        }
      } catch {
        toast.error(
          "There was an error. We would appreciate it if you contact us about. Sorry for the inconvenience.",
        );
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
      toast.error(
        "There was an error. We would appreciate it if you contact us about. Sorry for the inconvenience.",
      );
    }
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
          masterclass: "no",
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
          setSubmitting(true);
          await handleOnSubmit({ values, conference });
          setSubmitting(false);
        }}
      >
        {({ values, isSubmitting, errors, touched, setFieldValue }) => (
          <>
            {complete && <FormComplete />}
            <FormFields
              values={values}
              errors={errors}
              touched={touched}
              conference={conference}
              isSubmitting={isSubmitting}
              setFieldValue={setFieldValue}
            />
          </>
        )}
      </Formik>
    </div>
  );
}

function FormComplete() {
  return (
    <div className="absolute inset-0 bg-black/70 flex justify-start items-center z-[9999] -mt-5">
      <div className="fixed text-gray-800 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-tr gradient py-10 px-5 rounded-md shadow-md shadow-black/70 flex_col items-center">
        <h1 className="xl:text-5xl lg:text-4xl md:text-3xl text:2xl text-center font-semibold mb-7 drop-shadow-md">
          Thank you for registering! We will be in touch soon.
        </h1>
        <Link
          href="/"
          className="button_config bg-gray-800 text-white shadow-md shadow-black/70"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}

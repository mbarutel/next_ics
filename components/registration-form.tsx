"use client";

import toast from "react-hot-toast";
import React, { useState } from "react";
import { Formik, FormikHelpers } from "formik";
import FormFields from "./registration/form-fields";
import { RegistrationObjectApiParser } from "@/lib/utils";
import FormValidation from "./registration/form-validation";
import { ConferenceType, FormValuesType } from "@/lib/types";
import Link from "next/link";

export default function RegistrationForm(conference: ConferenceType) {
  const [complete, setComplete] = useState<boolean>(false);

  const handleOnSubmit = async (
    { values, conference }: {
      values: FormValuesType;
      conference: ConferenceType;
    },
  ) => {
    try {
      const registrationObject = RegistrationObjectApiParser({
        values: values,
        conference: conference,
      });

      // try {
      //   const rawResponse = await fetch("/api/registration", {
      //     method: "POST",
      //     headers: {
      //       "Accept": "application/json",
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({
      //       ...registrationObject,
      //       conference: conference.title,
      //     }),
      //   });
      //
      //   const response = await rawResponse.json();
      //
      //   if ("error" in response) {
      //     toast.error(response.error);
      //   }
      // } catch (error) {
      //   if (error instanceof Error) {
      //     console.log(error);
      //   }
      // }

      try {
        const body = JSON.stringify(registrationObject);

        const rawXeroResponse = await fetch("/api/xero", {
          method: "POST",
          body,
        });

        console.log(rawXeroResponse);
        // const response = await rawXeroResponse.json();

        // console.log(response);

        // if ("error" in response) {
        //   toast.error(response.error);
        //   return;
        // } else {
        //   toast.success("Registration Successful");
        // }
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
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
          paymentMethod: "credit",
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
          setSubmitting(true);
          await handleOnSubmit({ values, conference });
          setSubmitting(false);
          // setComplete(true);
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
        <h1 className="xl:text-5xl lg:text-4xl md:text-3xl text:2xl text-center font-semibold mb-7">
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

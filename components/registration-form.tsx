"use client";

import React, { useState } from "react";
// import toast from "react-hot-toast";
// import { redirect } from "next/navigation";
// import FormQuestions from "./form-questions";
import { Formik, FormikHelpers } from "formik";
import FormFields from "./registration-fields/form-fields";
import FormValidation from "./registration-fields/form-validation";
import { ConferenceType, FormValuesType, RegistrationType } from "@/lib/types";


export default function RegistrationForm(conference: ConferenceType) {
  const [review, setReview] = useState<boolean>(false);

  // const handleOnSubmit = async (
  //   { values }: { values: ValuesType },
  // ) => {
  //   try {
  //     const rawResponse = await fetch("/api/registration", {
  //       method: "POST",
  //       headers: {
  //         "Accept": "application/json",
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         ...values,
  //         conference: conference.title,
  //       }),
  //     });
  //
  //     const response = await rawResponse.json();
  //
  //     if ("error" in response) {
  //       toast.error(response.error);
  //       return;
  //     }
  //
  //     try {
  //       const body = JSON.stringify({
  //         ...values,
  //         conference: conference.title,
  //         prices: {
  //           dinner: conference.fees?.dinner,
  //           masterclass: conference.fees?.masterclass,
  //         },
  //       });
  //       const rawXeroResponse = await fetch("/api/xero", {
  //         method: "POST",
  //         body,
  //       });
  //
  //       const response = await rawXeroResponse.json();
  //
  //       if ("error" in response) {
  //         toast.error(response.error);
  //         return;
  //       } else {
  //         toast.success("Registration Successful");
  //       }
  //     } catch (error) {
  //       if (error instanceof Error) {
  //         console.log(error.message);
  //       }
  //     }
  //   } catch (error) {
  //     if (error instanceof Error) {
  //       console.log(error.message);
  //     }
  //   }
  // };

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
          price: { fee: null, dueDate: null },
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
          if (review === false) {
            setReview(true);
            return;
          }

          // Need to convert Values type to registrations type
          setSubmitting(true);
          // await handleOnSubmit({ values });
          // redirect("/");
          console.log(values);
          setSubmitting(false);
        }}
      >
        {({ values, isSubmitting, errors, touched, setFieldValue }) => (
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
        )}
      </Formik>
    </div>
  );
}

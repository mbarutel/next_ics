"use client";

import { Field, Form, Formik } from "formik";
import InputField from "./input-field";
import clsx from "clsx";
import SpeakerQuestionDinner from "./speaker-question-dinner";

export default function SpeakerForm() {
  return (
    <Formik
      initialValues={{
        event: null,
        name: null,
        jobTitle: null,
        organisation: null,
        address: null,
        phone: null,
        email: null,
        paperTitle: null,
        biography: null,
        paperDescription: null,
        accomodation: null,
        dinnerParticipants: [],
        masterclass: null,
        payment: null,
        discount: null,
        referral: null,
        agreement: false,
      }}
      //validationSchema={FormValidation}
      onSubmit={async (
      ) => {
      }}
    >

      {({ values, isSubmitting, errors, touched, setFieldValue }) => (
        <Form className="flex_col gap-3 py-3">
          <h3 className="text-2xl italic">Speaker Information</h3>
          <Field name="name" type="text" placeholder="Full Name" className={clsx("field", { "!placeholder-red-500 !border-red-500": !values.name && touched.name })} />
          <Field name="jobTitle" type="text" placeholder="Job Title" className="field" />
          <Field name="organisation" type="text" placeholder="Organisation" className="field" />
          <Field name="address" type="text" placeholder="Address" className="field" />
          <Field name="phone" type="text" placeholder="Phone" className="field" />
          <Field name="email" type="text" placeholder="Email" className="field" />

          <h3 className="text-2xl italic">Paper Information</h3>
          <Field name="paperTitle" type="text" placeholder="Paper Title" className="field" />
          <div className="grid grid-cols-2 gap-3">
            <Field name="biography" as="textarea" placeholder="Speaker Biography" className="field" />
            <Field name="paperDescription" as="textarea" placeholder="Paper Description" className="field" />
          </div>

          <h3 className="text-2xl italic">Networking & Accomodation</h3>
          <h2 className="text-xl italic">Accomodation</h2>
          <div className="grid grid-cols-3 gap-3">
            <label className="flex gap-2">
              <Field name="accomodation" type="radio" value="1" />
              Yes, one (1) night
            </label>
            <label className="flex gap-2">
              <Field name="accomodation" type="radio" value="2" />
              Yes, two (2) nights
            </label>
            <label className="flex gap-2">
              <Field name="accomodation" type="radio" value="3" />
              Yes, three (3) nights
            </label>
            <label className="flex gap-2">
              <Field name="accomodation" type="radio" value="4" />
              Yes, four (4) nights
            </label>
            <label className="flex gap-2">
              <Field name="accomodation" type="radio" value="0" />
              No, thank you
            </label>
          </div>

          <SpeakerQuestionDinner
            name={values.name}
            price={150}
            setFieldValue={setFieldValue}
            dinnerParticipants={values.dinnerParticipants}
          />

        </Form>
      )}
    </Formik>
  )
}

"use client";

import { Field, Form, Formik } from "formik";
import SpeakerQuestionDinner from "./speaker-question-dinner";
import SpeakerQuestionInformation from "./speaker-question-information";
import SpeakerFormValidation from "./speaker-validation";

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
      validationSchema={SpeakerFormValidation}
      onSubmit={async (
      ) => {
      }}
    >

      {({ values, isSubmitting, touched, setFieldValue }) => (
        <Form className="flex_col gap-3 py-3">
          <SpeakerQuestionInformation values={values} touched={touched} />
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

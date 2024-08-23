"use client";

import QuestionSpeakerInformation from "./question-speaker-info";
import QuestionAccomodation from "./question-accomodation";
import { Form, Formik } from "formik";
import FormValidation from "./validation";
import QuestionDinner from "./question-dinner";
import QuestionMasterclass from "./question-masterclass";
import QuestionPaperInformation from "./question-paper-info";
import { EventType } from "@/lib/types";

type SpeakerFormProps = {
  events: EventType[];
};

export default function SpeakerForm({ events }: SpeakerFormProps) {
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
      validationSchema={FormValidation}
      onSubmit={async () => {}}
    >
      {({ values, isSubmitting, touched, setFieldValue }) => (
        <Form className="flex_col gap-3 py-3">
          <div>
            <h3 className="question_title">Speaker Information</h3>
            <QuestionSpeakerInformation values={values} touched={touched} />
          </div>
          <div>
            <h3 className="question_title">Paper Information</h3>
            <QuestionPaperInformation values={values} touched={touched} />
          </div>
          <div>
            <h3 className="text-2xl italic">Networking & Accomodation</h3>
            <QuestionAccomodation values={values} touched={touched} />
            <QuestionDinner
              name={values.name}
              price={150}
              setFieldValue={setFieldValue}
              dinnerParticipants={values.dinnerParticipants}
            />
            {events[0].conference && (
              <QuestionMasterclass
                masterclasses={events[0].conference.masterclass}
                touched={touched}
              />
            )}
          </div>
        </Form>
      )}
    </Formik>
  );
}

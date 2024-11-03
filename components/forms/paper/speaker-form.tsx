"use client";

import QuestionSpeakerInformation from "./question-speaker-info";
import QuestionAccomodation from "./question-accomodation";
import { Form, Formik } from "formik";
import FormValidation from "./validation";
import QuestionDinner from "./question-dinner";
import QuestionMasterclass from "./question-masterclass";
import QuestionPaperInformation from "./question-paper-info";
import { EventType } from "@/lib/types";
import QuestionPaymentType from "./question-payment-type";
import QuestionDiscount from "./question-discount";
import QuestionReferral from "./question-referral";
import QuestionGuidelines from "./question-guidelines";
import { initValues } from "@/lib/form-paper";
import QuestionConference from "./question-conference";

type SpeakerFormProps = {
  events: EventType[];
};

export default function SpeakerForm({ events }: SpeakerFormProps) {
  return (
    <Formik
      initialValues={{ ...initValues }}
      validationSchema={FormValidation}
      onSubmit={async () => { }}
    >
      {({ values, touched, setFieldValue, isSubmitting }) => (
        <Form>
          <QuestionConference
            values={values}
            touched={touched}
            events={events}
          />
          <QuestionSpeakerInformation values={values} touched={touched} />
          <QuestionPaperInformation values={values} touched={touched} />
          <QuestionDinner
            name={values.name}
            price={150}
            setFieldValue={setFieldValue}
            dinnerParticipants={values.dinnerParticipants}
          />
          <QuestionAccomodation values={values} touched={touched} />
          <QuestionMasterclass
            values={values}
            touched={touched}
            events={events}
          />
          <QuestionPaymentType touched={touched} />
          <QuestionDiscount values={values} touched={touched} />
          <QuestionReferral touched={touched} />
          <QuestionGuidelines touched={touched} />
        </Form>
      )}
    </Formik>
  );
}

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
          <hr className="my-2" />
          <QuestionSpeakerInformation values={values} touched={touched} />
          <hr className="my-2" />
          <QuestionPaperInformation values={values} touched={touched} />
          <hr className="my-2" />
          <QuestionDinner
            name={values.name}
            price={150}
            setFieldValue={setFieldValue}
            dinnerParticipants={values.dinnerParticipants}
          />
          <hr className="my-2" />
          <QuestionAccomodation values={values} touched={touched} />
          <hr className="my-2" />
          <QuestionMasterclass
            values={values}
            touched={touched}
            events={events}
          />
          <hr className="my-2" />
          <QuestionPaymentType touched={touched} />
          <hr className="my-2" />
          <QuestionDiscount values={values} touched={touched} />
          <hr className="my-2" />
          <QuestionReferral touched={touched} />
          <hr className="my-2" />
          <QuestionGuidelines touched={touched} />
        </Form>
      )}
    </Formik>
  );
}

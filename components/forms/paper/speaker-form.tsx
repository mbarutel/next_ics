"use client";

import QuestionSpeakerInformation from "./question-speaker-info";
import QuestionPaperInformation from "./question-paper-info";
import QuestionAccomodation from "./question-accomodation";
import QuestionMasterclass from "./question-masterclass";
import QuestionGuidelines from "./question-guidelines";
import QuestionConference from "./question-conference";
import { Form, Formik, FormikTouched } from "formik";
import QuestionReferral from "./question-referral";
import QuestionDiscount from "./question-discount";
import QuestionDinner from "./question-dinner";
import { EventType } from "@/lib/types";
import {
  PaperFormikValuesType,
  FormValidation,
  initValues,
} from "@/lib/form-paper";

type SpeakerFormProps = {
  events: EventType[];
};

export default function SpeakerForm({ events }: SpeakerFormProps) {
  const handleOnSubmit = async (values: PaperFormikValuesType) => {
    console.log(values);
  };

  return (
    <Formik
      initialValues={{ ...initValues }}
      validationSchema={FormValidation}
      onSubmit={async (values: PaperFormikValuesType) => {
        await handleOnSubmit(values);
      }}
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
            values={values}
            touched={touched}
            price={150}
            name={values.name}
            setFieldValue={setFieldValue}
          />
          <QuestionAccomodation values={values} touched={touched} />
          <QuestionMasterclass
            values={values}
            touched={touched}
            events={events}
          />
          <QuestionDiscount />
          <QuestionReferral values={values} touched={touched} />
          <QuestionGuidelines values={values} touched={touched} />
          <SubmitButton isSubmitting={isSubmitting} />
        </Form>
      )}
    </Formik>
  );
}

// TODO: This should probably go on it's own file
function SubmitButton({ isSubmitting }: { isSubmitting: boolean }) {
  return (
    <button
      type="submit"
      disabled={isSubmitting}
      className="button_primary bg-yellow-400 mt-6 w-full"
    >
      Submit
    </button>
  );
}

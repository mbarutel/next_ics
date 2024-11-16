"use client";

import preparePaperPayload from "@/lib/utils/prepare-paper-payload";
import QuestionSpeakerInformation from "./question-speaker-info";
import QuestionPaperInformation from "./question-paper-info";
import QuestionAccomodation from "./question-accomodation";
import QuestionMasterclass from "./question-masterclass";
import QuestionGuidelines from "./question-guidelines";
import QuestionConference from "./question-conference";
import QuestionReferral from "./question-referral";
import QuestionDiscount from "./question-discount";
import QuestionDinner from "./question-dinner";
import { EventType } from "@/lib/types";
import { Form, Formik } from "formik";
import toast from "react-hot-toast";
import {
  PaperFormikValuesType,
  FormValidation,
  initValues,
} from "@/lib/form-paper";
import { useState } from "react";
import SubmissionComplete from "../submission-complete";

type FormPaperProps = {
  events: EventType[];
};

export default function FormPaper({ events }: FormPaperProps) {
  const [complete, setComplete] = useState(false);

  const submitToApi = async (url: string, body: any) => {
    const rawResponse = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    return rawResponse.json();
  };

  const showErrorToast = () => {
    toast.error(
      "There was an error. We would appreciate it if you contact us about it. Sorry for the inconvenience.",
    );
  };

  const handleOnSubmit = async (values: PaperFormikValuesType) => {
    const payload = preparePaperPayload(values);
    const response = await submitToApi("/api/google", payload);
    setComplete(true);
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
        <>
          {complete && <SubmissionComplete />}
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
        </>
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
      {!isSubmitting ? "Submit" : "Submitting..."}
    </button>
  );
}

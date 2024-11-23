"use client";

import preparePaperPayload from "@/lib/utils/prepare-paper-payload";
import QuestionSpeakerInformation from "./question-speaker-info";
import QuestionPaperInformation from "./question-paper-info";
import QuestionAccomodation from "./question-accomodation";
import QuestionMasterclass from "./question-masterclass";
import SubmissionComplete from "../submission-complete";
import QuestionGuidelines from "./question-guidelines";
import QuestionConference from "./question-conference";
import QuestionReferral from "./question-referral";
import QuestionDiscount from "./question-discount";
import QuestionDinner from "./question-dinner";
import SubmitButton from "../submit-button";
import { EventType } from "@/lib/types";
import { Form, Formik } from "formik";
import toast from "react-hot-toast";
import {
  PaperFormikValuesType,
  FormValidation,
  initValues,
} from "@/lib/form-paper";
import { useState } from "react";

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

  const handleOnSubmit = async (values: PaperFormikValuesType) => {
    try {
      const payload = preparePaperPayload(values);
      await submitToApi("/api/google", payload);
      setComplete(true);
    } catch {
      toast.error(
        "Unfortunately an error has occured. Please contact us and we will handle the submission manually. Thank you for understanding.",
      );
    }
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
            <QuestionReferral values={values} touched={touched} />
            <QuestionGuidelines values={values} touched={touched} />
            <SubmitButton isSubmitting={isSubmitting} />
          </Form>
        </>
      )}
    </Formik>
  );
}

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
import { useState, useEffect, useRef } from "react";
import {
  savePaperFormData,
  loadPaperFormData,
  clearPaperFormData,
} from "@/helpers/paper-local-storage";
import {
  validatePaperSubmission,
  hasPaperValidationErrors,
  getFirstPaperErrorField,
} from "@/helpers/paper-validation";

type FormPaperProps = {
  events: EventType[];
};

export default function FormPaper({ events }: FormPaperProps) {
  const [complete, setComplete] = useState(false);
  const [initialFormValues, setInitialFormValues] = useState({ ...initValues });
  const [isLoaded, setIsLoaded] = useState(false);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = loadPaperFormData();
    if (savedData) {
      setInitialFormValues(savedData);
      toast.success("Draft restored from previous session");
    }
    setIsLoaded(true);
  }, []);

  // Cleanup debounce timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

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

  const scrollToError = (fieldName: string) => {
    const element = document.getElementsByName(fieldName)[0];
    if (element) {
      // Scroll with offset for fixed headers if any
      const yOffset = -100;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });

      // Focus the element
      setTimeout(() => {
        element.focus();
      }, 500);
    }
  };

  const handleOnSubmit = async (values: PaperFormikValuesType) => {
    try {
      // Submit to new paper submission API
      const response = await submitToApi("/api/submit-paper", values);

      if (response.success) {
        // Clear localStorage on successful submission
        clearPaperFormData();
        setComplete(true);
        toast.success(
          `Paper submission confirmed! A confirmation email has been sent to ${values.email}`
        );
      } else {
        throw new Error(response.error || "Submission failed");
      }
    } catch (error) {
      console.error("Error submitting paper:", error);
      toast.error(
        "Unfortunately an error has occurred. Please contact us and we will handle the submission manually. Thank you for understanding.",
      );
    }
  };

  // Debounced save function (2 seconds delay)
  const debouncedSave = (values: PaperFormikValuesType) => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    debounceTimerRef.current = setTimeout(() => {
      savePaperFormData(values);
    }, 2000);
  };

  // Don't render until we've checked localStorage
  if (!isLoaded) {
    return (
      <div className="bg-white rounded-md shadow-lg border border-gray-200 overflow-hidden">
        <div className="px-8 py-20 text-center">
          <p className="text-gray-600">Loading form...</p>
        </div>
      </div>
    );
  }

  return (
    <Formik
      initialValues={initialFormValues}
      validationSchema={FormValidation}
      validate={(values) => {
        // Use custom validation instead of Yup for better error messages
        const errors = validatePaperSubmission(values);
        return errors;
      }}
      onSubmit={async (values: PaperFormikValuesType, { setErrors }) => {
        // Validate before submit
        const validationErrors = validatePaperSubmission(values);

        if (hasPaperValidationErrors(validationErrors)) {
          setErrors(validationErrors);
          const firstError = getFirstPaperErrorField(validationErrors);
          if (firstError) {
            scrollToError(firstError);
          }
          toast.error("Please fix all errors before submitting");
          return;
        }

        await handleOnSubmit(values);
      }}
      enableReinitialize
    >
      {({ values, touched, setFieldValue, isSubmitting }) => {
        // Auto-save on value changes
        useEffect(() => {
          if (isLoaded) {
            debouncedSave(values);
          }
        }, [values, isLoaded]);

        return (
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
        );
      }}
    </Formik>
  );
}

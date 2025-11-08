"use client";

import Link from "next/link";
import toast from "react-hot-toast";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { Formik, FormikHelpers } from "formik";
import FormFields from "./registration/form-fields";
import { registrationObjectApiParser } from "@/lib/utils";
import FormValidation from "./registration/form-validation";
import { ConferenceType, FormValuesType } from "@/lib/types";
import { saveFormData, loadFormData, clearFormData } from "@/lib/local-storage";

export default function RegistrationForm(conference: ConferenceType) {
  const [complete, setComplete] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [initialValues, setInitialValues] = useState<FormValuesType>({
    name: "",
    company: "",
    position: "",
    phone: "",
    email: "",
    address: "",
    events: [],
    extraParticipants: [],
    price: { priceChoice: 0, dueDate: null },
    dinnerParticipants: [],
    masterclass: "no",
    accomodation: 0,
    discount: "",
    referral: "",
    agreement: false,
    delegates: [{
      firstName: "",
      lastName: "",
      jobTitle: "",
      organization: "",
      email: "",
      phone: "",
      diet: "normal",
      dinner: false,
      masterclass: null,
      accommodationNights: 0,
    }],
  });

  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Load saved form data on mount
  useEffect(() => {
    const savedData = loadFormData();
    if (savedData) {
      setInitialValues(savedData);
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

  // Debounced save function (2 seconds delay)
  const debouncedSave = useCallback((data: FormValuesType) => {
    if (!isLoaded) return; // Don't save until initial load is complete

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    debounceTimerRef.current = setTimeout(() => {
      saveFormData(data);
    }, 2000);
  }, [isLoaded]);

  // Scroll to error field
  const scrollToError = useCallback((fieldName: string) => {
    // Convert field name to element ID
    const element = document.querySelector(`[name="${fieldName}"]`);
    if (element) {
      const yOffset = -100;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });

      setTimeout(() => {
        if (element instanceof HTMLElement) {
          element.focus();
        }
      }, 500);
    }
  }, []);

  const showErrorToast = () => {
    toast.error(
      "There was an error. We would appreciate it if you contact us about it. Sorry for the inconvenience.",
    );
  };

  const submitToAPI = async (url: string, body: any) => {
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

  const handleOnSubmit = async ({
    values,
    conference,
  }: {
    values: FormValuesType;
    conference: ConferenceType;
  }) => {
    try {
      const registrationObject = registrationObjectApiParser({
        values: values,
        conference: conference,
      });

      try {
        const response = await submitToAPI(
          "/api/registration",
          registrationObject,
        );

        if ("error" in response) {
          showErrorToast();
          return;
        }

        const xeroResponse = await submitToAPI("/api/xero", registrationObject);

        if ("error" in xeroResponse) {
          showErrorToast();
          return;
        }

        // Clear localStorage on successful submission
        clearFormData();
        setComplete(true);
      } catch {
        showErrorToast();
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
      showErrorToast();
    }
  };

  // Show loading state while checking localStorage
  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="h-12 w-12 animate-spin rounded-full border-b-4 border-yellow-500 mx-auto mb-4" />
          <p className="text-gray-300">Loading form...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        validationSchema={FormValidation}
        validateOnChange={true}
        validateOnBlur={true}
        onSubmit={async (
          values: FormValuesType,
          { setSubmitting, setErrors }: FormikHelpers<FormValuesType>,
        ) => {
          setSubmitting(true);

          // Validate before submit
          try {
            await FormValidation.validate(values, { abortEarly: false });
            await handleOnSubmit({ values, conference });
          } catch (validationError: any) {
            if (validationError.inner && validationError.inner.length > 0) {
              // Scroll to first error
              const firstError = validationError.inner[0];
              scrollToError(firstError.path);
            }
            setErrors(validationError.inner?.reduce((acc: any, err: any) => {
              acc[err.path] = err.message;
              return acc;
            }, {}) || {});
          }

          setSubmitting(false);
        }}
      >
        {({ values, isSubmitting, errors, touched, setFieldValue }) => {
          // Auto-save form data when values change
          useEffect(() => {
            if (isLoaded) {
              debouncedSave(values);
            }
          }, [values]);

          return (
            <>
              {complete && <FormComplete />}
              <FormFields
                values={values}
                errors={errors}
                touched={touched}
                conference={conference}
                isSubmitting={isSubmitting}
                setFieldValue={setFieldValue}
              />
            </>
          );
        }}
      </Formik>
    </div>
  );
}

function FormComplete() {
  return (
    <div className="absolute inset-0 bg-black/70 flex justify-start items-center z-[9999] -mt-5">
      <div className="fixed text-gray-800 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-tr gradient py-10 px-5 rounded-md shadow-md shadow-black/70 flex_col items-center">
        <h1 className="xl:text-5xl lg:text-4xl md:text-3xl text:2xl text-center font-semibold mb-7 drop-shadow-md">
          Thank you for registering! We will be in touch soon.
        </h1>
        <Link
          href="/"
          className="button_config bg-gray-800 text-white shadow-md shadow-black/70"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}

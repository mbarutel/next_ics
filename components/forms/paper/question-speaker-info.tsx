import { PaperFormikValuesType } from "@/lib/form-paper";
import { Field, FormikTouched } from "formik";
import clsx from "clsx";
import { Fragment } from "react";
import QuestionTitle from "./question-title";

type InformationQuestionProps = {
  values: PaperFormikValuesType;
  touched: FormikTouched<PaperFormikValuesType>;
};

export default function QuestionSpeakerInformation({
  values,
  touched,
}: InformationQuestionProps) {
  const fields = [
    {
      name: "name",
      type: "text",
      placeholder: "Full Name",
      value: values.name,
      touched: touched.name,
    },
    {
      name: "jobTitle",
      type: "text",
      placeholder: "Job Title",
      value: values.jobTitle,
      touched: touched.jobTitle,
    },
    {
      name: "organisation",
      type: "text",
      placeholder: "Organisation",
      value: values.organisation,
      touched: touched.organisation,
    },
    {
      name: "address",
      type: "text",
      placeholder: "Address",
      value: values.address,
      touched: touched.address,
    },
    {
      name: "phone",
      type: "text",
      placeholder: "Phone",
      value: values.phone,
      touched: touched.phone,
    },
    {
      name: "email",
      type: "email",
      placeholder: "Email",
      value: values.email,
      touched: touched.email,
    },
  ];

  return (
    <>
      <hr className="my-2" />
      <div className="form_section_wrapper">
        <QuestionTitle title="Speaker Information" />
        <div className="fields_wrapper grid-cols-2">
          {fields.map((field, index) => (
            <Fragment key={index}>
              <Field
                name={field.name}
                type={field.type}
                placeholder={field.placeholder}
                className={clsx("field", {
                  "!placeholder-red-500 !border-red-500 italic":
                    !field.value?.trim() && field.touched,
                })}
              />
            </Fragment>
          ))}
        </div>
      </div>
    </>
  );
}

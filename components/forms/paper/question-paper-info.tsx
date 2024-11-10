import { PaperFormikValuesType } from "@/lib/form-paper";
import { Field, FormikTouched } from "formik";
import QuestionTitle from "./question-title";
import { Fragment } from "react";
import clsx from "clsx";

type QuestionPaperInformationProps = {
  values: PaperFormikValuesType;
  touched: FormikTouched<PaperFormikValuesType>;
};

export default function QuestionPaperInformation({
  values,
  touched,
}: QuestionPaperInformationProps) {
  const fields = [
    {
      name: "paperTitle",
      type: "text",
      placeholder: "Paper Title",
      value: values.paperTitle,
      touched: touched.paperTitle,
    },
    {
      name: "biography",
      as: "textarea",
      placeholder: "Speaker Biography",
      value: values.biography,
      touched: touched.biography,
    },
    {
      name: "paperDescription",
      as: "textarea",
      placeholder: "Paper Description",
      value: values.paperDescription,
      touched: touched.paperDescription,
    },
  ];

  return (
    <>
      <hr className="my-2" />
      <div className="form_section_wrapper">
        <QuestionTitle title="Paper Information" />
        <div className="fields_wrapper grid-cols-1">
          {fields.map((field, index) => (
            <Fragment key={index}>
              <Field
                name={field.name}
                type={field.type || "text"}
                as={field.as || "input"}
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

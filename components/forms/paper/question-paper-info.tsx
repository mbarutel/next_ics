import {
  PaperFormikValuesType,
  PaperSubmissionType,
} from "@/lib/form-paper-types";
import clsx from "clsx";
import { Field, FormikTouched } from "formik";

type QuestionPaperInformationProps = {
  values: PaperFormikValuesType;
  touched: FormikTouched<PaperSubmissionType>;
};

export default function QuestionPaperInformation({
  values,
  touched,
}: QuestionPaperInformationProps) {
  return (
    <>
      <Field
        type="text"
        name="title"
        placeholder="Paper Title"
        className={clsx("field", {
          "!placeholder-red-500 !border-red-500 italic":
            !values.jobTitle?.trim() && touched.jobTitle,
        })}
      />
      <div className="grid grid-cols-2 gap-2">
        <Field
          as="textarea"
          name="biography"
          placeholder="Speaker Biography"
          className={clsx("field", {
            "!placeholder-red-500 !border-red-500 italic":
              !values.name?.trim() && touched.name,
          })}
        />
        <Field
          as="textarea"
          name="description"
          placeholder="Paper Description"
          className={clsx("field", {
            "!placeholder-red-500 !border-red-500 italic":
              !values.organisation?.trim() && touched.organization,
          })}
        />
      </div>
    </>
  );
}

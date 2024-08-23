import {
  PaperFormikValuesType,
  PaperSubmissionType,
} from "@/lib/form-paper-types";
import clsx from "clsx";
import { Field, FormikTouched } from "formik";

type InformationQuestionProps = {
  values: PaperFormikValuesType;
  touched: FormikTouched<PaperSubmissionType>;
};

export default function QuestionSpeakerInformation({
  values,
  touched,
}: InformationQuestionProps) {
  return (
    <>
      <Field
        name="name"
        type="text"
        placeholder="Full Name"
        className={clsx("field", {
          "!placeholder-red-500 !border-red-500 italic":
            !values.name?.trim() && touched.name,
        })}
      />
      <Field
        name="jobTitle"
        type="text"
        placeholder="Job Title"
        className={clsx("field", {
          "!placeholder-red-500 !border-red-500 italic":
            !values.jobTitle?.trim() && touched.jobTitle,
        })}
      />
      <Field
        name="organisation"
        type="text"
        placeholder="Organisation"
        className={clsx("field", {
          "!placeholder-red-500 !border-red-500 italic":
            !values.organisation?.trim() && touched.organization,
        })}
      />
      <Field
        name="address"
        type="text"
        placeholder="Address"
        className={clsx("field", {
          "!placeholder-red-500 !border-red-500 italic":
            !values.address?.trim() && touched.address,
        })}
      />
      <Field name="phone" type="text" placeholder="Phone" className="field" />
      <Field
        name="phone"
        type="text"
        placeholder="Mobile"
        className={clsx("field", {
          "!placeholder-red-500 !border-red-500 italic":
            !values.phone?.trim() && touched.phone,
        })}
      />
      <Field
        name="email"
        type="text"
        placeholder="Email"
        className={clsx("field", {
          "!placeholder-red-500 !border-red-500 italic":
            !values.email?.trim() && touched.email,
        })}
      />
    </>
  );
}

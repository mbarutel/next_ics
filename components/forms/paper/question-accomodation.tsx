import {
  PaperFormikValuesType,
  PaperSubmissionFormValuesType,
} from "@/lib/form-paper";
import { Field, FormikTouched } from "formik";
import QuestionTitle from "./question-title";

type InformationQuestionProps = {
  values: PaperFormikValuesType;
  touched: FormikTouched<PaperFormikValuesType>;
};

export default function QuestionAccomodation({
  values,
  touched,
}: InformationQuestionProps) {
  const fields = [
    {
      value: "1",
      label: "Yes, one (1) night",
    },
    {
      value: "2",
      label: "Yes, two (2) nights",
    },
    {
      value: "3",
      label: "Yes, three (3) nights",
    },
    {
      value: "4",
      label: "Yes, four (4) nights",
    },
    {
      value: "0",
      label: "No, thank you",
    },
  ];

  return (
    <>
      <hr className="my-2" />
      <div className="form_section_wrapper">
        <QuestionTitle
          title="Accommodation"
          subtitle="Relax and recharge with our comfortable conference accommodations!"
          asterisk={
            !values.accomodation &&
            touched.accomodation && (
              <span className="untouched_field asterisk"> *</span>
            )
          }
        />
        <hr className="mb-2" />
        <div className="grid grid-cols-2 gap-3">
          {fields.map((field, index) => (
            <label key={index} className="flex gap-2 button_primary">
              <Field name="accomodation" type="radio" value={field.value} />
              {field.label}
            </label>
          ))}
        </div>
      </div>
    </>
  );
}

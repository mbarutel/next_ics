import {
  PaperFormikValuesType,
  PaperSubmissionType,
} from "@/lib/form-paper-types";
import { Field, FormikTouched } from "formik";

type InformationQuestionProps = {
  values: PaperFormikValuesType;
  touched: FormikTouched<PaperSubmissionType>;
};

export default function QuestionAccomodation({
  values,
  touched,
}: InformationQuestionProps) {
  return (
    <>
      <h2 className="text-xl italic">Accomodation</h2>
      <div className="grid grid-cols-3 gap-3">
        <label className="flex gap-2">
          <Field name="accomodation" type="radio" value="1" />
          Yes, one (1) night
        </label>
        <label className="flex gap-2">
          <Field name="accomodation" type="radio" value="2" />
          Yes, two (2) nights
        </label>
        <label className="flex gap-2">
          <Field name="accomodation" type="radio" value="3" />
          Yes, three (3) nights
        </label>
        <label className="flex gap-2">
          <Field name="accomodation" type="radio" value="4" />
          Yes, four (4) nights
        </label>
        <label className="flex gap-2">
          <Field name="accomodation" type="radio" value="0" />
          No, thank you
        </label>
      </div>
    </>
  );
}

import { PaperFormikValuesType } from "@/lib/form-paper";
import { Field, FormikTouched } from "formik";
import QuestionTitle from "./question-title";

export default function QuestionDiscount() {
  return (
    <>
      <hr className="my-2" />
      <div className="form_section_wrapper">
        <QuestionTitle title="Discount Code" />
        <Field
          name="discount"
          type="text"
          placeholder="Discount Code"
          className="field"
        />
      </div>
    </>
  );
}

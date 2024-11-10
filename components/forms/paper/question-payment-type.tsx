import QuestionTitle from "./question-title";
import { Field } from "formik";

export default function QuestionPaymentType() {
  return (
    <>
      <hr className="my-2" />
      <div className="form_section_wrapper">
        <QuestionTitle title="Preferred Payment Method" />
        <label className="flex gap-2">
          <Field name="payment" type="radio" value="credit" />
          Credit Card <span className="italic">(0.1% Surcharge)</span>
        </label>
        <label className="flex gap-2">
          <Field name="payment" type="radio" value="bank" />
          Direct Bank Transfer
        </label>
      </div>
    </>
  );
}

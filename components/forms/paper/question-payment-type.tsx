import { PaperFormikValuesType } from "@/lib/form-paper";
import { Field, FormikTouched } from "formik";
import QuestionTitle from "./question-title";

type QuestionPaymentTypeProps = {
  touched: FormikTouched<PaperFormikValuesType>;
};

export default function QuestionPaymentType({
  touched,
}: QuestionPaymentTypeProps) {
  return (
    <div className="form_section_wrapper">
      <QuestionTitle title="Preferred Payment Method" />
      <label className="flex gap-2">
        <Field name="payment" type="radio" value="1" />
        Credit Card <span className="italic">(0.1% Surcharge)</span>
      </label>
      <label className="flex gap-2">
        <Field name="payment" type="radio" value="2" />
        Direct Bank Transfer
      </label>
    </div>
  );
}

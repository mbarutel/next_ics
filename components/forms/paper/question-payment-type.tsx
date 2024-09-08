import { PaperFormikValuesType } from "@/lib/form-paper";
import { Field, FormikTouched } from "formik";

type QuestionPaymentTypeProps = {
  touched: FormikTouched<PaperFormikValuesType>;
};

export default function QuestionPaymentType({
  touched,
}: QuestionPaymentTypeProps) {
  return (
    <>
      <h2>Preferred Payment Method</h2>
      <label className="flex gap-2">
        <Field name="payment" type="radio" value="1" />
        Credit Card <span className="italic">(0.1% Surcharge)</span>
      </label>
      <label className="flex gap-2">
        <Field name="payment" type="radio" value="2" />
        Direct Bank Transfer
      </label>
    </>
  );
}

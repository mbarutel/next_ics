import { Field } from "formik";
import QuestionTitle from "./question-title";

export default function PaymentType(
  { choice, setFieldValue }: {
    choice: string;
    setFieldValue: Function;
  },
) {
  return (
    <div className="question_wrapper">
      <QuestionTitle>Payment Type</QuestionTitle>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => (setFieldValue("paymentMethod", "credit"))}
          className="flex items-center justify-start gap-2 bg-stone-700 border-[1px] border-white field_input text-white text-left"
        >
          <Field
            type="radio"
            name="paymentMethod"
            checked={choice === "credit"}
            onChange={() => {
              setFieldValue("paymentMethod", "credit");
            }}
          />
          Credit Card (incurs 5% surcharge bank fees)
        </button>
        <button
          type="button"
          onClick={() => (setFieldValue("paymentMethod", "bank"))}
          className="flex items-center justify-start gap-2 bg-stone-700 border-[1px] border-white field_input text-white"
        >
          <Field
            type="radio"
            name="paymentMethod"
            checked={choice === "bank"}
            onChange={() => {
              setFieldValue("paymentMethod", "bank");
            }}
          />
          Direct Bank Transfer
        </button>
      </div>
    </div>
  );
}

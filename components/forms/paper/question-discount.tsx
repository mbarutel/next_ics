import { PaperFormikValuesType } from "@/lib/form-paper";
import { Field, FormikTouched } from "formik";
import clsx from "clsx";

type QuestionDiscountProps = {
  values: PaperFormikValuesType;
  touched: FormikTouched<PaperFormikValuesType>;
};

export default function QuestionDiscount({
  values,
  touched,
}: QuestionDiscountProps) {
  return (
    <>
      <Field
        name="discount"
        type="text"
        placeholder="Discount Code"
        className={clsx("field", {
          "!placeholder-red-500 !border-red-500 italic":
            !values.discount?.trim() && touched.discount,
        })}
      />
    </>
  );
}

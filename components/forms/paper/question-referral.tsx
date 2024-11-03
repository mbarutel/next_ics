import { referralOptions } from "@/lib/data";
import { PaperFormikValuesType } from "@/lib/form-paper";
import { Field, FormikTouched } from "formik";
import { Fragment } from "react";
import QuestionTitle from "./question-title";

type QuestionReferralTypeProps = {
  touched: FormikTouched<PaperFormikValuesType>;
};

export default function QuestionReferral({
  touched,
}: QuestionReferralTypeProps) {
  const options: { value: string; label: string }[] = referralOptions.map(
    (item) => ({
      value: item.toLowerCase(),
      label: item,
    }),
  );

  return (
    <div className="form_section_wrapper">
      <QuestionTitle title="How did you hear about us?" />
      {options.map((item, index) => (
        <Fragment key={index}>
          <label className="flex gap-2">
            <Field name="referral" type="radio" value={item.value} />
            {item.label}
          </label>
        </Fragment>
      ))}
    </div>
  );
}

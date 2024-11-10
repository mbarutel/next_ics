import { QuestionBaseProps } from "@/lib/form-paper";
import { referralOptions } from "@/lib/data";
import QuestionTitle from "./question-title";
import { Fragment } from "react";
import { Field } from "formik";

export default function QuestionReferral({
  values,
  touched,
}: QuestionBaseProps) {
  const options: { value: string; label: string }[] = referralOptions.map(
    (item) => ({
      value: item.toLowerCase(),
      label: item,
    }),
  );

  return (
    <>
      <hr className="my-2" />
      <div className="form_section_wrapper">
        <QuestionTitle
          title="How did you hear about us?"
          subtitle="Relax and recharge with our comfortable conference accommodations!"
          asterisk={
            !values.referral &&
            touched.referral && (
              <span className="untouched_field asterisk"> *</span>
            )
          }
        />
        {options.map((item, index) => (
          <Fragment key={index}>
            <label className="flex gap-2">
              <Field name="referral" type="radio" value={item.value} />
              {item.label}
            </label>
          </Fragment>
        ))}
      </div>
    </>
  );
}

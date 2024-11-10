import { QuestionBaseProps } from "@/lib/form-paper";
import QuestionTitle from "./question-title";
import { Field } from "formik";

export default function QuestionGuidelines({
  touched,
  values,
}: QuestionBaseProps) {
  const guidelines = [
    "Papers should not contain offensive language and take into account cultural sensitivities of host country.",
    "Papers may treat the themes in a manner that contributes to further discussion of conference aims.",
    "Conference papers must be presented in the finish format not less than 60 days prior to the event.",
    "First round of papers closing date will be close of business on 30th November with a second if required.",
    "Papers that are not chosen in the first round may be resubmitted in the second round.",
    "Papers should be submitted in Microsoft Word format.",
    "Authors of papers presented at the conference will be formally notified of their acceptance.",
    "Papers should explore ways in which the themes show up in the philosophy of the conference.",
    "All papers must be presented in a positive and informative light.",
  ];

  return (
    <>
      <hr className="my-2" />
      <div className="form_section_wrapper">
        <QuestionTitle
          title="Guidelines for Submitting A Paper?"
          asterisk={
            !values.agreement &&
            touched.agreement && (
              <span className="untouched_field asterisk"> *</span>
            )
          }
        />
        <ul className="ul mb-6">
          {guidelines.map((item, index) => (
            <li className="italic" key={index}>
              {item}
            </li>
          ))}
        </ul>
        <label className="button_primary">
          <Field name="agreement" type="radio" value="true" />
          &nbsp;I Agree
        </label>
      </div>
    </>
  );
}

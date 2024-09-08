import { PaperFormikValuesType } from "@/lib/form-paper";
import { Field, FormikTouched } from "formik";

type QuestionGuidelinesProps = {
  touched: FormikTouched<PaperFormikValuesType>;
};

export default function QuestionGuidelines({
  touched,
}: QuestionGuidelinesProps) {
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
      <ul className="ul">
        {guidelines.map((item, index) => (
          <li className="italic" key={index}>
            {item}
          </li>
        ))}
      </ul>
      <label>
        <Field name="agreement" type="radio" value="agree" />
        &nbsp;I Agree
      </label>
    </>
  );
}

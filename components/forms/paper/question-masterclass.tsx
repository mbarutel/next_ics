import { FormValuesType, MasterclassType } from "@/lib/types";
import { FormikErrors, FormikTouched } from "formik";
import React, { Fragment } from "react";

//{ choice, price, masterclasses, errors, touched, setFieldValue }: {
//  choice: string;
//  price: number;
//  masterclasses: MasterclassType[] | undefined;
//  errors: FormikErrors<FormValuesType>;
//  touched: FormikTouched<FormValuesType>;
//  setFieldValue: Function;
//},
//
type QuestionMasterclassProps = {
  masterclasses: MasterclassType[];
  touched: FormikTouched<FormValuesType>;
};
export default function QuestionMasterclass({
  masterclasses,
  touched,
}: QuestionMasterclassProps) {
  return (
    <>
      <h2 className="text-xl italic">Post Conference Masterclass</h2>
      <div className="flex_col">
        {masterclasses.map((masterclass) => (
          <Fragment key={masterclass.slug}>
            <label>
              <input
                type="radio"
                name="masterclass"
                value={masterclass.title}
              />
              {masterclass.title}
            </label>
          </Fragment>
        ))}
        <label>
          <input type="radio" name="masterclass" value="no" />
          No
        </label>
      </div>
    </>
  );
}

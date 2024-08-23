import { FormValuesType, MasterclassType } from "@/lib/types";
import { FormikErrors, FormikTouched } from "formik";
import React from "react";

type QuestionMasterclassProps = {
  masterclasses: MasterclassType[];
  errors: FormikErrors<FormValuesType>;
  touched: FormikTouched<FormValuesType>;
};

//{ choice, price, masterclasses, errors, touched, setFieldValue }: {
//  choice: string;
//  price: number;
//  masterclasses: MasterclassType[] | undefined;
//  errors: FormikErrors<FormValuesType>;
//  touched: FormikTouched<FormValuesType>;
//  setFieldValue: Function;
//},
export default function QuestionMasterclass({
  masterclasses,
  errors,
  touched,
}: QuestionMasterclassProps) {
  return (
    <>
      <h2 className="text-xl italic">Masterclass</h2>
    </>
  );
}

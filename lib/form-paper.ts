import { DinnerParticipantType } from "./types";
import { FormikTouched } from "formik";
import * as Yup from "yup";

// This is used for the question components for accessing values
export type PaperFormikValuesType = {
  events: string;
  name: string;
  jobTitle: string;
  organisation: string;
  address: string;
  phone: string;
  email: string;
  paperTitle: string;
  biography: string;
  paperDescription: string;
  accomodation: string;
  dinnerParticipants: DinnerParticipantType[];
  masterclass: string;
  discount: string;
  referral: string;
  agreement: string;
};

export type PaperSubmissionPayloadType = {
  date: string;
  events: string;
  name: string;
  jobTitle: string;
  organisation: string;
  address: string;
  phone: string;
  email: string;
  paperTitle: string;
  biography: string;
  paperDescription: string;
  accomodation: string;
  dinnerParticipants: string;
  masterclass: string;
  discount: string;
  referral: string;
  agreement: string;
};

export const initValues: PaperFormikValuesType = {
  events: "",
  name: "",
  jobTitle: "",
  organisation: "",
  address: "",
  phone: "",
  email: "",
  paperTitle: "",
  biography: "",
  paperDescription: "",
  accomodation: "",
  dinnerParticipants: [],
  masterclass: "",
  discount: "",
  referral: "",
  agreement: "",
};

export type QuestionBaseProps = {
  values: PaperFormikValuesType;
  touched: FormikTouched<PaperFormikValuesType>;
};

export const FormValidation = Yup.object().shape({
  events: Yup.string().trim().required(),
  name: Yup.string().trim().required(),
  jobTitle: Yup.string().trim().required(),
  organisation: Yup.string().trim().required(),
  address: Yup.string().trim().required(),
  phone: Yup.string().trim().required(),
  email: Yup.string().trim().required(),
  paperTitle: Yup.string().trim().required(),
  biography: Yup.string().trim().required(),
  paperDescription: Yup.string().required(),
  accomodation: Yup.string().required(),
  dinnerParticipants: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required(),
      diet: Yup.string().required(),
    }),
  ),
  masterclass: Yup.string().trim(),
  discount: Yup.string().trim(),
  referral: Yup.string().trim().required(),
  agreement: Yup.string().matches(/^true$/),
});

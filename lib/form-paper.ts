import { DinnerParticipantType, EventType } from "./types";
import { FormikTouched } from "formik";

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
  payment: string;
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
  payment: "",
  discount: "",
  referral: "",
  agreement: "",
};

export type PaperSubmissionFormValuesType = {
  event: string[];
  name: string;
  jobTitle: string;
  organization: string;
  address: string;
  phone: string;
  email: string;
  speakerBiography: string;
  paperTitle: string;
  paperDescription: string;
  accomodation: number;
  dinnerParticipants: string;
  masterclass: string;
  discount: string;
  agreement: boolean;
  dinnerPrice: number;
  masterclassPrice: number;
  submissionPrice: number;
  total: number;
};

export type QuestionBaseProps = {
  values: PaperFormikValuesType;
  touched: FormikTouched<PaperFormikValuesType>;
};

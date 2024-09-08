import { DinnerParticipantType, EventType } from "./types";
import { FormikTouched } from "formik";

// This is used for the question components for accessing values
export type PaperFormikValuesType = {
  events: string[];
  name: string | null;
  jobTitle: string | null;
  organisation: string | null;
  address: string | null;
  phone: string | null;
  email: string | null;
  paperTitle: string | null;
  biography: string | null;
  paperDescription: string | null;
  accomodation: string | null;
  dinnerParticipants: DinnerParticipantType[];
  masterclass: string | null;
  payment: string | null;
  discount: string | null;
  referral: string | null;
  agreement: string | null;
};

export const initValues: PaperFormikValuesType = {
  events: [],
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

import { DinnerParticipantType, EventType } from "./types";

// This is used for the question components for accessing values
export type PaperFormikValuesType = {
  event: string | null,
  name: string | null,
  jobTitle: string | null,
  organisation: string | null,
  address: string | null,
  phone: string | null,
  email: string | null,
  paperTitle: string | null,
  biography: string | null,
  paperDescription: string | null,
  accomodation: string | null,
  dinnerParticipants: Array<DinnerParticipantType> | null,
  masterclass: string | null,
  payment: string | null,
  discount: string | null,
  referral: string | null,
  agreement: boolean,
}

export type PaperSubmissionType = {
  event: string;
  name: string;
  jobTitle: string;
  organization: string;
  address: string;
  phone: string;
  email: string;
  speakerBiography: string;
  paperTitle: string;
  paperDescription: boolean;
  accomodation: number;
  dinnerParticipants: DinnerParticipantType[];
  masterclass: string;
  agreement: boolean;
  discount: string;
  dinnerPrice: number;
  masterclassPrice: number;
  submissionPrice: number;
  total: number;
};

export type PaperSubmissionFormValuesType = {
  event: EventType;
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

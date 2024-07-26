import { EventType } from "./types";

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
  dinnerParticipants: string;
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

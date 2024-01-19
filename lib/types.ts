import {
  TypeConferencesSkeleton,
  TypeEventSkeleton,
  TypeMasterclassSkeleton,
  TypeSpeakerSkeleton,
} from "@/contentful/types/contentful/types";
import { Entry } from "contentful";
// import { eventLinks } from "./data";
import { Omit } from "@react-spring/web";
import { Document as RichTextDocument } from "@contentful/rich-text-types";

// export type SectionName = typeof eventLinks[number]["name"];

export type ConferencesEntry = Entry<
  TypeConferencesSkeleton,
  undefined,
  string
>;
export type MasterclassEntry = Entry<
  TypeMasterclassSkeleton,
  undefined,
  string
>;
export type EventEntry = Entry<TypeEventSkeleton, undefined, string>;
export type SpeakerEntry = Entry<TypeSpeakerSkeleton, undefined, string>;

export type PriceType = {
  dinner: number;
  masterclass: number;
  walkIn: number;
  student: number;
  base: {
    price: number;
    dueDate: Date;
  }[];
};

export type ConferenceType = {
  slug: string;
  title: string;
  venue: string;
  date: {
    startDate: Date;
    endDate: Date;
  } | undefined;
  coverImage: AssetType;
  events: EventType[];
  speakers: SpeakerType[];
  registrationLink: string; // Will be irrelevant soon
  masterclass: MasterclassType[];
  submitPaperLink: string | undefined;
  formLink: string | undefined;
  prices: PriceType | undefined;
};

export type EventType = {
  slug: string;
  title: string;
  tags: string[];
  description: string;
  agenda: AgendaType[];
  poster: AssetType;
  content: RichTextDocument;
  conference: ConferenceInEventType | undefined;
};

export type ConferenceInEventType = Omit<
  ConferenceType,
  "slug" | "tite" | "events" | "coverImage" | "speakers"
>;

export type AssetType = {
  src: string;
  alt: string;
};

export type MasterclassType = {
  title: string;
  slug: string;
  description: RichTextDocument;
  asset: AssetType | undefined;
};

export type SpeakerType = {
  name: string;
  slug: string;
  jobTitle: string;
  photo: AssetType;
  organization: string;
  biography: RichTextDocument;
};

export type AgendaRowType = {
  time: string;
  agenda: string[];
};

export type AgendaType = {
  title: string;
  row: AgendaRowType[];
};

// Registration Form Types

export type PriceChoiceType = {
  price: number;
  dueDate: Date;
};

export type ParticipantType = {
  name: string;
  email: string;
  position: string;
};

export type MainParticipantType = ParticipantType & {
  phone: string;
};

export type DinnerParticipantType = {
  name: string;
  diet: string;
};

export type RegistrationType = {
  events: string;
  company: string;
  address: string;
  discount: string;
  conference: string;
  referral: string;
  priceValue: number;
  priceDueDate: Date | null;
  agreement: boolean;
  masterclass: string;
  accomodation: number;
  paymentMethod: string;
  extraParticipants: ParticipantType;
  mainParticipant: MainParticipantType;
  dinnerParticipants: DinnerParticipantType;
};

export type FormValuesType = {
  name: string;
  company: string;
  position: string;
  phone: string;
  email: string;
  address: string;
  events: [];
  extraParticipants: [];
  price: {
    priceChoice: number;
    dueDate: Date | null;
  };
  dinnerParticipants: [];
  paymentMethod: "credit" | "bank";
  masterclass: string;
  accomodation: number;
  discount: string;
  referral: string;
  agreement: boolean;
};

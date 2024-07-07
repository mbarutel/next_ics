import {
  TypeEventSkeleton,
  TypeSpeakerSkeleton,
  TypeConferencesSkeleton,
  TypeMasterclassSkeleton,
  TypeCarouselImagesSkeleton,
  TypeSponsorSkeleton,
} from "@/contentful/types/contentful/types";
import { Entry } from "contentful";
import { Document as RichTextDocument } from "@contentful/rich-text-types";

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
export type CarouselImagesEntry = Entry<
  TypeCarouselImagesSkeleton,
  undefined,
  string
>;
export type EventEntry = Entry<TypeEventSkeleton, undefined, string>;
export type SponsorEntry = Entry<TypeSponsorSkeleton, undefined, string>;
export type SpeakerEntry = Entry<TypeSpeakerSkeleton, undefined, string>;

export type PriceType = {
  base: {
    price: number;
    dueDate: Date;
  }[];
  dinner: number;
  walkIn: number;
  masterclass: number;
};

export type CarouselImagesType = {
  images: AssetType[];
};

export type ConferenceType = {
  slug: string;
  title: string;
  venue: string;
  date:
  | {
    endDate: Date;
    startDate: Date;
  }
  | undefined;
  formLink: string;
  invoiceRef: string;
  events: EventType[];
  agenda: AgendaType[];
  coverImage: AssetType;
  speakers: SpeakerType[];
  prices: PriceType | undefined;
  masterclass: MasterclassType[];
  submitPaperLink: string | undefined;
  sponsors: SponsorType[];
};

export type EventType = {
  slug: string;
  title: string;
  description: string;
  poster: AssetType;
  content: RichTextDocument;
  conference: ConferenceInEventType | undefined;
};

export type ConferenceInEventType = Omit<
  ConferenceType,
  | "slug"
  | "tite"
  | "events"
  | "coverImage"
  | "speakers"
  | "prices"
  | "invoiceRef"
  | "sponsors"
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

export type SponsorType = {
  name: string;
  logo: AssetType;
  link: string;
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
  referral: string;
  reference: string;
  priceValue: number;
  conference: string;
  priceDueDate: Date | null;
  agreement: boolean;
  masterclass: string;
  accomodation: number;
  extraParticipants: string;
  mainParticipant: MainParticipantType;
  dinnerParticipants: string;
  dinnerPrice: number;
  masterclassPrice: number;
  total: number;
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
  masterclass: string;
  accomodation: number;
  discount: string;
  referral: string;
  agreement: boolean;
};

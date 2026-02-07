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

// New delegate type for improved registration form
export type DelegateType = {
  firstName: string;
  lastName: string;
  jobTitle: string;
  organization: string;
  email: string;
  phone: string;
  diet: string;
  dinner: boolean;
  masterclass: string | null;
  accommodationNights: number;
};

// Speaker participant type for paper submissions
export type SpeakerParticipantType = DelegateType & {
  biography: string;
};

// Paper submission type
export type PaperSubmissionType = {
  conferenceTitle: string | null;
  selectedConference?: ConferenceType;
  speakers: SpeakerParticipantType[];
  paperTitle: string;
  paperDescription: string;
  promoCode: string;
  reference: string;
  submittedAt?: Date;
  totalAmount?: number;
};

// Exhibitor representative type
export type ExhibitorType = {
  firstName: string;
  lastName: string;
  jobTitle: string;
  email: string;
  phone: string;
  diet: string;
  dinner: boolean;
  masterclass: string | null;
  accommodationNights: number;
};

// Exhibitor submission type
export type ExhibitorSubmissionType = {
  conferenceTitle: string | null;
  selectedConference?: ConferenceType;
  organizationName: string;
  organizationStreetAddress: string;
  organizationCity: string;
  organizationStateProvince: string;
  organizationPostalCode: string;
  organizationCountry: string;
  productServicesDescription: string;
  exhibitors: ExhibitorType[];
  reference: string;
  submittedAt?: Date;
  totalAmount?: number;
};

// Sponsor representative type
export type SponsorRepresentativeType = {
  firstName: string;
  lastName: string;
  jobTitle: string;
  email: string;
  phone: string;
  diet: string;
  dinner: boolean;
  masterclass: string | null;
  accommodationNights: number;
};

// Sponsorship package tier
export type SponsorPackageTier = 'gold' | 'silver' | 'bronze';

// Sponsor submission type
export type SponsorSubmissionType = {
  conferenceTitle: string | null;
  selectedConference?: ConferenceType;
  organizationName: string;
  organizationStreetAddress: string;
  organizationCity: string;
  organizationStateProvince: string;
  organizationPostalCode: string;
  organizationCountry: string;
  selectedPackage: SponsorPackageTier | null;
  packagePrice: number;
  sponsors: SponsorRepresentativeType[];
  reference: string;
  submittedAt?: Date;
  totalAmount?: number;
};

export type RegistrationType = {
  events: string;
  company: string;
  address?: string; // Made optional
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
  // New delegate-based fields
  delegates: DelegateType[];
};

export type FormValuesType = {
  name: string;
  company: string;
  position: string;
  phone: string;
  email: string;
  address?: string; // Made optional
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
  // New delegate-based fields
  delegates: DelegateType[];
};

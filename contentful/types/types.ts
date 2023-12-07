import {
  TypeConferencesSkeleton,
  TypeEventSkeleton,
  TypeMasterclassSkeleton,
  TypeSpeakerSkeleton,
} from "../types/contentful/types";
import { Entry } from "contentful";
import { Document as RichTextDocument } from "@contentful/rich-text-types";
import { Omit } from "@react-spring/web";

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

// export type ImageType = {
//   src: string;
//   alt: string;
//   width: number;
//   height: number;
// };

// export type Location = {
//   lat: number | undefined;
//   lon: number | undefined;
// };
export type ConferenceType = {
  slug: string;
  title: string;
  venue: string;
  endDate: string;
  startDate: string;
  coverImage: AssetType;
  events: EventCardType[];
  speakers: SpeakerType[];
  registrationLink: string;
  masterclass: MasterclassType[];
  submitPaperLink: string | undefined;
};

// type ConferenceBaseType = {
//   slug: string;
//   title: string;
//   venue: string;
//   endDate: string;
//   startDate: string;
//   registrationLink: string;
//   submitPaperLink: string | undefined;
// };
//
// export type ConferencesHeaderType = ConferenceBaseType & {
//   coverImage: AssetType;
// };
//
// export type ConferencesSectionType = ConferenceBaseType & {
//   events: EventCardType[];
//   speakers: SpeakerType[];
// };

// export type ConferenceInEventType = ConferenceBaseType & {
//   masterclass: MasterclassType[];
// };
export type ConferenceInEventType = Omit<
  ConferencesType,
  "slug" | "tite" | "events" | "coverImage" | "speakers"
>;

type EventType = {
  slug: string;
  title: string;
  tags: string[];
  description: string;
  agenda: AgendaType[];
  coverImage: AssetType;
  content: RichTextDocument;
  conference: ConferenceInEventType | undefined;
};

// type EventBaseType = {
//   slug: string;
//   title: string;
//   description: string;
//   tags: string[];
// };
//
// export type EventCardType = EventBaseType & {
//   description: string;
//   coverImage: AssetType;
// };
//
// export type EventArticleType = EventBaseType & {
//   description: string;
//   coverImage: AssetType;
//   content: RichTextDocument;
//   tags: string[] | undefined;
//   agenda: AgendaType[] | undefined;
//   conference: ConferenceInEventType;
// };

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

export type SpeakerCardType = {
  name: string;
  slug: string;
  jobTitle: string;
  organization: string;
  photo: AssetType;
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

// export type EventType = {
//   slug: string;
//   title: string;
//   description: string;
//   coverImage: AssetType;
//   content: RichTextDocument;
//   tags: string[] | undefined;
//   agenda: AgendaType[] | undefined;
//   conference: ConferenceInEventType;
// };

// export type ConferencesType = {
//   slug: string;
//   title: string;
//   venue: string;
//   endDate: string;
//   startDate: string;
//   events: EventType[];
//   coverImage: ImageType;
//   registrationLink: string;
//   submitPaperLink: string | undefined;
//   speakers: SpeakerType[] | undefined;
//   masterclass: MasterclassType[] | undefined;
//   location: Location | undefined;
// };

// export type ConferenceInEventType = {
//   venue: string;
//   endDate: string;
//   startDate: string;
//   masterclass: MasterclassType[] | undefined;
//   registrationLink: string;
//   submitPaperLink: string | undefined;
// };

// export type ConferenceInEventType = Omit<
//   ConferencesType,
//   "slug" | "tite" | "events" | "coverImage" | "speakers"
// >;

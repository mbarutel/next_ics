import {
  TypeConferencesSkeleton,
  TypeEventSkeleton,
  TypeMasterclassSkeleton,
  TypeSpeakerSkeleton,
} from "@/contentful/types/contentful/types";
import { Entry } from "contentful";
import { eventLinks } from "./data";
import { Document as RichTextDocument } from "@contentful/rich-text-types";

export type SectionName = typeof eventLinks[number]["name"];

export type ImageType = {
  src: string;
  alt: string;
};

// export type AssetType = {
//   src: string;
//   alt: string;
// };
//
export type AssetType = ImageType;

export type Location = {
  lat: number | undefined;
  lon: number | undefined;
};

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

export type ConferencesType = {
  slug: string;
  title: string;
  venue: string;
  endDate: string;
  startDate: string;
  events: EventType[];
  coverImage: ImageType;
  registrationLink: string;
  submitPaperLink: string | undefined;
  speakers: SpeakerType[] | undefined;
  masterclass: MasterclassType[] | undefined;
  // location: Location | undefined;
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
  organization: string;
  photo: ImageType;
  biography: RichTextDocument;
};

export type ConferenceInEventType = {
  venue: string;
  endDate: string;
  startDate: string;
  masterclass: MasterclassType[] | undefined;
  registrationLink: string;
  submitPaperLink: string | undefined;
};

export type AgendaRowType = {
  time: string;
  agenda: string[];
};

export type AgendaType = {
  title: string;
  row: AgendaRowType[];
};

export type EventType = {
  slug: string;
  title: string;
};

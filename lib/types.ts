import {
  TypeConferencesSkeleton,
  TypeEventSkeleton,
  TypeMasterclassSkeleton,
  TypeSpeakerSkeleton,
} from "@/contentful/types/contentful/types";
import { Entry } from "contentful";
import { eventLinks } from "./data";
import { Omit } from "@react-spring/web";
import { Document as RichTextDocument } from "@contentful/rich-text-types";

export type SectionName = typeof eventLinks[number]["name"];

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
  registrationLink: string;
  masterclass: MasterclassType[];
  submitPaperLink: string | undefined;
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

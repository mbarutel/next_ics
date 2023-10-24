import {
  TypeConferencesSkeleton,
  TypeEventSkeleton,
  TypeSpeakerSkeleton,
} from "../types/contentful/types";
import { Entry } from "contentful";
import { Document as RichTextDocument } from "@contentful/rich-text-types";

export type ContentImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type CoverImageType = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type Location = {
  lat: number | undefined;
  lon: number | undefined;
};

// Our simplified version of a ConferencePage.
// We don't need all the data that Contentful gives us.
export type ConferencePage = {
  title: string;
  content: RichTextDocument;
  slug: string;
  tags: string[] | undefined;
  startDate: string;
  endDate: string;
  venueName: string;
  venueAddress: Location;
  // media: string[] | undefined;
  description: string;
  coverImage: ContentImage;
};

export type Conferences = {
  month: string;
  Conferences: ConferencePage[];
};

// -----------------------------------------------------

export type ConferencesEntry = Entry<
  TypeConferencesSkeleton,
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
  speakers: SpeakerType[];
  registrationLink: string;
  coverImage: CoverImageType;
  // location: Location | undefined;
};

export type SpeakerType = {
  name: string;
  slug: string;
  jobTitle: string;
  organization: string;
  photo: CoverImageType;
  biography: RichTextDocument;
};

export type ConferenceInEventType = {
  venue: string;
  endDate: string;
  startDate: string;
  registrationLink: string;
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
  description: string;
  coverImage: ContentImage;
  content: RichTextDocument;
  tags: string[] | undefined;
  agenda: AgendaType[] | undefined;
  conference: ConferenceInEventType;
  // media: string[] | undefined;
};

// export type EventPageType = {
//   title: string;
//   coverImage: ContentImage;
//   description: string;
//   content: RichTextDocument;
//   conference: ConferencesType | null;
//   tags: string[] | undefined;
//   slug: string;
//   media: string[] | undefined;
// };

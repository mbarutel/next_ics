import { Entry } from "contentful";
import { TypeConferencesSkeleton, TypeEventSkeleton } from "../types/contentful/types";
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

export type ConferencesEntry = Entry<TypeConferencesSkeleton, undefined, string>;
export type EventEntry = Entry<TypeEventSkeleton, undefined, string>;

export type ConferencesType = {
  title: string | undefined;
  description: RichTextDocument | undefined;
  registrationLink: string | undefined;
  startDate: string | undefined;
  endDate: string | undefined;
  venue: string | undefined;
  coverImage: CoverImageType | undefined;
  // location: Location | undefined;
};

export type EventType = {
  title: string | undefined;
  description: string | undefined;
  content: RichTextDocument | undefined;
  tags: string[] | undefined;
  slug: string;
  coverImage: ContentImage | undefined;
  // media: string[] | undefined;
};



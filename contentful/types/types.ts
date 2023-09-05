import { Document as RichTextDocument } from "@contentful/rich-text-types";

export type ContentImage = {
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
  startDate: string | undefined;
  endDate: string | undefined;
  venueName: string;
  venueAddress: Location;
  // media: string[] | undefined;
  coverImage: Media;
};

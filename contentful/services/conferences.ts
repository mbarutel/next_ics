import { TypeConferencesSkeleton } from "../types/contentful/types/TypeConferences";
import { Entry } from "contentful";
import contentfulClient from "../client";
import { Document as RichTextDocument } from "@contentful/rich-text-types";
// import { Location } from "../types/types";
import { TypeEventSkeleton } from "../types/contentful/types";
// import { ConferencePage } from "../types/types";
// import { coverImageParse } from "../utils/coverImageParse";

type ConferencesEntry = Entry<TypeConferencesSkeleton, undefined, string>;

export type ConferencesType = {
  title: string | undefined;
  description: RichTextDocument | undefined;
  registrationLink: string | undefined;
  startDate: string | undefined;
  endDate: string | undefined;
  venue: string | undefined;
  // location: Location | undefined;
  // coverImage: AssetLink | undefined;
};

// A function to transform a Contentful blog post
export function parseContentfulConferences(
  conferenceEntry: ConferencesEntry,
): ConferencesType | null {
  if (!conferenceEntry) {
    return null;
  }

  return {
    title: conferenceEntry.fields.title,
    description: conferenceEntry.fields.description,
    registrationLink: conferenceEntry.fields.registrationLink,
    startDate: conferenceEntry.fields.startDate,
    endDate: conferenceEntry.fields.endDate,
    venue: conferenceEntry.fields.venue,
    // location: conferenceEntry.fields.location,
    // coverImage: conferenceEntry.fields.coverImage,
  };
}

// Optionally uses the Contentful content preview.
interface FetchConferencesOptions {
  preview: boolean;
}
export async function fetchConferences(
  { preview }: FetchConferencesOptions,
): Promise<ConferencesType[]> {
  const contenful = contentfulClient({ preview });

  const conferenceResult = await contenful.getEntries<TypeConferencesSkeleton>({
    content_type: "conferences",
    include: 2,
    order: ["fields.startDate"],
  });

  return conferenceResult.items.map((conferenceEntry) =>
    parseContentfulConferences(conferenceEntry) as ConferencesType
  );
}

// -----------------------------------------------------------------------------------------

type EventEntry = Entry<TypeEventSkeleton, undefined, string>;

export type EventType = {
  title: string | undefined;
  description: string | undefined;
  content: RichTextDocument | undefined;
  tags: string[] | undefined;
  slug: string;
  // media: string[] | undefined;
  // coverImage: ContentImage;
};

export function parseContentfulEvent(
  eventEntry: EventEntry,
): EventType {
  return {
    title: eventEntry.fields.title,
    description: eventEntry.fields.description,
    content: eventEntry.fields.content,
    slug: eventEntry.fields.slug,
    tags: eventEntry.fields.tags,
    // media: conferenceEntry.fields.media,
    // coverImage: coverImage,
  };
}

interface FetchConferencesEventsOptions {
  slug: string;
  preview: boolean;
}
export async function fetchConferencesEvents(
  { slug, preview }: FetchConferencesEventsOptions,
): Promise<EventType[]> {
  const contenful = contentfulClient({ preview });

  const conferenceResult = await contenful.getEntries<TypeConferencesSkeleton>({
    content_type: "conferences",
    "fields.slug": slug,
    include: 2,
  }).then((result) => result.items);

  if (!conferenceResult[0] || !conferenceResult[0].fields.events) {
    return [];
  }

  const events = conferenceResult[0].fields.events.filter((event) =>
    event.sys.type === "Entry"
  ).map((event) => event as EventEntry);

  return events.map((eventEntry) => parseContentfulEvent(eventEntry));
}

// A function to fetch a single blog post by its slug.
// Optionally uses the Contentful content preview.
// interface FetchConferencePageOptions {
//   slug: string;
//   preview: boolean;
// }
// export async function fetchConferencePage(
//   { slug, preview }: FetchConferencePageOptions,
// ): Promise<ConferencePage | null> {
//   const contentful = contentfulClient({ preview });
//
//   const conferenceResult = await contentful.getEntries<TypeConferenceSkeleton>({
//     content_type: "conference",
//     "fields.slug": slug,
//     include: 2,
//   });
//
//   return parseContentfulConference(conferenceResult.items[0]);
// }

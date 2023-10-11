import contentfulClient from "../client";
import { coverImageParseX } from "../utils/coverImageParse";
import { CoverImageType } from "../types/types";
import { TypeConferencesSkeleton } from "../types/contentful/types/TypeConferences";
import { Document as RichTextDocument } from "@contentful/rich-text-types";
import { Entry } from "contentful";

// import { Location } from "../types/types";
// import { ConferencePage } from "../types/types";

type ConferencesEntry = Entry<TypeConferencesSkeleton, undefined, string>;

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

// A function to transform a Contentful blog post
export function parseContentfulConferences(
  conferenceEntry: ConferencesEntry,
): ConferencesType | null {
  if (!conferenceEntry) {
    return null;
  }

  const coverImage = coverImageParseX({
    coverImage: conferenceEntry.fields.coverImage,
  });
  console.log(coverImage);

  return {
    title: conferenceEntry.fields.title,
    description: conferenceEntry.fields.description,
    registrationLink: conferenceEntry.fields.registrationLink,
    startDate: conferenceEntry.fields.startDate,
    endDate: conferenceEntry.fields.endDate,
    venue: conferenceEntry.fields.venue,
    coverImage: coverImage,
    // location: conferenceEntry.fields.location,
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

// type EventEntry = Entry<TypeEventSkeleton, undefined, string>;
//
// export type EventType = {
//   title: string | undefined;
//   description: string | undefined;
//   content: RichTextDocument | undefined;
//   tags: string[] | undefined;
//   slug: string;
//   // media: string[] | undefined;
//   // coverImage: ContentImage;
// };
//
// export function parseContentfulEvent(
//   eventEntry: EventEntry,
// ): EventType {
//   return {
//     title: eventEntry.fields.title,
//     description: eventEntry.fields.description,
//     content: eventEntry.fields.content,
//     slug: eventEntry.fields.slug,
//     tags: eventEntry.fields.tags,
//     // media: conferenceEntry.fields.media,
//     // coverImage: coverImage,
//   };
// }
//
// interface FetchConferencesEventsOptions {
//   slug: string;
//   preview: boolean;
// }
// export async function fetchConferencesEvents(
//   { slug, preview }: FetchConferencesEventsOptions,
// ): Promise<EventType[]> {
//   const contenful = contentfulClient({ preview });
//
//   const conferenceResult = await contenful.getEntries<TypeConferencesSkeleton>({
//     content_type: "conferences",
//     "fields.slug": slug,
//     include: 2,
//   }).then((result) => result.items);
//
//   if (!conferenceResult[0] || !conferenceResult[0].fields.events) {
//     return [];
//   }
//
//   const events = conferenceResult[0].fields.events.filter((event) =>
//     event.sys.type === "Entry"
//   ).map((event) => event as EventEntry);
//
//   return events.map((eventEntry) => parseContentfulEvent(eventEntry));
// }

interface FetchConferenceOptions {
  slug: string;
  preview: boolean;
}
export async function fetchConference(
  { slug, preview }: FetchConferenceOptions,
): Promise<ConferencesType | null> {
  const contenful = contentfulClient({ preview });

  const conferenceResult = await contenful.getEntries<TypeConferencesSkeleton>({
    content_type: "conferences",
    "fields.slug": slug,
    include: 2,
  });

  return parseContentfulConferences(conferenceResult.items[0]);
}

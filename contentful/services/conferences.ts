import contentfulClient from "../client";
import { ConferencesType } from "../types/types";
import { TypeConferencesSkeleton } from "../types/contentful/types/TypeConferences";
import { parseContentfulConferences } from "../utils";

export async function fetchConferences(
  { preview }: { preview: boolean },
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

export async function fetchConference(
  { slug, preview }: { slug: string; preview: boolean },
): Promise<ConferencesType | null> {
  const contenful = contentfulClient({ preview });

  const conferenceResult = await contenful.getEntries<TypeConferencesSkeleton>({
    content_type: "conferences",
    "fields.slug": slug,
    include: 2,
  });

  return parseContentfulConferences(conferenceResult.items[0]);
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

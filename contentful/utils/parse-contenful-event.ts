import { parseContentfulConferences } from ".";
import coverImageParse from "./cover-image-parse";
import {
  ConferenceInEventType,
  ConferencesEntry,
  EventEntry,
  EventType,
} from "../types/types";

// export default function parseContentfulEvent(
//   eventEntry: EventEntry,
// ): EventType | null {
//   if (!eventEntry) {
//     return null;
//   }
//
//   const coverImage = coverImageParse({
//     coverImage: eventEntry.fields.coverImage,
//   });
//
//   return {
//     title: eventEntry.fields.title,
//     description: eventEntry.fields.description,
//     content: eventEntry.fields.content,
//     slug: eventEntry.fields.slug,
//     tags: eventEntry.fields.tags,
//     coverImage: coverImage,
//     // media: conferenceEntry.fields.media,
//   };
// }
function parseConferenceInEvent(
  conference: ConferencesEntry,
): ConferenceInEventType {
  return {
    venue: conference.fields.venue,
    endDate: conference.fields.endDate,
    startDate: conference.fields.startDate,
    registrationLink: conference.fields.registrationLink,
  };
}

export default function parseContentfulEvent(
  eventEntry: EventEntry,
): EventType {
  const coverImage = coverImageParse({
    coverImage: eventEntry.fields.coverImage,
  });

  const conference = parseConferenceInEvent(
    eventEntry.fields.conference as ConferencesEntry,
  );

  return {
    title: eventEntry.fields.title,
    description: eventEntry.fields.description,
    content: eventEntry.fields.content,
    slug: eventEntry.fields.slug,
    tags: eventEntry.fields.tags,
    coverImage: coverImage,
    conference: conference,
    // media: conferenceEntry.fields.media,
  };
}


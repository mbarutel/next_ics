import { parseContentfulEvent, parseContentfulSpeaker } from ".";
import { EventEntry, SpeakerEntry } from "../types/types";
import coverImageParse from "./cover-image-parse";
import { ConferencesEntry, ConferencesType } from "../types/types";

// export default function parseContentfulConferences(
//   conferenceEntry: ConferencesEntry,
// ): ConferencesType | null {
//   if (!conferenceEntry) {
//     return null;
//   }
//
//   // coverImageParse can throw and error. It needs to be handled.
//   const coverImage = coverImageParse({
//     coverImage: conferenceEntry.fields.coverImage,
//   });
//
//   let events: (EventType | null)[];
//
//   if (!conferenceEntry.fields.events) {
//     events = [];
//   } else {
//     events = conferenceEntry.fields.events.filter((event) =>
//       event.sys.type === "Entry"
//     ).map((event) => parseContentfulEvent(event as EventEntry));
//   }
//
//   return {
//     title: conferenceEntry.fields.title,
//     slug: conferenceEntry.fields.slug,
//     description: conferenceEntry.fields.description,
//     registrationLink: conferenceEntry.fields.registrationLink,
//     startDate: conferenceEntry.fields.startDate,
//     endDate: conferenceEntry.fields.endDate,
//     venue: conferenceEntry.fields.venue,
//     coverImage: coverImage,
//     events: events,
//     // location: conferenceEntry.fields.location,
//   };
// }

export default function parseContentfulConferences(
  conferenceEntry: ConferencesEntry,
): ConferencesType {
  
  const coverImage = coverImageParse({
    coverImage: conferenceEntry.fields.coverImage,
  });

  const events = conferenceEntry.fields.events.filter((event) =>
    event.sys.type === "Entry"
  ).map((event) => parseContentfulEvent(event as EventEntry));

  const speakers = conferenceEntry.fields.speakers.filter((speaker) =>
    speaker.sys.type === "Entry"
  ).map((speaker) => parseContentfulSpeaker(speaker as SpeakerEntry));

  return {
    title: conferenceEntry.fields.title,
    slug: conferenceEntry.fields.slug,
    registrationLink: conferenceEntry.fields.registrationLink,
    startDate: conferenceEntry.fields.startDate,
    endDate: conferenceEntry.fields.endDate,
    venue: conferenceEntry.fields.venue,
    coverImage: coverImage,
    events: events,
    speakers: speakers,
    // location: conferenceEntry.fields.location,
  };
}

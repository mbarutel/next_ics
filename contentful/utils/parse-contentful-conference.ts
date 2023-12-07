// import { parseContentfulEvent, parseContentfulSpeaker } from ".";
// import { EventEntry, MasterclassEntry, SpeakerEntry } from "../types/types";
// import coverImageParse from "./cover-image-parse";
// import { ConferencesEntry, ConferencesType } from "../types/types";
// import parseContentfulMasterClass from "./parse-contenful-masterclass";
//
// export default function parseContentfulConferences(
//   conferenceEntry: ConferencesEntry,
// ): ConferencesType {
//   const coverImage = coverImageParse({
//     coverImage: conferenceEntry.fields.coverImage,
//   });
//
//   const fields = conferenceEntry.fields;
//
//   const events = fields.events.filter((event) => event.sys.type === "Entry")
//     .map((event) => parseContentfulEvent(event as EventEntry));
//
//   let speakers;
//   let masterclasses;
//
//   if (fields.speakers !== undefined) {
//     speakers = fields.speakers.filter((speaker) => speaker.sys.type === "Entry")
//       .map((speaker) => parseContentfulSpeaker(speaker as SpeakerEntry));
//   } else {
//     speakers = undefined;
//   }
//
//   if (fields.masterclass !== undefined) {
//     masterclasses = fields.masterclass.filter((masterclass) =>
//       masterclass.sys.type === "Entry"
//     ).map((masterclass) =>
//       parseContentfulMasterClass(masterclass as MasterclassEntry)
//     );
//   } else {
//     masterclasses = undefined;
//   }
//
//   return {
//     title: fields.title,
//     slug: fields.slug,
//     registrationLink: fields.registrationLink,
//     submitPaperLink: fields.submitAPaperLink,
//     startDate: fields.startDate,
//     endDate: fields.endDate,
//     venue: fields.venue,
//     coverImage: coverImage,
//     events: events,
//     speakers: speakers,
//     masterclass: masterclasses,
//     // location: conferenceEntry.fields.location,
//   };
// }

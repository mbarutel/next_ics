import { parseContentfulEvent, parseContentfulSpeaker } from ".";
import { EventEntry, MasterclassEntry, SpeakerEntry } from "../types/types";
import coverImageParse from "./cover-image-parse";
import { ConferencesEntry, ConferencesType } from "../types/types";
import parseContentfulMasterClass from "./parse-contenful-masterclass";

export default function parseContentfulConferences(
  conferenceEntry: ConferencesEntry,
): ConferencesType {
  
  const coverImage = coverImageParse({
    coverImage: conferenceEntry.fields.coverImage,
  });

  const events = conferenceEntry.fields.events.filter((event) =>
    event.sys.type === "Entry"
  ).map((event) => parseContentfulEvent(event as EventEntry));

  let speakers;
  let masterclasses;

  if (conferenceEntry.fields.speakers !== undefined) {
    speakers = conferenceEntry.fields.speakers.filter((speaker) =>
      speaker.sys.type === "Entry"
    ).map((speaker) => parseContentfulSpeaker(speaker as SpeakerEntry));
  } else {
    speakers = undefined;
  }

  if (conferenceEntry.fields.masterclass !== undefined) {
    masterclasses = conferenceEntry.fields.masterclass.filter((masterclass) =>
      masterclass.sys.type === "Entry"
    ).map((masterclass) =>
      parseContentfulMasterClass(masterclass as MasterclassEntry)
    );
  } else {
    masterclasses = undefined;
  }

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
    masterclass: masterclasses
    // location: conferenceEntry.fields.location,
  };
}

import {
  ConferencesEntry,
  ConferenceType,
  EventCardType,
  EventEntry,
  MasterclassEntry,
  MasterclassType,
  SpeakerCardType,
  SpeakerEntry,
} from "@/lib/types";
import {
  TypeEventSkeleton,
  TypeMasterclassSkeleton,
  TypeSpeakerSkeleton,
} from "../types/contentful/types";
import { Entry, UnresolvedLink } from "contentful";
import parserEventCard from "./parser-event-card";
import parserSpeakerCard from "./parser-speaker-card";

export default function parserConferenceEntry(
  conferenceEntry: ConferencesEntry,
): ConferenceType {
  return {
    slug: conferenceEntry.fields.slug,
    title: conferenceEntry.fields.title,
    venue: conferenceEntry.fields.venue,
    startDate: conferenceEntry.fields.startDate,
    endDate: conferenceEntry.fields.endDate,
    registrationLink: conferenceEntry.fields.registrationLink,
    submitPaperLink: conferenceEntry.fields.submitAPaperLink,
    events: parseEventsInConference(conferenceEntry.fields.events),
    speakers: parseSpeakersInConference(conferenceEntry.fields.speakers),
    masterclass: parseMasterclassesInConference(
      conferenceEntry.fields.masterclass,
    ),
  };
}

function parseEventsInConference(
  events:
    (UnresolvedLink<"Entry"> | Entry<TypeEventSkeleton, undefined, string>)[],
): EventCardType[] {
  if (events) {
    return events.filter((event) => event.sys.type === "Entry")
      .map((event) => parserEventCard(event as EventEntry));
  } else {
    return [];
  }
}

function parseSpeakersInConference(
  speakers:
    | (
      | UnresolvedLink<"Entry">
      | Entry<TypeSpeakerSkeleton, undefined, string>
    )[]
    | undefined,
): SpeakerCardType[] {
  if (speakers) {
    return speakers.filter((speaker) => speaker.sys.type === "Entry")
      .map((speaker) => parserSpeakerCard(speaker as SpeakerEntry));
  } else {
    return [];
  }
}

// function parseMasterclassesInConference(
//   masterclasses:
//     | (
//       | UnresolvedLink<"Entry">
//       | Entry<TypeMasterclassSkeleton, undefined, string>
//     )[]
//     | undefined,
// ): MasterclassType[] {
//   if (masterclasses) {
//     return masterclasses.filter((masterclass) =>
//       masterclass.sys.type === "Entry"
//     )
//       .map((masterclass) => parserSpeakerCard(masterclass as MasterclassEntry));
//   } else {
//     return [];
//   }
// }

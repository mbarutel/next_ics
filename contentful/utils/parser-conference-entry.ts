import { TypeEventSkeleton } from "../types/contentful/types";
import {
  ConferencesEntry,
  ConferenceType,
  EventEntry,
  EventType,
} from "@/lib/types";
import { Entry, UnresolvedLink } from "contentful";
import parserAsset from "./parser-asset";
import parserEventEntry from "./parser-event-entry";
import parserSpeakerInConference from "./parser-speaker-in-conference";
import parserMasterclassesInConference from "./parser-masterclasses-in-conference";
import parserConferenceDate from "./parser-conference-date";

export default function parserConferenceEntry(
  conferenceEntry: ConferencesEntry,
): ConferenceType {
  return {
    slug: conferenceEntry.fields.slug,
    title: conferenceEntry.fields.title,
    venue: conferenceEntry.fields.venue,
    date: parserConferenceDate({
      startDate: conferenceEntry.fields.startDate,
      endDate: conferenceEntry.fields.endDate,
    }),
    registrationLink: conferenceEntry.fields.registrationLink,
    submitPaperLink: conferenceEntry.fields.submitAPaperLink,
    events: parseEventsInConference(conferenceEntry.fields.events),
    coverImage: parserAsset({ asset: conferenceEntry.fields.coverImage }),
    speakers: parserSpeakerInConference(conferenceEntry.fields.speakers),
    masterclass: parserMasterclassesInConference(
      conferenceEntry.fields.masterclass,
    ),
  };
}

function parseEventsInConference(
  events:
    (UnresolvedLink<"Entry"> | Entry<TypeEventSkeleton, undefined, string>)[],
): EventType[] {
  if (events) {
    return events.filter((event) => event.sys.type === "Entry")
      .map((event) => parserEventEntry(event as EventEntry));
  } else {
    return [];
  }
}

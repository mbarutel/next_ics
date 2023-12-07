import {
  ConferencesEntry,
  ConferencesSectionType,
  EventCardType,
  EventEntry,
  SpeakerCardType,
  SpeakerEntry,
} from "../types/types";
import {
  TypeEventSkeleton,
  TypeSpeakerSkeleton,
} from "../types/contentful/types";
import { Entry, UnresolvedLink } from "contentful";
import parserEventCard from "./parser-event-card";
import parserSpeakerCard from "./parser-speaker-card";

export default function parserConferenceSection(
  conferenceEntry: ConferencesEntry,
): ConferencesSectionType {
  return {
    slug: conferenceEntry.fields.slug,
    title: conferenceEntry.fields.title,
    venue: conferenceEntry.fields.venue,
    startDate: conferenceEntry.fields.startDate,
    endDate: conferenceEntry.fields.endDate,
    registrationLink: conferenceEntry.fields.registrationLink,
    submitPaperLink: conferenceEntry.fields.submitAPaperLink,
    events: parseEventCards(conferenceEntry.fields.events),
    speakers: parseSpeakerCards(conferenceEntry.fields.speakers),
  };
}

function parseEventCards(
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

function parseSpeakerCards(
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

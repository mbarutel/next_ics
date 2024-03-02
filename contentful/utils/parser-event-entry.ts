import {
  EventType,
  EventEntry,
  ConferenceInEventType,
} from "@/lib/types";
import parserAsset from "./parser-asset";
import { Entry, UnresolvedLink } from "contentful";
import parserConferenceDate from "./parser-conference-date";
import { TypeConferencesSkeleton } from "../types/contentful/types";
import parserMasterclassesInConference from "./parser-masterclasses-in-conference";
import { parseAgenda } from "./parser-agenda";

export default function parserEventEntry(
  eventEntry: EventEntry,
): EventType {
  return {
    slug: eventEntry.fields.slug,
    title: eventEntry.fields.title,
    description: eventEntry.fields.description,
    poster: parserAsset({ asset: eventEntry.fields.coverImage }),
    content: eventEntry.fields.content,
    conference: parseConferenceInEvent(eventEntry.fields.conference),
  };
}

function parseConferenceInEvent(
  conference:
    | UnresolvedLink<"Entry">
    | Entry<TypeConferencesSkeleton, undefined, string>,
): ConferenceInEventType | undefined {
  if ("fields" in conference) {
    return {
      title: conference.fields.title,
      venue: conference.fields.venue,
      agenda: parseAgenda(conference.fields.agenda),
      date: parserConferenceDate({
        startDate: conference.fields.startDate,
        endDate: conference.fields.endDate,
      }),
      submitPaperLink: conference.fields.submitAPaperLink,
      formLink: conference.fields.externalForm === undefined
        ? `/registration/${conference.fields.slug}`
        : conference.fields.externalForm,
      masterclass: parserMasterclassesInConference(
        conference.fields.masterclass,
      ),
    };
  }
  return undefined;
}

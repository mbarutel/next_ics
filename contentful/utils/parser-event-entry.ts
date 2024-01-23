import {
  AgendaType,
  ConferenceInEventType,
  EventEntry,
  EventType,
} from "@/lib/types";
import parserAsset from "./parser-asset";
import { Entry, UnresolvedLink } from "contentful";
import parserConferenceDate from "./parser-conference-date";
import { TypeConferencesSkeleton } from "../types/contentful/types";
import parserMasterclassesInConference from "./parser-masterclasses-in-conference";

export default function parserEventEntry(
  eventEntry: EventEntry,
): EventType {
  return {
    slug: eventEntry.fields.slug,
    title: eventEntry.fields.title,
    description: eventEntry.fields.description,
    tags: eventEntry.fields.tags ? eventEntry.fields.tags : [],
    poster: parserAsset({ asset: eventEntry.fields.coverImage }),
    content: eventEntry.fields.content,
    agenda: parseAgenda(eventEntry.fields.agenda),
    conference: parseConferenceInEvent(eventEntry.fields.conference),
  };
}

function parseAgenda(
  agenda: unknown,
): AgendaType[] {
  if (agenda && Array.isArray(agenda)) {
    for (let i = 0; i < agenda.length; i++) {
      if (!("title" in agenda[i]) || !("row" in agenda[i])) {
        return [];
      }
    }
    return agenda;
  } else {
    return [];
  }
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
      date: parserConferenceDate({
        startDate: conference.fields.startDate,
        endDate: conference.fields.endDate,
      }),
      registrationLink: conference.fields.registrationLink,
      submitPaperLink: conference.fields.submitAPaperLink,
      masterclass: parserMasterclassesInConference(
        conference.fields.masterclass,
      ),
    };
  }
  return undefined;
}

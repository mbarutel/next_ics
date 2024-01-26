import {
  ConferencesEntry,
  ConferenceType,
  EventEntry,
  EventType,
  PriceType,
} from "@/lib/types";
import parserAsset from "./parser-asset";
import { Entry, UnresolvedLink } from "contentful";
import parserEventEntry from "./parser-event-entry";
import parserConferenceDate from "./parser-conference-date";
import { TypeEventSkeleton } from "../types/contentful/types";
import parserSpeakerInConference from "./parser-speaker-in-conference";
import parserMasterclassesInConference from "./parser-masterclasses-in-conference";

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
    formLink: conferenceEntry.fields.externalForm === undefined
      ? `/registration/${conferenceEntry.fields.slug}`
      : conferenceEntry.fields.externalForm,
    prices: parseConferencePrices(conferenceEntry.fields.prices),
  };
}

function parseConferencePrices(object: unknown): PriceType | undefined {
  const parsedPrice = object as PriceType;

  if (
    !parsedPrice ||
    !("walkIn" in parsedPrice) ||
    !("base" in parsedPrice) ||
    !("dinner" in parsedPrice) ||
    !("masterclass" in parsedPrice)
  ) {
    console.log("Conference Price Parsing Error: Lacking Property");
    return undefined;
  }

  if (
    typeof parsedPrice.walkIn !== "number" ||
    typeof parsedPrice.dinner !== "number" ||
    typeof parsedPrice.masterclass !== "number" ||
    !Array.isArray(parsedPrice.base)
  ) {
    console.log("Conference Price Parsing Error: Wrong Type");
    return undefined;
  }

  for (let i = 0; i < parsedPrice.base.length; i++) {
    if (
      !parsedPrice.base[i] || !("price" in parsedPrice.base[i]) ||
      !("dueDate" in parsedPrice.base[i])
    ) {
      console.log(
        "Conference Price Parsing Error: Incorrect Base Price Property",
      );
      return undefined;
    }
    if (
      typeof parsedPrice.base[i].price !== "number" ||
      typeof parsedPrice.base[i].dueDate !== "string"
    ) {
      console.log("Conference Price Parsing Error: Incorrect Base Price Type");
      return undefined;
    }
  }
  return parsedPrice;
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

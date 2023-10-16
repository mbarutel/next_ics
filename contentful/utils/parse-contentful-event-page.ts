import { parseContentfulConferences } from ".";
import {
  ConferencesEntry,
  ConferencesType,
  EventEntry,
  EventPageType,
} from "../types/types";
import coverImageParse from "./cover-image-parse";

export default function parseContentfulEventPage(
  eventEntry: EventEntry,
): EventPageType | null {
  if (!eventEntry) {
    return null;
  }

  const coverImage = coverImageParse({
    coverImage: eventEntry.fields.coverImage,
  });

  let conference: ConferencesType | null;

  if (!eventEntry.fields.conference) {
    conference = null;
  } else {
    conference = parseContentfulConferences(
      eventEntry.fields.conference as ConferencesEntry,
    );
  }

  return {
    title: eventEntry.fields.title,
    content: eventEntry.fields.content,
    coverImage: coverImage,
    conference: conference,
    // media: conferenceEntry.fields.media,
  };
}

import { parseContentfulEvent } from ".";
import { EventEntry, EventType } from "../types/types";
import { ConferencesEntry, ConferencesType } from "../types/types";
import coverImageParse from "./cover-image-parse";

export default function parseContentfulConferences(
  conferenceEntry: ConferencesEntry,
): ConferencesType | null {
  if (!conferenceEntry) {
    return null;
  }

  // coverImageParse can throw and error. It needs to be handled.
  const coverImage = coverImageParse({
    coverImage: conferenceEntry.fields.coverImage,
  });

  let events: (EventType | null)[];

  if (!conferenceEntry.fields.events) {
    events = [];
  } else {
    events = conferenceEntry.fields.events.filter((event) =>
      event.sys.type === "Entry"
    ).map((event) => parseContentfulEvent(event as EventEntry));
  }

  return {
    title: conferenceEntry.fields.title,
    slug: conferenceEntry.fields.slug,
    description: conferenceEntry.fields.description,
    registrationLink: conferenceEntry.fields.registrationLink,
    startDate: conferenceEntry.fields.startDate,
    endDate: conferenceEntry.fields.endDate,
    venue: conferenceEntry.fields.venue,
    coverImage: coverImage,
    events: events,
    // location: conferenceEntry.fields.location,
  };
}

import { ConferencesEntry, ConferencesHeaderType } from "../types/types";
import imageParse from "./image-parse";

export default function parseContentfulHeader(
  conferenceEntry: ConferencesEntry,
): ConferencesHeaderType {
  return {
    slug: conferenceEntry.fields.slug,
    title: conferenceEntry.fields.title,
    venue: conferenceEntry.fields.venue,
    startDate: conferenceEntry.fields.startDate,
    endDate: conferenceEntry.fields.endDate,
    registrationLink: conferenceEntry.fields.registrationLink,
    submitPaperLink: conferenceEntry.fields.submitAPaperLink,
    coverImage: imageParse({ asset: conferenceEntry.fields.coverImage }),
  };
}

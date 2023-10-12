import { ConferencesEntry, ConferencesType } from "../types/types";
import coverImageParse from "./cover-image-parse";

export default function parseContentfulConferences(
  conferenceEntry: ConferencesEntry,
): ConferencesType | null {
  if (!conferenceEntry) {
    return null;
  }

  const coverImage = coverImageParse({
    coverImage: conferenceEntry.fields.coverImage,
  });

  return {
    title: conferenceEntry.fields.title,
    slug: conferenceEntry.fields.slug,
    description: conferenceEntry.fields.description,
    registrationLink: conferenceEntry.fields.registrationLink,
    startDate: conferenceEntry.fields.startDate,
    endDate: conferenceEntry.fields.endDate,
    venue: conferenceEntry.fields.venue,
    coverImage: coverImage,
    // location: conferenceEntry.fields.location,
  };
}

import coverImageParse from "./cover-image-parse";
import { SpeakerEntry, SpeakerType } from "../types/types";

export default function parseContentfulSpeaker(
  speakerEntry: SpeakerEntry,
): SpeakerType {
  const photo = coverImageParse({
    coverImage: speakerEntry.fields.photo,
  });

  return {
    photo: photo,
    name: speakerEntry.fields.name,
    jobTitle: speakerEntry.fields.jobTitle,
    biography: speakerEntry.fields.biography,
    organization: speakerEntry.fields.organization,
  };
}

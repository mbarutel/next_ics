import { SpeakerCardType, SpeakerEntry } from "../types/types";
import imageParse from "./image-parse";

export default function parserSpeakerCard(
  speakerEntry: SpeakerEntry,
): SpeakerCardType {
  return {
    name: speakerEntry.fields.name,
    slug: speakerEntry.fields.slug,
    jobTitle: speakerEntry.fields.jobTitle,
    organization: speakerEntry.fields.organization,
    photo: imageParse({ asset: speakerEntry.fields.photo }),
    biography: speakerEntry.fields.biography,
  };
}

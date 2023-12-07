import { SpeakerEntry, SpeakerType } from "@/lib/types";
import parseAsset from "./parser-asset";

export default function parserSpeakerEntry(
  speakerEntry: SpeakerEntry,
): SpeakerType {
  return {
    photo: parseAsset({
      asset: speakerEntry.fields.photo,
    }),
    slug: speakerEntry.fields.slug,
    name: speakerEntry.fields.name,
    jobTitle: speakerEntry.fields.jobTitle,
    biography: speakerEntry.fields.biography,
    organization: speakerEntry.fields.organization,
  };
}

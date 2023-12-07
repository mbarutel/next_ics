import { SpeakerEntry, SpeakerType } from "@/lib/types";
import parseAssetEntry from "./parser-asset-entry";

export default function parserSpeakerEntry(
  speakerEntry: SpeakerEntry,
): SpeakerType {
  return {
    photo: parseAssetEntry({
      coverImage: speakerEntry.fields.photo,
    }),
    slug: speakerEntry.fields.slug,
    name: speakerEntry.fields.name,
    jobTitle: speakerEntry.fields.jobTitle,
    biography: speakerEntry.fields.biography,
    organization: speakerEntry.fields.organization,
  };
}

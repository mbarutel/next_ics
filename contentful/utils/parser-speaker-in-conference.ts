import { Entry, UnresolvedLink } from "contentful";
import { SpeakerEntry, SpeakerType } from "@/lib/types";
import parserSpeakerEntry from "./parser-speaker-entry";
import { TypeSpeakerSkeleton } from "../types/contentful/types";

export default function parserSpeakerInConference(
  speakers:
    | (
      | UnresolvedLink<"Entry">
      | Entry<TypeSpeakerSkeleton, undefined, string>
    )[]
    | undefined,
): SpeakerType[] {
  if (speakers) {
    return speakers.filter((speaker) => speaker.sys.type === "Entry")
      .map((speaker) => parserSpeakerEntry(speaker as SpeakerEntry));
  } else {
    return [];
  }
}

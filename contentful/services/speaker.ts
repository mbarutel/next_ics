import { SpeakerType } from "../types/types";
import { contentfulClient } from "../client";
import { parseContentfulSpeaker } from "../utils";
import { TypeSpeakerSkeleton } from "../types/contentful/types";

// Fetch all of the EVENTS
export async function fetchSpeakers(
  { preview }: { preview: boolean },
): Promise<SpeakerType[]> {
  const contenful = contentfulClient({ preview });

  const speakerResult = await contenful.getEntries<TypeSpeakerSkeleton>({
    content_type: "speaker",
    include: 2,
  });

  return speakerResult.items.map((speakerEntry) =>
    parseContentfulSpeaker(speakerEntry) as SpeakerType
  );
}

// Fetch EVENT based on the slug
export async function fetchSpeaker(
  { slug, preview }: { slug: string; preview: boolean },
): Promise<SpeakerType | null> {
  const contenful = contentfulClient({ preview });

  const speakerEvent = await contenful.getEntries<TypeSpeakerSkeleton>({
    content_type: "speaker",
    "fields.slug": slug,
    include: 2,
  });

  if (speakerEvent.items.length === 0) {
    return null;
  }
  return parseContentfulSpeaker(speakerEvent.items[0]);
}

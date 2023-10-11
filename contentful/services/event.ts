import { contentfulClient } from "../client";
import { EventType } from "../types/types";
import { TypeEventSkeleton } from "../types/contentful/types";
import { parseContentfulEvent } from "../utils";

interface FetchEventOptions {
  slug: string;
  preview: boolean;
}
export async function fetchEvent(
  { slug, preview }: FetchEventOptions,
): Promise<EventType | null> {
  const contenful = contentfulClient({ preview });

  const eventResult = await contenful.getEntries<TypeEventSkeleton>({
    content_type: "event",
    "fields.slug": slug,
    include: 2,
  });

  return parseContentfulEvent(eventResult.items[0]);
}

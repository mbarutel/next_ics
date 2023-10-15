import { contentfulClient } from "../client";
import { EventType } from "../types/types";
import { TypeEventSkeleton } from "../types/contentful/types";
import { parseContentfulEvent } from "../utils";

export async function fetchEvents(
  { preview }: { preview: boolean },
): Promise<EventType[]> {
  const contenful = contentfulClient({ preview });

  const eventResult = await contenful.getEntries<TypeEventSkeleton>({
    content_type: "event",
    include: 2,
  });

  return eventResult.items.map((eventEntry) =>
    parseContentfulEvent(eventEntry) as EventType
  );
}

export async function fetchEvent(
  { slug, preview }: { slug: string; preview: boolean },
): Promise<EventType | null> {
  const contenful = contentfulClient({ preview });

  const eventResult = await contenful.getEntries<TypeEventSkeleton>({
    content_type: "event",
    "fields.slug": slug,
    include: 2,
  });

  return parseContentfulEvent(eventResult.items[0]);
}

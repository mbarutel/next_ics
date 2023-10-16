import { contentfulClient } from "../client";
import { EventPageType, EventType } from "../types/types";
import { TypeEventSkeleton } from "../types/contentful/types";
import { parseContentfulEvent, parseContentfulEventPage } from "../utils";

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
): Promise<EventPageType | null> {
  const contenful = contentfulClient({ preview });

  const eventResult = await contenful.getEntries<TypeEventSkeleton>({
    content_type: "event",
    "fields.slug": slug,
    include: 2,
  });

  return parseContentfulEventPage(eventResult.items[0]);
}

import { contentfulClient } from "../client";
import { EventPageType, EventType } from "../types/types";
import { TypeEventSkeleton } from "../types/contentful/types";
import { parseContentfulEvent, parseContentfulEventPage } from "../utils";

// Fetch all of the EVENTS
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

// Fetch EVENT based on the slug
export async function fetchEvent(
  { slug, preview }: { slug: string; preview: boolean },
): Promise<EventType | null> {
  const contenful = contentfulClient({ preview });

  const eventResult = await contenful.getEntries<TypeEventSkeleton>({
    content_type: "event",
    "fields.slug": slug,
    include: 2,
  });

  if (eventResult.items.length === 0) {
    return null;
  }
  return parseContentfulEvent(eventResult.items[0]);
}

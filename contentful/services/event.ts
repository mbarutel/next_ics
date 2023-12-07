import { EventType } from "@/lib/types";
import contentfulClient from "../client/client";
import { ContentfulClientApi } from "contentful";
import { TypeEventSkeleton } from "../types/contentful/types";

// This class includes the methods to request
export class Event {
  private client: ContentfulClientApi<undefined>;
  private parser: Function;

  constructor({ preview, parser }: { preview: boolean; parser: Function }) {
    this.client = contentfulClient({ preview });
    this.parser = parser;
  }

  public async getEvent(slug: string): Promise<EventType | null> {
    const eventResult = await this.client.getEntries<
      TypeEventSkeleton
    >({
      content_type: "event",
      "fields.slug": slug,
      include: 2,
    });

    if (eventResult.items.length === 0) {
      return null;
    }
    return this.parser(eventResult.items[0]);
  }

  public async getEvents(): Promise<EventType[]> {
    const eventResult = await this.client.getEntries<
      TypeEventSkeleton
    >({
      content_type: "event",
      include: 2,
    });

    return eventResult.items.map((eventEntry) => this.parser(eventEntry));
  }
}

import { ConferenceType } from "@/lib/types";
import contentfulClient from "../client/client";
import { ContentfulClientApi } from "contentful";
import { TypeConferencesSkeleton } from "../types/contentful/types/TypeConferences";

// This class includes the methods to request
export class Conference {
  private client: ContentfulClientApi<undefined>;
  private parser: Function;

  constructor({ preview, parser }: { preview: boolean; parser: Function }) {
    this.client = contentfulClient({ preview });
    this.parser = parser;
  }

  public async getConference(slug: string): Promise<ConferenceType | null> {
    const conferenceResult = await this.client.getEntries<
      TypeConferencesSkeleton
    >({
      content_type: "conferences",
      "fields.slug": slug,
      include: 2,
    });

    if (conferenceResult.items.length === 0) {
      return null;
    }
    return this.parser(conferenceResult.items[0]);
  }

  public async getConferences(): Promise<ConferenceType[]> {
    const conferenceResult = await this.client.getEntries<
      TypeConferencesSkeleton
    >({
      content_type: "conferences",
      include: 2,
      order: ["fields.startDate"],
    });

    return conferenceResult.items.map((conferenceEntry) =>
      this.parser(conferenceEntry)
    );
  }
}

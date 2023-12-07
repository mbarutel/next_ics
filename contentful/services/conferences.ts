import { contentfulClient } from "../client";
import { ConferencesType } from "../types/types";
import { parseContentfulConferences } from "../utils";
import { TypeConferencesSkeleton } from "../types/contentful/types/TypeConferences";
import { ContentfulClientApi } from "contentful";

// Fetch all of the CONFERENCES
export async function fetchConferences(
  { preview }: { preview: boolean },
): Promise<ConferencesType[]> {
  const contenful = contentfulClient({ preview });

  const conferenceResult = await contenful.getEntries<TypeConferencesSkeleton>({
    content_type: "conferences",
    include: 2,
    order: ["fields.startDate"],
  });

  return conferenceResult.items.map((conferenceEntry) =>
    parseContentfulConferences(conferenceEntry) as ConferencesType
  );
}

// Fetch CONFERENCE based on the slug
export async function fetchConference(
  { slug, preview }: { slug: string; preview: boolean },
): Promise<ConferencesType | null> {
  const contenful = contentfulClient({ preview });

  const conferenceResult = await contenful.getEntries<TypeConferencesSkeleton>({
    content_type: "conferences",
    "fields.slug": slug,
    include: 2,
  });

  if (conferenceResult.items.length === 0) {
    return null;
  }
  return parseContentfulConferences(conferenceResult.items[0]);
}

// This class includes the methods to request
export class Conference {
  private client: ContentfulClientApi<undefined>;
  private parser: Function;

  constructor({ preview, parser }: { preview: boolean; parser: Function }) {
    this.client = contentfulClient({ preview });
    this.parser = parser;
  }

  public async getConference(slug: string): Promise<ConferencesType | null> {
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

  public async getConferences(): Promise<ConferencesType[]> {
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

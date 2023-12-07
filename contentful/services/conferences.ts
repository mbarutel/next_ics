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

class Conference {
  private client: ContentfulClientApi<undefined>;

  constructor({ preview }: { preview: boolean }) {
    this.client = contentfulClient({ preview });
  }

  public getConference(): string {
    return this._name;
  }

  public setName(name: string): void {
    this._name = name;
  }

  public getAge(): number {
    return this._age;
  }

  public setAge(age: number): void {
    this._age = age;
  }
}

import { Document as RichTextDocument } from "@contentful/rich-text-types";
import contentfulClient from "../client";
import { Entry } from "contentful";
import { TypeEventSkeleton } from "../types/contentful/types";
import { coverImageParseX } from "../utils/coverImageParse";
import { ContentImage } from "../types/types";

type EventEntry = Entry<TypeEventSkeleton, undefined, string>;

export type EventType = {
  title: string | undefined;
  description: string | undefined;
  content: RichTextDocument | undefined;
  tags: string[] | undefined;
  slug: string;
  coverImage: ContentImage | undefined;
  // media: string[] | undefined;
};

export function parseContentfulEvent(
  eventEntry: EventEntry,
): EventType | null {
  if (!eventEntry) {
    return null;
  }

  const coverImage = coverImageParseX({
    coverImage: eventEntry.fields.coverImage,
  });
  console.log(coverImage);

  return {
    title: eventEntry.fields.title,
    description: eventEntry.fields.description,
    content: eventEntry.fields.content,
    slug: eventEntry.fields.slug,
    tags: eventEntry.fields.tags,
    coverImage: coverImage,
    // media: conferenceEntry.fields.media,
  };
}

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

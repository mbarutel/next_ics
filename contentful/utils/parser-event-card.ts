import { EventCardType, EventEntry } from "../types/types";
import imageParse from "./image-parse";

export default function parserEventCard(
  eventEntry: EventEntry,
): EventCardType {
  return {
    slug: eventEntry.fields.slug,
    title: eventEntry.fields.title,
    description: eventEntry.fields.description,
    tags: eventEntry.fields.tags ? eventEntry.fields.tags : [],
    coverImage: imageParse({ asset: eventEntry.fields.coverImage }),
  };
}

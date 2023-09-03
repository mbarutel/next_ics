import { TypeConferenceSkeleton } from "../types/contentful/types";
import { Entry } from "contentful";
import contentfulClient from "../client";
import { ConferencePage } from "../types/types";
import { coverImageParse } from "../utils/coverImageParse";

// TODO: Create media parse function

type ConferenceEntry = Entry<TypeConferenceSkeleton, undefined, string>;

// A function to transform a Contentful blog post
// into our own BlogPost object.
export function parseContentfulConference(
  conferenceEntry: ConferenceEntry,
): ConferencePage | null {
  if (!conferenceEntry) {
    return null;
  }

  const coverImage = coverImageParse(conferenceEntry.fields.coverImage);
  // console.log("coverImage");
  // console.log(coverImage);

  // console.log("-----------------------------------");
  // console.log(conferenceEntry.fields.title);
  // if (conferenceEntry.fields.media) {
  //   console.log(conferenceEntry.fields.media[0]);
  // }
  // console.log("-----------------------------------");

  return {
    title: conferenceEntry.fields.title,
    content: conferenceEntry.fields.content,
    slug: conferenceEntry.fields.slug,
    tags: conferenceEntry.fields.tags,
    startDate: conferenceEntry.fields.startDate,
    endDate: conferenceEntry.fields.endDate,
    venueName: conferenceEntry.fields.venueName,
    venueAddress: conferenceEntry.fields.venueAddress,
    // media: conferenceEntry.fields.media,
    coverImage: coverImage,
  };
}

// A function to fetch all blog posts.
// Optionally uses the Contentful content preview.
interface FetchConferencePagesOptions {
  preview: boolean;
}
export async function fetchConferencePages(
  { preview }: FetchConferencePagesOptions,
): Promise<ConferencePage[]> {
  const contenful = contentfulClient({ preview });

  const conferenceResult = await contenful.getEntries<TypeConferenceSkeleton>({
    content_type: "conference",
    include: 2,
  });

  return conferenceResult.items.map((conferenceEntry) =>
    parseContentfulConference(conferenceEntry) as ConferencePage
  );
}

// A function to fetch a single blog post by its slug.
// Optionally uses the Contentful content preview.
interface FetchConferencePageOptions {
  slug: string;
  preview: boolean;
}
export async function fetchConferencePage(
  { slug, preview }: FetchConferencePageOptions,
): Promise<ConferencePage | null> {
  const contentful = contentfulClient({ preview });

  const conferenceResult = await contentful.getEntries<TypeConferenceSkeleton>({
    content_type: "conference",
    "fields.slug": slug,
    include: 2,
  });

  return parseContentfulConference(conferenceResult.items[0]);
}

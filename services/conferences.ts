import { TypeConferenceSkeleton } from "@/types/contentful/types";
import { Entry } from "contentful";
import { Document as RichTextDocument } from "@contentful/rich-text-types";
import contentfulClient from "./contentfulClient";

type ConferenceEntry = Entry<TypeConferenceSkeleton, undefined, string>;

// Our simplified version of a BlogPost.
// We don't need all the data that Contentful gives us.
export interface ConferencePage {
  title: string;
  slug: string;
  content: RichTextDocument;
}

// A function to transform a Contentful blog post
// into our own BlogPost object.
export function parseContentfulConference(
  conferenceEntry: ConferenceEntry,
): ConferencePage | null {
  if (!conferenceEntry) {
    return null;
  }

  return {
    title: conferenceEntry.fields.title,
    slug: conferenceEntry.fields.slug,
    content: conferenceEntry.fields.content,
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
	slug: string
	preview: boolean
}
export async function fetchConferencePage({ slug, preview }: FetchConferencePageOptions): Promise<ConferencePage | null> {
	const contentful = contentfulClient({ preview })

	const conferenceResult = await contentful.getEntries<TypeConferenceSkeleton>({
		content_type: 'conference',
		'fields.slug': slug,
		include: 2,
	})

	return parseContentfulConference(conferenceResult.items[0])
}

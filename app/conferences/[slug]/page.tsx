import { Metadata, ResolvedMetadata } from "next";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import {
  fetchConferencePage,
  fetchConferencePages,
} from "@/services/conferences";
import Link from "next/link";
import RichText from "@/components/RichText";

interface ConferencePageParams {
  slug: string;
}

interface ConferencePageProps {
  params: ConferencePageParams;
}

// Tell Next.js about all our blog posts so
// they can be statically generated at build time.
export async function generateStaticParams(): Promise<ConferencePageParams[]> {
  const conferencePages = await fetchConferencePages({ preview: false });

  return conferencePages.map((page) => ({ slug: page.slug }));
}

// For each blog post, tell Next.js which metadata
// (e.g. page title) to display.
export async function generateMetaData(
  { params }: ConferencePageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const conferencePage = await fetchConferencePage({
    slug: params.slug,
    preview: draftMode().isEnabled,
  });

  if (!conferencePage) {
    return notFound();
  }

  return {
    title: conferencePage.title,
  };
}

// The actual BlogPostPage component.
export default async function ConferencePage({ params }: ConferencePageProps) {
  // Fetch a single blog post by slug,
  // using the content preview if draft mode is enabled:
  const conferencePage = await fetchConferencePage({
    slug: params.slug,
    preview: draftMode().isEnabled,
  });

  console.log(conferencePage)

  if (!conferencePage) {
    return notFound();
  }

  return (
    <main className="p-[6vw]">
      <Link href="/">Posts</Link>

      <div className="prose mt-8 border-t pt-8">
        <h1>{conferencePage.title}</h1>
        <RichText document={conferencePage.content} />
      </div>
    </main>
  );
}

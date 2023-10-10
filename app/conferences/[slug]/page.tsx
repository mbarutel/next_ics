import { Metadata, ResolvingMetadata } from "next";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import {
  fetchConferencePage,
  fetchConferencePages,
} from "@/contentful/services/conferences";
import RichText from "@/components/common/RichText";
import ConferenceHeader from "@/components/conference/ConferenceHeader";

type ConferencePageParams = {
  slug: string;
};

type ConferencePageProps = {
  params: ConferencePageParams;
};

// Tell Next.js about all our blog posts so
// they can be statically generated at build time.
export async function generateStaticParams(): Promise<ConferencePageParams[]> {
  const conferencePages = await fetchConferencePages({ preview: false });

  return conferencePages.map((page) => ({ slug: page.slug }));
}

// For each blog post, tell Next.js which metadata
// (e.g. page title) to display.
// export async function generateMetaData(
//   { params }: ConferencePageProps,
//   parent: ResolvingMetadata,
// ): Promise<Metadata> {
//   const conferencePage = await fetchConferencePage({
//     slug: params.slug,
//     preview: draftMode().isEnabled,
//   });
//
//   if (!conferencePage) {
//     return notFound();
//   }
//
//   return {
//     title: conferencePage.title,
//   };
// }

// The actual BlogPostPage component.
// Fetch a single blog post by slug,
// using the content preview if draft mode is enabled:
export default async function page({ params }: ConferencePageProps) {
  const conferencePage = await fetchConferencePage({
    slug: params.slug,
    preview: draftMode().isEnabled,
  });

  if (!conferencePage) {
    return notFound();
  }

  return (
    <>
      <ConferenceHeader conferencePage={conferencePage} />
      <section className="-mt-[6.5rem] sm:-mt-[9rem] lg:-mt-[10rem]">
        <div className="container">
          <div className="rich_text mt-8 border-t">
            <RichText document={conferencePage.content} />
          </div>
        </div>
      </section>
    </>
  );
}

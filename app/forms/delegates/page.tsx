import { Conference } from "@/contentful/services/conferences";
import parserConferenceEntry from "@/contentful/utils/parser-conference-entry";
import { notFound } from "next/navigation";
import { draftMode } from "next/headers";
import DelegateForm from "@/sections/forms/delegates/delegate-form";

export async function generateStaticParams() {
  const conferenceInstance = new Conference({
    preview: false,
    parser: parserConferenceEntry,
  });

  const conferences = await conferenceInstance.getConferences();

  return conferences.map((conference) => ({
    conference: conference.slug,
  }));
}

export default async function DelegatesPage({
  searchParams,
}: {
  searchParams: Promise<{ conference?: string }>;
}) {
  const draft = await draftMode();
  const { conference: conferenceSlug } = await searchParams;

  const conferenceInstance = new Conference({
    preview: draft.isEnabled,
    parser: parserConferenceEntry,
  });

  // Get all conferences for selection
  const conferences = await conferenceInstance.getConferences();

  if (conferences.length === 0) {
    return notFound();
  }

  return (
    <main className="min-h-screen">
      <section className="container mx-auto px-4">
        <DelegateForm
          conferences={conferences}
          preSelectedConferenceSlug={conferenceSlug}
        />
      </section>
    </main>
  );
}

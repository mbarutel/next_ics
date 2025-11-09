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
      <section>
        <div className="container mx-auto w-[min(90%,960px)] py-8">
          <div className="form_section_wrapper text-center bg-stone-700 mb-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-yellow-400 mb-2">
              Delegation Registration
            </h1>
            <p className="text-white italic w-[min(100%,80ch)] mx-auto text-sm sm:text-base">
              Register your delegation for upcoming conferences. Fill in the details below to secure your spot.
            </p>
          </div>
          <hr className="my-2" />
          <DelegateForm
            conferences={conferences}
            preSelectedConferenceSlug={conferenceSlug}
          />
        </div>
      </section>
    </main>
  );
}

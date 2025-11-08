import { Conference } from "@/contentful/services/conferences";
import parserConferenceEntry from "@/contentful/utils/parser-conference-entry";
import { notFound } from "next/navigation";
import { draftMode } from "next/headers";
import RegistrationForm from "@/components/registration-form";

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

  // Get the conference based on slug or get the first one
  let conference;
  if (conferenceSlug) {
    conference = await conferenceInstance.getConference(conferenceSlug);
    if (!conference) {
      return notFound();
    }
  } else {
    const conferences = await conferenceInstance.getConferences();
    if (conferences.length === 0) {
      return notFound();
    }
    conference = conferences[0];
  }

  return (
    <main className="min-h-screen bg-stone-900 text-white">
      <section className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Delegate Registration
          </h1>
          <p className="text-gray-400">
            Register for {conference.title}
          </p>
        </div>

        <RegistrationForm {...conference} />
      </section>
    </main>
  );
}

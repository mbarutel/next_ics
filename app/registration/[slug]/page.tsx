import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { ConferenceType } from "@/lib/types";
import { parserConferenceEntry } from "@/contentful/utils";
import { Conference } from "@/contentful/services/conferences";
import { RegistrationForm, RegistrationHeader } from "@/components";

type ConferenceInfoParams = {
  slug: string;
};
export async function generateStaticParams(): Promise<ConferenceInfoParams[]> {
  const conferenceInstance = new Conference({
    preview: false,
    parser: parserConferenceEntry,
  });

  return await conferenceInstance.getConferences();
}

type ConferenceInfoProps = {
  params: ConferenceInfoParams;
};
export default async function page({ params }: ConferenceInfoProps) {
  const conferenceInstance = new Conference({
    preview: draftMode().isEnabled,
    parser: parserConferenceEntry,
  });

  const conference = await conferenceInstance.getConference(params.slug);

  if (!conference) {
    return notFound();
  }

  const content = conference.prices
    ? FormReady({ conference })
    : FormNotReady();

  return (
    <>
      <RegistrationHeader {...conference} />
      <section>
        <div className="section_container">
          {content}
        </div>
      </section>
    </>
  );
}

function FormNotReady() {
  return (
    <>
      <h1>Registration form is not yet ready</h1>
    </>
  );
}

function FormReady({ conference }: { conference: ConferenceType }) {
  return (
    <>
      <RegistrationForm {...conference} />
    </>
  );
}

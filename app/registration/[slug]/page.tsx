import dayjs from "dayjs";
import { draftMode } from "next/headers";
import { RegistrationForm, RegistrationHeader } from "@/components";
import { notFound } from "next/navigation";
import { parserConferenceEntry } from "@/contentful/utils";
import { Conference } from "@/contentful/services/conferences";
import { ConferenceType } from "@/lib/types";

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
      <RegistrationHeader />
      <section>
        <div className="section_container">
          <div className="py-6">
            <h1 className="text-2xl sm:text-4xl font-bold mb-2">
              {conference.title}
            </h1>
            {conference.date &&
              (
                <div className="flex gap-2 text-xl font-semibold">
                  <span>
                    {dayjs(conference.date.startDate).format("DD")} -{" "}
                    {dayjs(conference.date.endDate).format("DD MMM, YYYY")}
                  </span>
                  {" | "}
                  <span>{conference.venue}</span>
                </div>
              )}
          </div>
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

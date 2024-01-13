import dayjs from "dayjs";
import { draftMode } from "next/headers";
import { FormikForm, RegistrationForm } from "@/components";
import { notFound } from "next/navigation";
import { parserConferenceEntry } from "@/contentful/utils";
import { Conference } from "@/contentful/services/conferences";

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

  // if (!conference.fees) {
  //   return (
  //     <div>
  //       <h2>Registration form is not yet ready</h2>
  //     </div>
  //   );
  // }

  return (
    <>
      <section>
        <div className="section_container">
          <div className="py-6">
            <h1 className="text-2xl sm:text-5xl font-bold mb-2">
              Registration {conference.title}
            </h1>
            {conference.date &&
              (
                <div className="flex_col gap-2 text-xl">
                  <span>
                    {dayjs(conference.date.startDate).format("DD")} -{" "}
                    {dayjs(conference.date.endDate).format("DD MMM, YYYY")}
                  </span>
                  <span className="-mt-2">{conference.venue}</span>
                </div>
              )}
          </div>
          <RegistrationForm {...conference} />
        </div>
      </section>
    </>
  );
}

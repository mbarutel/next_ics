import {
  SubscribeEmailList,
  ConferenceAbout,
  CallToAction,
  SharedHeader,
  ConferenceSponsors,
  ConferenceKeypoints,
} from "@/components";
import dayjs from "dayjs";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { parserConferenceEntry } from "@/contentful/utils";
import { Conference } from "@/contentful/services/conferences";

type ConferencePageParams = {
  slug: string;
};
export async function generateStaticParams(): Promise<ConferencePageParams[]> {
  const conferenceInstance = new Conference({
    preview: false,
    parser: parserConferenceEntry,
  });

  return await conferenceInstance.getConferences();
}

type ConferencePageProps = {
  params: Promise<ConferencePageParams>;
};
export default async function page({ params }: ConferencePageProps) {
  const { slug } = await params;
  const { isEnabled } = await draftMode();

  const conferenceInstance = new Conference({
    preview: isEnabled,
    parser: parserConferenceEntry,
  });

  const conference = await conferenceInstance.getConference(slug);

  if (!conference) {
    return notFound();
  }

  const headerText = {
    title: conference.title,
    subtitle: `${dayjs(conference?.date?.startDate).format("DD-")} ${dayjs(conference?.date?.endDate).format("DD MMMM YYYY")} | ${conference.venue}`,
    anchor: "#about",
  };

  return (
    <>
      <SharedHeader prop={{ ...headerText }} />
      <ConferenceAbout conference={conference} />
      <ConferenceKeypoints
        events={conference.events}
        speakers={conference.speakers}
        agenda={conference.agenda}
      />
      <ConferenceSponsors sponsors={conference.sponsors} />
      <CallToAction />
      <SubscribeEmailList />
    </>
  );
}

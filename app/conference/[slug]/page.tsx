import {
  NavBar,
  CallToAction,
  ConferenceEvents,
  SubscribeEmailList,
  ConferenceSpeakers,
  ConferenceAbout,
  ConferenceAgenda,
  SharedHeader,
} from "@/components";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { parserConferenceEntry } from "@/contentful/utils";
import { Conference } from "@/contentful/services/conferences";
import dayjs from "dayjs";

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
  params: ConferencePageParams;
};
export default async function page({ params }: ConferencePageProps) {
  const conferenceInstance = new Conference({
    preview: draftMode().isEnabled,
    parser: parserConferenceEntry,
  });

  const conferences = await conferenceInstance.getConferences();

  const conference = conferences.find(
    (conference) => conference.slug === params.slug,
  );

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
      <NavBar conferences={conferences} />
      <SharedHeader prop={{ ...headerText }} />
      <ConferenceAbout conference={conference} />
      <ConferenceEvents events={conference.events} />
      <ConferenceAgenda agenda={conference.agenda} />
      <ConferenceSpeakers speakers={conference.speakers} />
      <CallToAction />
      <SubscribeEmailList />
    </>
  );
}

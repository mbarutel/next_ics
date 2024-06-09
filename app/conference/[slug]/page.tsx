import {
  NavBar,
  CallToAction,
  Announcement,
  ConferenceEvents,
  ConferenceHeader,
  SubscribeEmailList,
  ConferenceSpeakers,
  ConferenceAbout,
  ConferenceAgenda,
} from "@/components";
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
  params: ConferencePageParams;
};
export default async function page({ params }: ConferencePageProps) {
  const conferenceInstance = new Conference({
    preview: draftMode().isEnabled,
    parser: parserConferenceEntry,
  });

  const conferences = await conferenceInstance.getConferences();

  const conferencePage = conferences.find(
    (conference) => conference.slug === params.slug,
  );

  if (!conferencePage) {
    return notFound();
  }

  return (
    <>
      <NavBar conferences={conferences} />
      <ConferenceHeader {...conferencePage} />
      <Announcement />
      <ConferenceAbout conference={conferencePage} />
      <ConferenceEvents events={conferencePage.events} />
      <ConferenceAgenda agenda={conferencePage.agenda} />
      <ConferenceSpeakers speakers={conferencePage.speakers} />
      <CallToAction />
      <SubscribeEmailList />
    </>
  );
}

import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { parserConferenceEntry } from "@/contentful/utils";
import { Conference } from "@/contentful/services/conferences";
import {
  CallToAction,
  ConferenceEvents,
  ConferenceHeader,
  NavBar,
  SubscribeEmailList,
} from "@/components";
import Announcement from "@/components/announcement";

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
  const conferencePage = conferences.find((conference) =>
    conference.slug === params.slug
  );

  if (!conferencePage) {
    return notFound();
  }

  return (
    <>
      <NavBar conferences={conferences} />
      <ConferenceHeader {...conferencePage} />
      <Announcement />
      <ConferenceEvents events={conferencePage.events} />
      <CallToAction />
      <SubscribeEmailList />
    </>
  );
}

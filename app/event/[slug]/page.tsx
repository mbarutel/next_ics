import {
  Announcement,
  CallToAction,
  EventHeader,
  EventInformation,
  NavBar,
  SubscribeEmailList,
} from "@/components";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { Event } from "@/contentful/services/event";
import { Conference } from "@/contentful/services/conferences";
import { parserConferenceEntry, parserEventEntry } from "@/contentful/utils";

type EventPageParams = {
  slug: string;
};

export async function generateStaticParams(): Promise<EventPageParams[]> {
  const eventInstance = new Event({
    preview: false,
    parser: parserEventEntry,
  });

  return await eventInstance.getEvents();
}

type EventPageProps = {
  params: EventPageParams;
};
export default async function page({ params }: EventPageProps) {
  const eventInstance = new Event({
    preview: draftMode().isEnabled,
    parser: parserEventEntry,
  });

  const conferenceInstance = new Conference({
    preview: draftMode().isEnabled,
    parser: parserConferenceEntry,
  });

  const eventPage = await eventInstance.getEvent(params.slug);

  if (!eventPage || !eventPage.conference) {
    return notFound();
  }

  const conferences = await conferenceInstance.getConferences();

  return (
    <>
      <NavBar conferences={conferences} />
      <EventHeader {...eventPage} />
      <Announcement />
      <EventInformation {...eventPage} />
      <CallToAction />
      <SubscribeEmailList />
    </>
  );
}

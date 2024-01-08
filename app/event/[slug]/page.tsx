import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { Event } from "@/contentful/services/event";
import { parserEventEntry } from "@/contentful/utils";
import {
  Announcement,
  EventHeader,
  EventInformation,
} from "@/components";

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

  const eventPage = await eventInstance.getEvent(params.slug);

  if (!eventPage || !eventPage.conference) {
    return notFound();
  }

  return (
    <>
      <EventHeader {...eventPage} />
      <Announcement />
      <EventInformation {...eventPage} />
    </>
  );
}


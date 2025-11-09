import {
  SubscribeEmailList,
  EventInformation,
  CallToAction,
  SharedHeader,
} from "@/components";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { Event } from "@/contentful/services/event";
import { parserEventEntry } from "@/contentful/utils";
import dayjs from "dayjs";
import { configs } from "@/lib/data";

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
  params: Promise<EventPageParams>;
};
export default async function page({ params }: EventPageProps) {
  const { slug } = await params;
  const { isEnabled } = await draftMode();

  const eventInstance = new Event({
    preview: isEnabled,
    parser: parserEventEntry,
  });

  const eventPage = await eventInstance.getEvent(slug);

  if (!eventPage || !eventPage.conference) {
    return notFound();
  }

  const headerText = {
    title: eventPage.title,
    subtitle: `${dayjs(eventPage?.conference?.date?.startDate).format("DD-")} ${dayjs(eventPage?.conference?.date?.endDate).format("DD MMMM YYYY")} | ${eventPage?.conference?.venue}`,
    anchor: "#information",
    register: `/forms/delegates?conference=${eventPage.conference.slug}`,
    paper: `/forms/speakers?conference=${eventPage.conference.slug}`,
  };

  return (
    <>
      <SharedHeader prop={{ ...headerText }} />
      <EventInformation {...eventPage} />
      <CallToAction />
      <SubscribeEmailList />
    </>
  );
}

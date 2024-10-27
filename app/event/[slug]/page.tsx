import {
  SubscribeEmailList,
  EventInformation,
  CallToAction,
  SharedNavbar,
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

  const headerText = {
    title: eventPage.title,
    subtitle: `${dayjs(eventPage?.conference?.date?.startDate).format("DD-")} ${dayjs(eventPage?.conference?.date?.endDate).format("DD MMMM YYYY")} | ${eventPage?.conference?.venue}`,
    anchor: "#information",
    register: eventPage.conference.formLink,
    paper: configs.forms.submitPaper,
  };

  return (
    <>
      <SharedNavbar />
      <SharedHeader prop={{ ...headerText }} />
      <EventInformation {...eventPage} />
      <CallToAction />
      <SubscribeEmailList />
    </>
  );
}

import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { Event } from "@/contentful/services/event";
import { parserEventEntry } from "@/contentful/utils";
import {
  Agenda,
  Announcement,
  EventHeader,
  EventText,
  Masterclass,
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

  const agenda = eventPage.agenda.length > 0 ? eventPage.agenda : null;
  const masterclasses =
    eventPage.conference && eventPage.conference.masterclass.length > 0
      ? eventPage.conference.masterclass
      : null;

  return (
    <>
      <EventHeader {...eventPage} />
      <Announcement />
      <article>
        <div className="section_container">
          <EventText event={eventPage} />
          {agenda && <Agenda agenda={agenda} />}
          {masterclasses && <Masterclass masterclass={masterclasses} />}
        </div>
      </article>
    </>
  );
}

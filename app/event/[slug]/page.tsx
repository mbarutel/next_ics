import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import {
  Agenda,
  ConferenceText,
  EventFooter,
  EventHeader,
  Masterclass,
  ScrollBottons,
} from "@/components";
import { Event } from "@/contentful/services/event";
import { parserEventEntry } from "@/contentful/utils";
import ActiveSectionContextProvider from "@/context/active-section-context";
import Announcement from "@/components/announcement";

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
      <ActiveSectionContextProvider>
        <EventHeader {...eventPage} />
        <Announcement />
        <article>
          <div className=" section_container flex gap-2">
            <div>
              <ConferenceText event={eventPage} />
              {eventPage.agenda.length &&
                <Agenda agenda={eventPage.agenda} />}
              {eventPage.conference &&
                eventPage.conference.masterclass.length &&
                <Masterclass masterclass={eventPage.conference.masterclass} />}
            </div>
            {eventPage.agenda.length && eventPage.conference &&
              eventPage.conference.masterclass.length && <ScrollBottons />}
          </div>
        </article>
        <EventFooter />
      </ActiveSectionContextProvider>
    </>
  );
}

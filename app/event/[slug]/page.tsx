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
import { fetchEvent, fetchEvents } from "@/contentful";
import ActiveSectionContextProvider from "@/context/active-section-context";

type EventPageParams = {
  slug: string;
};
export async function generateStaticParams(): Promise<EventPageParams[]> {
  const eventPages = await fetchEvents({ preview: false });

  return eventPages.map((page) => ({ slug: page.slug }));
}

type EventPageProps = {
  params: EventPageParams;
};
export default async function page({ params }: EventPageProps) {
  const eventPage = await fetchEvent({
    slug: params.slug,
    preview: draftMode().isEnabled,
  });

  if (!eventPage) {
    return notFound();
  }

  return (
    <>
      <EventHeader event={eventPage} />
      <ActiveSectionContextProvider>
        <article className="static px-2 max-w-4xl mx-auto flex gap-1 mt-6">
          <div>
            <ConferenceText event={eventPage} />
            {eventPage.agenda === undefined
              ? null
              : <Agenda agenda={eventPage.agenda} />}
            {eventPage.conference.masterclass === undefined
              ? null
              : <Masterclass masterclass={eventPage.conference.masterclass} />}
          </div>
          <ScrollBottons />
        </article>
        <EventFooter />
      </ActiveSectionContextProvider>
    </>
  );
}

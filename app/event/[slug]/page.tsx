import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import {
  Agenda,
  CallToAction,
  EventHeader,
  Masterclass,
  RichText,
  SubscribeEmailList,
} from "@/components";
import { fetchEvent, fetchEvents } from "@/contentful";

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
      <section>
        <div className="container">
          <div className="px-4 lg:px-6 pt-6 max-w-4xl mx-auto bg-slate-100 border bg-paper_gradient bg-[length:5px_5px] rounded-md mt-6">
            <div className="pb-6">
              <RichText document={eventPage.content} />
            </div>
          </div>
          {eventPage.agenda === undefined
            ? null
            : <Agenda agenda={eventPage.agenda} />}
          {eventPage.conference.masterclass === undefined
            ? null
            : <Masterclass masterclass={eventPage.conference.masterclass} />}
        </div>
      </section>
      <CallToAction />
      <SubscribeEmailList />
    </>
  );
}

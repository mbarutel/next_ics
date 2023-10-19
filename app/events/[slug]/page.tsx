import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import {
  CallToAction,
  EventHeader,
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
      <section className="pt-8 lg:pt-12">
        <div className="container">
          <h2 className="section_header text-center text-orange-500">
            Agenda
          </h2>
          <h3 className="text-center mb-4 sm:mb-6 text-2xl sm:text-3xl italic text-orange-600 font-thin capitalize">
            Building better future together
          </h3>
          <RichText document={eventPage.content} />
        </div>
      </section>
      <CallToAction />
      <SubscribeEmailList />
    </>
  );
}

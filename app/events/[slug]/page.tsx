import { draftMode } from "next/headers";
import { fetchEvent, fetchEvents } from "@/contentful";
import { notFound } from "next/navigation";
import RichText from "@/components/common/RichText";
import { EventHeader } from "@/components";

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
          <RichText document={eventPage.content} />
        </div>
      </section>
    </>
  );
}

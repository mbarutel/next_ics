import { draftMode } from "next/headers";
import { fetchEvent, fetchEvents } from "@/contentful";
import { notFound } from "next/navigation";
import RichText from "@/components/common/RichText";
import Image from "next/image";

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

  console.log(eventPage);

  if (!eventPage) {
    return notFound();
  }

  return (
    <>
      <section>
        <div className="container pt-20">
          <div className="relative h-96 w-72 mx-auto">
            <Image
              src={eventPage.coverImage.src}
              alt="Event Cover Image"
              fill
              className="object-cover"
            />
          </div>
          <RichText document={eventPage.content} />
        </div>
      </section>
    </>
  );
}

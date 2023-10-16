import { draftMode } from "next/headers";
import { fetchEvent, fetchEvents } from "@/contentful";
import { notFound } from "next/navigation";
import RichText from "@/components/common/RichText";
import Image from "next/image";
import Link from "next/link";

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
      <section className="pt-20">
        <div className="container grid grid-cols-2 h-[25rem] sm:h-[35rem] lg:h-[60rem]">
          <div className="relative h-full">
            <Image
              src={eventPage.coverImage.src}
              alt="Event Cover Image"
              fill
              className="object-contain"
            />
          </div>
          <div className="bg-slate-600 flex justify-center items-center">
            <div className="flex flex-col">
              <span className="bg-slate-100">
                <h1 className="text-slate-950">{eventPage.title}</h1>
              </span>
              <span>
                <h3 className="text-white">{eventPage.title}</h3>
              </span>
              <Link
                href={eventPage.conference?.registrationLink}
                target="_blank"
                rel="noreferrer"
                className="relative ml-auto inline-flex w-fit group button_padding bg-orange-500 text-sm sm:text-base transition-all active:scale-95"
              >
                <span className="z-10">
                  Register
                </span>
                <span className="absolute h-full w-0 left-0 bottom-0 group-hover:w-full bg-slate-800 transition-all ease-in-out z-0" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          <RichText document={eventPage.content} />
        </div>
      </section>
    </>
  );
}

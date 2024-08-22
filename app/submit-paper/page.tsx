import SpeakerForm from "@/components/forms/paper/speaker-form";
import { Event } from "@/contentful/services/event";
import { parserEventEntry } from "@/contentful/utils";

export async function generateStaticParams() {
  const eventInstance = new Event({
    preview: false,
    parser: parserEventEntry,
  });

  return await eventInstance.getEvents();
}

export default async function page() {
  const eventInstance = new Event({
    preview: false,
    parser: parserEventEntry,
  });

  const events = await eventInstance.getEvents();

  return (
    <>
      <section className="section_padding">
        <div className="mx-auto px-1 w-[min(90%,960px)]">
          <h2 className="text-5xl font-semibold">
            Submit a Paper
          </h2>
          <SpeakerForm />
        </div>
      </section>
    </>
  )
}

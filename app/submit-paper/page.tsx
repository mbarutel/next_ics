import { parserEventEntry } from "@/contentful/utils";
import { Event } from "@/contentful/services/event";
import { FormPaper } from "@/components";

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
      <section>
        <div className="container w-[min(90%,960px)]">
          <div className="form_section_wrapper text-center bg-stone-700">
            <h2 className="text-6xl font-semibold text-yellow-400 mb-2">
              Submit a Paper
            </h2>
            <p className="italic w-[min(100%,80ch)] mx-auto">
              Empower others with your experience, personal journeys, stories,
              insights, and wisdom, inspiring a world where all culture is
              celebrated and respected. Submit a paper for the following
              conferences!
            </p>
          </div>
          <hr className="my-2" />
          <FormPaper events={events} />
        </div>
      </section>
    </>
  );
}

import InputField from "@/components/forms/paper/input-field";
import PaperFormik from "@/components/forms/paper/paper-formik";
import { Event } from "@/contentful/services/event";
import { parserEventEntry } from "@/contentful/utils";
import { Formik } from "formik";

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
        <div className="section_container">
          <h2 className="text-5xl font-semibold">
            Submit a Paper
          </h2>
          <PaperFormik />
        </div>
      </section>
    </>
  )
}

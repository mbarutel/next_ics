import {
  CallToAction,
  ConferenceDisplay,
  Header,
  SubscribeEmailList,
} from "@/components";
import React, { Fragment } from "react";
import { draftMode } from "next/headers";
import { Conference } from "@/contentful/services/conferences";
import { parserConferenceEntry } from "@/contentful/utils";

export async function generateStaticParams() {
  const conferenceInstance = new Conference({
    preview: false,
    parser: parserConferenceEntry,
  });

  return await conferenceInstance.getConferences();
}

export default async function page() {
  const conferenceInstance = new Conference({
    preview: draftMode().isEnabled,
    parser: parserConferenceEntry,
  });

  const conferences = await conferenceInstance.getConferences();

  return (
    <>
      <Header conferences={conferences} />
      <section className="pt-8 lg:pt-12">
        <div className="container">
          <h2
            style={{ fontFamily: "Abril Fatface" }}
            className="section_header text-center text-orange-500"
          >
            Upcoming Events
          </h2>
          <h3 className="text-center mb-4 sm:mb-6 lg:mb-10 text-2xl sm:text-3xl italic text-orange-600 font-thin capitalize">
            Building better future together
          </h3>
          <div className="flex flex-col gap-12">
            {conferences.map((conference) => {
              return (
                <Fragment key={conference.slug}>
                  <ConferenceDisplay conference={conference} />
                </Fragment>
              );
            })}
          </div>
        </div>
      </section>
      <CallToAction />
      <SubscribeEmailList />
    </>
  );
}

import React, { Fragment } from "react";
import { fetchConferences } from "@/contentful";
import { draftMode } from "next/headers";
import {
  CallToAction,
  ConferenceDisplay,
  Header,
  SubscribeEmailList,
} from "@/components";

export default async function page() {
  const conferences = await fetchConferences({
    preview: draftMode().isEnabled,
  });

  return (
    <>
      <Header conferences={conferences} />
      <section className="pt-8 lg:pt-12">
        <div className="container">
          <h2 className="section_header text-center text-orange-500">
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

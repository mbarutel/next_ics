import React from "react";
import { About, Header, OurPurpose, OurValues, OurVision } from "@/components";
import { Conference } from "@/contentful/services/conferences";
import { parserConferenceEntry } from "@/contentful/utils";
import { draftMode } from "next/headers";

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
      <About />
      <OurVision />
      <OurPurpose />
      <OurValues />
    </>
  );
}

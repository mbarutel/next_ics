import {
  About,
  AboutPurpose,
  AboutValues,
  AboutVision,
  Announcement,
  CallToAction,
  LandingHeader,
  NavBar,
  SubscribeEmailList,
} from "@/components";
import { draftMode } from "next/headers";
import { parserConferenceEntry } from "@/contentful/utils";
import { Conference } from "@/contentful/services/conferences";

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
      <NavBar conferences={conferences} />
      <LandingHeader />
      <Announcement />
      <About />
      <AboutVision />
      <AboutPurpose />
      <AboutValues />
      <CallToAction />
      <SubscribeEmailList />
    </>
  );
}

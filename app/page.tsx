import {
  CallToAction,
  LandingHeader,
  SubscribeEmailList,
  UpcomingConferences,
} from "@/components";
import NavBar from "@/components/nav-bar";
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

export default async function Home() {
  const conferenceInstance = new Conference({
    preview: draftMode().isEnabled,
    parser: parserConferenceEntry,
  });

  const conferences = await conferenceInstance.getConferences();

  return (
    <>
      <LandingHeader />
      <NavBar />
      <UpcomingConferences
        conferences={conferences}
      />
      <CallToAction />
      <SubscribeEmailList />
    </>
  );
}

import {
  Announcement,
  CallToAction,
  ConferenceTimer,
  InstagramBanner,
  LandingHeader,
  NavBar,
  SubscribeEmailList,
  UpcomingConferences,
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

export default async function Home() {
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
      <InstagramBanner />
      <ConferenceTimer conferences={conferences} />
      <UpcomingConferences
        conferences={conferences}
      />
      <CallToAction />
      <SubscribeEmailList />
    </>
  );
}

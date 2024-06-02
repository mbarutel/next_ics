import {
  Announcement,
  CallToAction,
  InstagramBanner,
  IntroModal,
  LandingHeader,
  MeetTheTeam,
  NavBar,
  NextConference,
  SubscribeEmailList,
  Testimonials,
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
      <IntroModal />
      <NavBar conferences={conferences} />
      <LandingHeader />
      <Announcement />
      <NextConference conferences={conferences} />
      <UpcomingConferences conferences={conferences.slice(1)} />
      <InstagramBanner />
      <Testimonials />
      {/* <MeetTheTeam /> */}
      <CallToAction />
      <SubscribeEmailList />
    </>
  );
}

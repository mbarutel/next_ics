import {
  Announcement,
  CallToAction,
  HomeCarousel,
  HomeConference,
  HomeHighlight,
  InstagramBanner,
  HomeAcknowledgement,
  LandingHeader,
  NavBar,
  SubscribeEmailList,
  HomeTestimonial,
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
      <HomeAcknowledgement />
      <NavBar conferences={conferences} />
      <LandingHeader />
      <Announcement />
      <HomeConference conferences={conferences} />
      <UpcomingConferences conferences={conferences.slice(1)} />
      <HomeHighlight />
      <HomeCarousel />
      <InstagramBanner />
      <HomeCarousel />
      <HomeTestimonial />
      <CallToAction />
      <SubscribeEmailList />
    </>
  );
}

import {
  Announcement,
  CallToAction,
  HomeCarousel,
  HomeHighlight,
  InstagramBanner,
  HomeAcknowledgement,
  HomeHeader,
  SubscribeEmailList,
  HomeTestimonial,
  HomeConferences,
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
  const { isEnabled } = await draftMode();

  const conferenceInstance = new Conference({
    preview: isEnabled,
    parser: parserConferenceEntry,
  });

  const conferences = await conferenceInstance.getConferences();

  debugger

  return (
    <>
      <HomeAcknowledgement />
      <HomeHeader />
      <HomeConferences conferences={conferences} />
      <InstagramBanner />
      <HomeHighlight />
      <HomeCarousel />
      <HomeTestimonial />
      <CallToAction />
      <SubscribeEmailList />
    </>
  );
}

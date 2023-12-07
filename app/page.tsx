import {
  CallToAction,
  Header,
  SubscribeEmailList,
  UpcomingEvents,
} from "@/components";
import { Conference } from "@/contentful/services/conferences";
import { draftMode } from "next/headers";

export default async function Home() {
  const conferenceInstance = new Conference({
    preview: draftMode().isEnabled,
    parser: parseContentfulHeader,
  });

  const conferences = await conferenceInstance.getConferences();

  return (
    <>
      <Header
        conferences={conferences}
      />
      <UpcomingEvents
        conferences={conferences}
      />
      <CallToAction />
      <SubscribeEmailList />
    </>
  );
}

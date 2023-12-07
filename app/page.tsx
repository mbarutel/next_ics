import {
  CallToAction,
  Header,
  SubscribeEmailList,
  UpcomingEvents,
} from "@/components";
import { draftMode } from "next/headers";
import { parserConferenceEntry } from "@/contentful/utils";
import { Conference } from "@/contentful/services/conferences";

export default async function Home() {
  const conferenceInstance = new Conference({
    preview: draftMode().isEnabled,
    parser: parserConferenceEntry,
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

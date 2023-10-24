import {
  About,
  CallToAction,
  Header,
  SubscribeEmailList,
  UpcomingEvents,
} from "@/components";

import { fetchConferences } from "@/contentful";

export default async function Home() {
  const conferences = await fetchConferences({ preview: false });

  return (
    <>
      <Header
        conferences={conferences}
      />
      <UpcomingEvents
        conferences={conferences}
      />
      <About />
      <CallToAction />
      <SubscribeEmailList />
    </>
  );
}

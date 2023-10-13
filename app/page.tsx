import { Advantages, Header, SubscribeEmailList, UpcomingEvents } from "@/components";
import About from "@/components/home/About";
import CallToAction from "@/components/common/CallToAction";
import {
  fetchConferences,
  //   fetchConferencesEvents,
} from "@/contentful";

export default async function Home() {
  const conferences = await fetchConferences({ preview: false });

  console.log(conferences);

  return (
    <>
      <Header conferences={conferences} />
      <About />
      <UpcomingEvents conferences={conferences} />
      <Advantages />
      <CallToAction />
      <SubscribeEmailList />
    </>
  );
}

import { Header, SubscribeEmailList, UpcomingEvents } from "@/components";
import UpcomingConferences from "@/components/home/UpcomingConferences";
import About from "@/components/home/About";
import Advantages from "@/components/home/Advantages";
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

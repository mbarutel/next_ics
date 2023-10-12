import { Header } from "@/components";
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

  return (
    <>
      <Header conferences={conferences} />
      <About />
      <Advantages />
      <CallToAction />
    </>
  );
}

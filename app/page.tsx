import Header from "@/components/common/Header";
import UpcomingConferences from "@/components/home/UpcomingConferences";
import About from "@/components/home/About";
import Advantages from "@/components/home/Advantages";
import CallToAction from "@/components/common/CallToAction";
import {
  fetchConferences,
  fetchConferencesEvents,
} from "@/contentful/services/conferences";

export default async function Home() {
  // const events = await fetchConferencesEvents({
  //   slug: "february-2024-conferences",
  //   preview: false,
  // });
  //
  // console.log(events);
  const conferences = await fetchConferences({ preview: false});
  console.log(conferences);

  return (
    <>
      <Header
        link="#conferences"
        text="To get started, check the information below"
      />
      <UpcomingConferences />
      <About />
      <Advantages />
      <CallToAction />
    </>
  );
}

import Header from "@/components/common/Header";
import UpcomingConferences from "@/components/home/UpcomingConferences";
import About from "@/components/home/About";
import Advantages from "@/components/home/Advantages";
import CallToAction from "@/components/common/CallToAction";

export default async function Home() {
  return (
    <>
      <Header
        link="#conferences"
        text="To get started, check the information below"
      />
      <About />
      <UpcomingConferences />
      <Advantages />
      <CallToAction />
    </>
  );
}

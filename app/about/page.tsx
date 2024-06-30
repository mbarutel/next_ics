import {
  SubscribeEmailList,
  Announcement,
  AboutPurpose,
  CallToAction,
  SharedNavbar,
  AboutValues,
  AboutVision,
  HomeHeader,
  About,
} from "@/components";

export default async function page() {
  return (
    <>
      <SharedNavbar />
      <HomeHeader />
      <Announcement />
      <About />
      <AboutVision />
      <AboutPurpose />
      <AboutValues />
      <CallToAction />
      <SubscribeEmailList />
    </>
  );
}

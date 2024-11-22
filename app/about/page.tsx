import {
  SubscribeEmailList,
  Announcement,
  AboutPurpose,
  CallToAction,
  AboutValues,
  AboutVision,
  HomeHeader,
  About,
} from "@/components";

export default async function page() {
  return (
    <>
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

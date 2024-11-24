import {
  SubscribeEmailList,
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
      <About />
      <AboutVision />
      <AboutPurpose />
      <AboutValues />
      <CallToAction />
      <SubscribeEmailList />
    </>
  );
}

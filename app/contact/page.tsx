import React from "react";
import {
  SubscribeEmailList,
  Announcement,
  CallToAction,
  ContactForm,
  HomeHeader,
} from "@/components";

export default async function page() {
  return (
    <>
      <HomeHeader />
      <Announcement />
      <ContactForm />
      <CallToAction />
      <SubscribeEmailList />
    </>
  );
}

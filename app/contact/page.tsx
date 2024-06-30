import React from "react";
import {
  SubscribeEmailList,
  SharedNavbar,
  Announcement,
  CallToAction,
  ContactForm,
  HomeHeader,
} from "@/components";

export default async function page() {
  return (
    <>
      <SharedNavbar />
      <HomeHeader />
      <Announcement />
      <ContactForm />
      <CallToAction />
      <SubscribeEmailList />
    </>
  );
}

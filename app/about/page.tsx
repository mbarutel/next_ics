import React from "react";
import { fetchConferences } from "@/contentful";
import { About, Header, OurPurpose, OurValues, OurVision } from "@/components";

export default async function page() {
  const conferences = await fetchConferences({ preview: false });
  return (
    <>
      <Header conferences={conferences} />
      <About />
      <OurVision />
      <OurPurpose />
      <OurValues />
    </>
  );
}

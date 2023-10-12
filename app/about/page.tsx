import React from "react";
import Header from "@/components/common/Header";
import OurVision from "@/components/about/OurVision";
import OurPurpose from "@/components/about/OurPurpose";
import OurValues from "@/components/about/OurValues";
import { fetchConferences } from "@/contentful";

export default async function page() {
  const conferences = await fetchConferences({ preview: false });
  return (
    <>
      <Header conferences={conferences} />
      <OurVision />
      <OurPurpose />
      <OurValues />
    </>
  );
}

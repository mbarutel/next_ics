import React from "react";
import Header from "@/components/common/Header";
import OurVision from "@/components/about/OurVision";
import OurPurpose from "@/components/about/OurPurpose";
import OurValues from "@/components/about/OurValues";
import GuideBox from "@/components/common/Guidebox";

export default function page() {
  return (
    <>
      <Header
        link="#about"
        text="To get started, check the information below"
      />
      <OurVision />
      <OurPurpose />
      <OurValues />
      <GuideBox
        text="If you have any questions,"
        link="/contact"
        textLink="contact us"
      />
    </>
  );
}

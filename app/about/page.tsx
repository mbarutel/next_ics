import React from "react";
import Header from "@/components/common/Header";
import OurVision from "@/components/about/OurVision";
import OurPurpose from "@/components/about/OurPurpose";
import OurValues from "@/components/about/OurValues";

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
    </>
  );
}

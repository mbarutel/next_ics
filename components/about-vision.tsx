import React from "react";
import Image from "next/image";
import SectionHeaderText from "./section-header-text";

export default function AboutVision() {
  return (
    <section className="section_margin">
      <div className="section_container">
        <div className="about_section_columns">
          <div className="xl:py-20">
            <SectionHeaderText>Our Vision</SectionHeaderText>
            <p className="mt-1 sm:mt-4 mb-2 text-justify">
              ICS stands as the foremost and most enduring professional event
              management company in First Nations Australia, distinguished by
              our independence from government funding. Our unwavering
              commitment to closing the gap in Indigenous health, when coupled
              with our rich heritage, propels us to consistently deliver the
              highest standard of professional event management services.
            </p>
            <p className="mb-2 text-justify">
              At the heart of our organization lies our people and culture,
              individuals deeply dedicated to advancing First Nations affairs
              both in their professional roles and personal experiences. Over
              the years, we have meticulously assembled the most seasoned
              Indigenous Conference Management team in the industry. Since our
              inception, we have successfully orchestrated a remarkable array of
              events, both on the domestic and international stage, firmly
              rooted in our mission to promote Indigenous health and close the
              gap.
            </p>
            <p className="text-justify">
              ICS boasts an impressive track record, having flawlessly managed
              conferences hosting up to 6,500 delegates, organized festivals
              with attendance exceeding 70,000 over two days, and facilitated
              countless smaller conferences and events. Our comprehensive suite
              of services extends to community organizations, offering a diverse
              range of options, from full-scale event management to strategic
              marketing initiatives. Additionally, we provide valuable services
              such as complimentary conference venue sourcing, all geared
              towards supporting our partners in their pursuit of advancing
              Indigenous health and closing the gap.
            </p>
          </div>
          <div className="about_image_wrapper">
            <span className="w-60 h-96 absolute top-0 right-0 bg-gradient-to-l gradient_secondary rounded-md" />
            <div className="absolute bottom-0 left-0 h-[90%] w-[90%]">
              <div className="relative h-full rounded-md overflow-hidden">
                <Image
                  src="/assets/images/about_vision.webp"
                  fill
                  alt="Indigenous Health Conference"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-top image_hover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

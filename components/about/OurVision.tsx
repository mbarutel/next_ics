import React from "react";
import ImageFrame from "@/components/common/ImageFrame";
import IcsFounders from "@/public/assets/images/ics-founders.webp";

export default function OurVision() {
  return (
    <section id="about">
      <div className="container">
        <div>
          <h2 className="section_header text-center text-amber-800">
            About ICS
          </h2>
          <h3 className="text-center mb-4 -mt-3 text-xl lg:text-3xl italic text-orange-600 font-thin capitalize">
            Building better future together
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 items-center">
          <div className="order-1 sm:order-none">
            <h3 className="text-xl md:text-3xl mb-1 uppercase font-bold tracking-tight text-amber-800/90">
              Our Vision
            </h3>
            <p className="mb-2">
              ICS stands as the foremost and most enduring professional event
              management company in First Nations Australia, distinguished by
              our independence from government funding. Our unwavering
              commitment to closing the gap in Indigenous health, when coupled
              with our rich heritage, propels us to consistently deliver the
              highest standard of professional event management services.
            </p>
            <p className="mb-2">
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
            <p>
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
          <ImageFrame
            img={IcsFounders}
            alt="Conference Health"
            position="50% 15%"
            bg="#EBC284"
          />
        </div>
      </div>
    </section>
  );
}

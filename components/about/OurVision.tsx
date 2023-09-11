import React from "react";
import ImageFrame from "@/components/common/ImageFrame";
import IcsFounders from "@/public/assets/images/ics-founders.webp";

export default function OurVision() {
  return (
    <section id="about">
      <div className="container">
        <div>
          <h2 className="section_header text-center text-night">
            About ICS
          </h2>
          <h3 className="text-center mb-4 -mt-3 text-xl lg:text-3xl italic text-night font-thin">
            Building better future together
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 items-center">
          <div className="order-1 sm:order-none">
            <h3 className="text-xl md:text-3xl mb-1 uppercase font-bold tracking-tight text-night/90">
              Our Vision
            </h3>
            <p className="mb-2">
              ICS is by far the longest, professional, independent (not relying
              on government funding) event management company in First Nations
              Australia. We are proud of our heritage which when coupled with
              our unyielding drive and determination, we generally achieved and
              obtain the highest standard of professional event management
              service.
            </p>
            <p className="mb-2">
              The absolute core and soul of our company is our people and
              culture. We believe that the people who make up ICS have a
              commitment to First Nations affairs both through their work life
              and experiences. Over the years, we have built the most
              experienced Indigenous Conference Management team so much so that
              since opening our doors, we have clocked up an impressive array of
              events both within Australia and internationally.
            </p>
            <p>
              ICS has organized conferences up to 6,500 delegates, festivals up
              to 70,000 over two (2) days and thousands of smaller conferences
              and events. We offer community organizations a wide range of
              services from total event management to marketing, offering perks
              and free of charge services for sourcing conference venues amongst
              others.
            </p>
          </div>
          <ImageFrame
            img={IcsFounders}
            alt="Conferences Services Australia"
            position="50% 15%"
            bg="#EBC284"
          />
        </div>
      </div>
    </section>
  );
}

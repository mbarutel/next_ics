import React from "react";
import ImageFrame from "../common/ImageFrame";
import IcsImage from "@/public/assets/images/elders-conference.webp";
import GuideBox from "../common/Guidebox";

export default function OurValues() {
  return (
    <section>
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 items-center">
          <div className="order-1 sm:order-none">
            <h2 className="text-xl md:text-3xl mb-1 uppercase font-bold tracking-tight text-stone-600/70">
              Our Values
            </h2>
            <p className="mb-2">
              Our Koori CEO, Tom Callaghan, hails from Kempsey in Dunghutti
              country, NSW. ICS specializes in collaborating with NGOs and
              governments, organizing informative events fostering open
              discussion and Indigenous self-determination principles. We also
              support national associations in event development. Our
              successful, proven business model saves organizations time and
              resources, and we remain neutral and independent of political
              agendas to secure funding.
            </p>
            <p>
              We do not enter into government politics, nor were wishing to
              develop a profile that will interfere or cut across any community
              group’s philosophy or beliefs. Our sole aim is to bring together
              information that can be disseminated for the better good of
              Indigenous communities. It is our plan to be recognized as a
              network sharing tools and a provider of quality conferences and
              seminars that enhances local and government organization with
              quality speakers and training programs.
            </p>
          </div>
          <ImageFrame
            img={IcsImage}
            alt="Conferences Services Australia"
            position="50% 50%"
            bg="#5190e8"
          />
        </div>

        <GuideBox
          text="If you have any questions,"
          link="/contact"
          textLink="contact us"
        />
      </div>
    </section>
  );
}

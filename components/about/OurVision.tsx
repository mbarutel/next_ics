import React from "react";
import Image from "next/image";

export default function OurVision() {
  return (
    <section className="pt-8 lg:pt-12">
      <div className="container">
        <h2 className="section_header text-center text-orange-500">
          About ICS
        </h2>
        <h3 className="text-center mb-4 sm:mb-6 lg:mb-10 text-2xl sm:text-3xl italic text-orange-600 font-thin capitalize">
          Building better future together
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="xl:py-20">
            <span className="w-fit flex flex-col mb-4">
              <h3
                style={{ fontFamily: "Gabarito" }}
                className="w-fit text-3xl lg:text-4xl mb-1 uppercase font-bold tracking-tight text-orange-500/90"
              >
                Our Vision
              </h3>
              <span className="inline-flex h-1 bg-orange-500 w-3/4" />
            </span>
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
          <div className="relative h-full hidden sm:block">
            <span className="w-60 h-96 absolute top-0 right-0 bg-slate-600" />
            <div className="absolute bottom-0 left-0 h-[90%] w-[90%]">
              <div className="relative h-full">
                <Image
                  src="/assets/images/ics-founders.webp"
                  fill
                  alt="Indigenous Health Conference"
                  className="object-cover object-top"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

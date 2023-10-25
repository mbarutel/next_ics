import React from "react";
import Image from "next/image";

export default function OurVision() {
  return (
    <section className="pt-8 lg:pt-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="xl:py-20">
            <h3
              style={{ fontFamily: "Gabarito" }}
              className="w-fit text-3xl lg:text-4xl mb-4 uppercase font-bold tracking-tight text-orange-500/90"
            >
              Our Vision
            </h3>
            <p className="mb-2 text-justify">
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
          <div className="relative h-full hidden sm:block">
            <span className="w-60 h-96 absolute top-0 right-0 bg-slate-600 rounded-sm" />
            <div className="absolute bottom-0 left-0 h-[90%] w-[90%]">
              <div className="relative h-full">
                <Image
                  src="/assets/images/ics-founders.webp"
                  fill
                  alt="Indigenous Health Conference"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-top rounded-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

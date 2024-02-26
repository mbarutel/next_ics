import React from "react";
import Image from "next/image";
import SectionHeaderText from "./section-header-text";

export default function About() {
  return (
    <section className="section_margin">
      <div className="section_container">
        <div className="grid grid-cols-1 sm:grid-cols-2 justify-center items-end">
          <div className="relative h-full hidden sm:block">
            <span className="w-60 h-96 absolute top-0 left-0 bg-gradient-to-r gradient_secondary rounded-md" />
            <div className="absolute bottom-0 right-0 h-[90%] w-[90%]">
              <div className="relative h-full rounded-md overflow-hidden">
                <Image
                  src="/assets/images/ics_about.webp"
                  fill
                  priority={true}
                  alt="Indigenous Health Conference"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover image_hover"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col relative sm:pt-10 sm:pl-6 lg:pt-16">
            <SectionHeaderText>About ICS</SectionHeaderText>
            <h3 className="tracking-tight text-lg md:text-xl uppercase font-semibold">
              Indigenous Conference Services
            </h3>
            <p className="mb-3 sm:mb-6 mt-1 sm:mt-4 text-justify">
              ICS, an Indigenous-owned enterprise committed to closing the gap
              in Indigenous health and well-being, operates independently and
              without government funding. Our mission centers on prioritizing
              First Nations culture and self-determination. With our highly
              skilled team, we expertly manage a diverse array of events for
              community organizations, with a specific focus on promoting
              Indigenous identity, education, and partnerships. One of our key
              strategies for advancing Indigenous health is through funding
              conferences via strategic partnerships, allowing us to steer clear
              of government funding while fostering agenda customization.

              Tom Callaghan, our dedicated CEO, specializes in collaborating
              with NGOs and governments to promote Indigenous health and
              well-being. Our conferences play a pivotal role in facilitating
              positive information sharing, fostering cooperation, and driving
              discussions that underscore the importance of face-to-face
              networking for empowerment and the enhancement of Indigenous
              health and community development.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

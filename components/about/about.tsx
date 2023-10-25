import Link from "next/link";
import React from "react";
import Image from "next/image";

export default function About() {
  return (
    <section className="pt-8 lg:pt-12">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 justify-center items-end">
          <div className="relative h-full hidden sm:block">
            <span className="w-60 h-96 absolute top-0 left-0 bg-slate-600 rounded-sm" />
            <div className="absolute bottom-0 right-0 h-[90%] w-[90%]">
              <div className="relative h-full overflow-hidden">
                <Image
                  src="/assets/images/about-img.webp"
                  fill
                  priority={true}
                  alt="Indigenous Health Conference"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover rounded-l-sm rounded-tr-sm hover:scale-110 transition-all duration-500"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col relative sm:pt-10 lg:pt-16">
            <h2 className="sm:ml-6 section_header text-orange-500">
              About ICS
            </h2>
            <h3 className="sm:ml-6 tracking-tight text-lg md:text-xl uppercase text-slate-800/80 mb-1 sm:mb-4 lg:mb-6">
              Indigenous Conference Services
            </h3>
            <p className="sm:ml-6 mb-3 sm:mb-6 text-justify">
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

            <Link
              href="/conferences"
              className="relative inline-flex group button_padding bg-orange-500 text-sm sm:text-base transition-all active:scale-95 w-fit text-white rounded-r-md overflow-hidden"
            >
              <span className="z-10">
                View Conferences
              </span>
              <span className="absolute h-full w-0 left-0 bottom-0 group-hover:w-full bg-slate-950 transition-all ease-in-out z-0" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

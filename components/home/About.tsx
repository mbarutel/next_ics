import Link from "next/link";
import React from "react";
import IcsImage from "@/public/assets/images/about-img.webp";
import ImageFrame from "../common/ImageFrame";

export default function About() {
  return (
    <section>
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div className="flex flex-col justify-center order-1 sm:order-none relative sm:ml-3 pt-2">
            <h2 className="section_header text-amber-800 text-center sm:text-left">
              About ICS
            </h2>
            <h3 className="-mt-2 tracking-tight text-lg md:text-xl uppercase text-stone-500 text-center sm:text-left mb-2">
              Indigenous Conference Services
            </h3>
            <p className="mb-6">
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

            <div>
              <Link
                href="/about"
                className="group relative inline-flex border border-red-800/80 focus:outline-none w-auto"
              >
                <span className="w-full inline-flex items-center justify-center self-stretch px-4 py-2 text-sm text-white text-center font-bold uppercase bg-red-800/90 ring-1 ring-red-800/80 ring-offset-1 ring-offset-red-800/80 transform transition-transform group-hover:translate-y-1 group-hover:translate-x-1 group-focus:translate-y-1 group-focus:translate-x-1 group-active:translate-y-0 group-active:translate-x-0">
                  Read More
                </span>
              </Link>
            </div>
          </div>
          <ImageFrame
            img={IcsImage}
            alt="Indigenous Health Conference"
            position="50% 20%"
            bg="#A4343A"
          />
        </div>
      </div>
    </section>
  );
}

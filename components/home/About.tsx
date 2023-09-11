import Link from "next/link";
import React from "react";
import IcsImage from "@/public/assets/images/about-img.webp";
import ImageFrame from "../common/ImageFrame";

export default function About() {
  return (
    <section>
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div className="flex flex-col justify-center order-1 sm:order-none relative sm:ml-3">
            <h2 className="section_header text-night text-center sm:text-left">
              About ICS
            </h2>
            <h3 className="-mt-2 tracking-tight text-lg md:text-xl uppercase text-chili text-center sm:text-left mb-2">
              Indigenous Conference Services
            </h3>
            <p className="mb-6 sm:mb-12 text-night">
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
              href="/"
              className="btn w-fit"
            >
              Read More
            </Link>
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

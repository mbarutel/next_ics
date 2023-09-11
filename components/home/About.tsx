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
            <h2 className="section_header text-blue-400/80 text-center sm:text-left">
              About ICS
            </h2>
            <h3 className="-mt-2 tracking-tight text-lg md:text-xl uppercase text-chili text-center sm:text-left mb-2">
              Indigenous Conference Services
            </h3>
            <p className="mb-6 sm:mb-12 text-night">
              ICS is an Indigenous-owned company operating independently and
              without government funding. They prioritize First Nations culture
              and self-determination. With a skilled team, they manage various
              events for community organizations, focusing on promoting
              Indigenous identity, education, and partnerships. By funding
              conferences through partnerships, they avoid government funding
              and support agenda customization.

              CEO Tom Callaghan specializes in working with NGOs and
              governments. Their conferences facilitate positive information
              sharing, cooperation, and discussions, emphasizing face-to-face
              networking for empowerment and community enhancement.
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
            alt="random-alt"
            position="50% 20%"
            bg="#A4343A"
          />
        </div>
      </div>
    </section>
  );
}

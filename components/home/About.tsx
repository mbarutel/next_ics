import Link from "next/link";
import React from "react";
import DefaultImage from "@/public/assets/images/default-cover-image.webp";
import ImageFrame from "../common/ImageFrame";

export default function About() {
  return (
    <section>
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2">
          <div className="my-auto">
            <h2>About ICS</h2>
            <h3>Indigenous Conference Services</h3>
            <p className="pb-5">
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
              className="btn bg-light_gray text-white font-medium mt-10"
            >
              Read More
            </Link>
          </div>
          <ImageFrame
            img={DefaultImage}
            alt="random-alt"
            position="50% 50%"
            bg="rgba(255, 222, 61, 1)"
          />
        </div>
      </div>
    </section>
  );
}

import React from "react";
import ImageFrame from "../common/ImageFrame";
import IcsImage from "@/public/assets/images/indigenous-conference-exhibits.webp";

export default function OurPurpose() {
  return (
    <section>
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 items-center">
          <ImageFrame
            img={IcsImage}
            alt="closing the gap"
            position="50% 50%"
            bg="#bd4a3d"
          />
          <div>
            <h2 className="text-xl md:text-3xl mb-1 uppercase font-bold tracking-tight text-amber-800/90 md:text-right">
              Our Purpose
            </h2>
            <p className="mb-2">
              At ICS, we are unwavering in our belief that education serves as a
              powerful catalyst for driving positive change. Our dedicated
              mission revolves around advancing Indigenous health and
              independence while actively contributing to closing the gap
              through private enterprise and strategic partnerships. We
              specialize in funding conferences in close collaboration with
              community organizations, liberating them from the need for
              government funding and enabling them to address the specific
              issues critical to their mission. Every conference organized by
              ICS places a paramount emphasis on public interest and steadfastly
              upholds grassroots principles, furthering the cause of Indigenous
              health.
            </p>
            <p>
              At the heart of our company lies our profound commitment to our
              people and Indigenous culture. The ICS team is deeply immersed in
              First Nations affairs, both professionally and personally,
              embodying our passion for this cause. Over the years, we have
              cultivated a seasoned Indigenous Conference Management team with a
              rich history of organizing numerous events, spanning from intimate
              conferences to expansive festivals, both in Australia and
              internationally. Our comprehensive event services encompass every
              facet, including marketing and complimentary venue sourcing, all
              aimed at providing robust support to our valued community
              organizations in their pursuit of advancing Indigenous health and
              independence.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

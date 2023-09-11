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
            alt="Conferences Services Australia"
            position="50% 50%"
            bg="#bd4a3d"
          />
          <div>
            <h2 className="text-xl md:text-3xl mb-1 uppercase font-bold tracking-tight text-night/90 md:text-right">
              Our Purpose
            </h2>
            <p className="mb-2">
              We strongly believe in education as a catalyst for positive change
              and are dedicated to advancing Indigenous independence through
              private enterprise and partnerships. ICS funds conferences in
              collaboration with community organizations, freeing them from
              seeking government funding, and allows them to address specific
              issues important to their mission. All ICS events prioritize
              public interest and uphold grassroots principles.
            </p>
            <p>
              Our company's essence lies in our people and culture. We believe
              our team at ICS is deeply committed to First Nations affairs in
              both their work and personal lives. Over the years, we've built an
              experienced Indigenous Conference Management team, organizing
              numerous events in Australia and abroad, ranging from small
              conferences to large festivals. We offer comprehensive event
              services, including marketing and free venue sourcing, to support
              community organizations.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

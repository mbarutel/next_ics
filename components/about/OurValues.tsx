import React from "react";
import ImageFrame from "../common/ImageFrame";
import IcsImage from "@/public/assets/images/default-cover-image.webp";

export default function OurValues() {
  return (
    <section>
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 items-center">
          <div className="order-1 sm:order-none">
            <h2 className="text-xl md:text-3xl mb-1 uppercase font-bold tracking-tight text-amber-800/90">
              Our Values
            </h2>
            <p className="mb-2">
              Our Koori CEO, Tom Callaghan, proudly hails from Kempsey in
              Dunghutti country, New South Wales, and is deeply committed to the
              cause of closing the gap in Indigenous health. At ICS, we
              specialize in collaborating with NGOs and governments,
              orchestrating insightful conferences that foster open discussions
              and align with Indigenous self-determination principles.
              Additionally, we provide vital support to national associations in
              the development of impactful events. Our well-established and
              successful business model not only streamlines the process for
              organizations but also conserves valuable time and resources. It's
              worth noting that we maintain a steadfast commitment to neutrality
              and independence from political agendas, ensuring secure funding
              for our initiatives aimed at advancing Indigenous health.
            </p>
            <p>
              We refrain from involvement in government politics, with no desire
              to establish a profile that could disrupt or conflict with any
              community group's philosophies or beliefs. Our exclusive goal is
              to bring together valuable information that can be disseminated
              for the greater benefit of Indigenous communities. We are
              determined to establish ourselves as a recognized network sharing
              essential tools and as a provider of top-tier conferences and
              seminars, enriching both local and government organizations with
              access to quality speakers and training programs dedicated to
              advancing Indigenous health and closing the gap.
            </p>
          </div>
          <ImageFrame
            img={IcsImage}
            alt="Indigenous Health"
            position="50% 50%"
            bg="#5190e8"
          />
        </div>
      </div>
    </section>
  );
}

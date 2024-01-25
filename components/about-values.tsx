import React from "react";
import Image from "next/image";

export default function AboutValues() {
  return (
    <section className="section_margin">
      <div className="section_container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="xl:py-20">
            <h3 className="section_header">
              Our Values
            </h3>
            <p className="mt-1 sm:mt-4 mb-2 text-justify">
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
            <p className="text-justify">
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
          <div className="relative h-full hidden sm:block">
            <span className="w-60 h-96 absolute bottom-0 right-0 bg-gradient-to-l gradient_secondary rounded-md" />
            <div className="absolute top-0 left-0 h-[90%] w-[90%]">
              <div className="relative h-full rounded-md overflow-hidden">
                <Image
                  src="/assets/images/aboriginal-art.webp"
                  fill
                  alt="Indigenous Health Conference"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover rounded-sm hover:scale-110 transition-all duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

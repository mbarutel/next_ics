import React from "react";
import Image from "next/image";
import SectionHeaderText from "./section-header-text";
import Link from "next/link";

export default function MeetTheTeam() {
  return (
    <section className="section_margin">
      <div className="section_container grid grid-cols-1 md:grid-cols-2 gap-7 justify-center items-center">
        <div>
          <SectionHeaderText>Meet the Team</SectionHeaderText>
          <p className="my-4">
            Meet the faces behind the success of ICS - a professional team
            dedicated to organizing conferences. We are a highly skilled team
            capable of expertly managing a diverse range of events for community
            organizations.
          </p>
          <Link href="/about" className="underline">
            Learn more about us
          </Link>
        </div>
        <div className="p-2">
          <div className="relative h-[350px] sm:h-[400px] xl:h-[450px] w-full bg-gradient-to-tr gradient_secondary -translate-x-2 translate-y-2 rounded-md">
            <Image
              fill
              quality={100}
              alt="Australian Conferences"
              src="/assets/images/meet-the-team.webp"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover translate-x-4 -translate-y-4 saturate-150 rounded-md"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

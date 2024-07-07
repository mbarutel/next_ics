import { SponsorType } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

type ConferenceSponsorsProps = {
  sponsors: SponsorType[];
};

export default function ConferenceSponsors({
  sponsors,
}: ConferenceSponsorsProps) {
  if (sponsors.length === 0) {
    return null;
  }

  return (
    <section className="section_padding">
      <div className="section_container flex gap-3 md:gap-5 flex-wrap justify-center">
        {sponsors.map((sponsor, index) => (
          <Link
            key={index}
            rel="noreferrer"
            target="_blank"
            href={sponsor.link}
            className="relative rounded-md overflow-hidden w-96 h-24 lg:h-40 active:scale-95 transition-transform duration-300 ease-in-out"
          >
            <Image
              fill
              src={sponsor.logo.src}
              alt={sponsor.logo.alt}
              className="object-contain"
            />
          </Link>
        ))}
      </div>
    </section>
  );
}

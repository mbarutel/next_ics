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
            className="rounded-md overflow-hidden"
          >
            <Image
              src={sponsor.logo.src}
              alt={sponsor.logo.alt}
              width={600}
              height={200}
            />
          </Link>
        ))}
      </div>
    </section>
  );
}

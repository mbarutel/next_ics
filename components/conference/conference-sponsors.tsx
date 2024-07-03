import { AssetType } from "@/lib/types";
import Image from "next/image";

type ConferenceSponsorsProps = {
  sponsors: AssetType[];
};

export default function ConferenceSponsors({
  sponsors,
}: ConferenceSponsorsProps) {
  if (sponsors.length === 0) {
    return null;
  }

  return (
    <section className="section_padding">
      <div className="section_container flex gap-3 md:gap-5 lg:gap-12 flex-wrap justify-center">
        {sponsors.map((image, index) => (
          <div
            key={index}
            className="relative w-36 h-16 sm:w-44 sm:h-24 md:w-60 md:h-32 lg:w-96 lg:h-40"
          >
            <Image
              fill
              src={image.src}
              alt={image.alt}
              className="object-contain"
            />
          </div>
        ))}
      </div>
    </section>
  );
}

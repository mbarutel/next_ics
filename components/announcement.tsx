import Image from "next/image";
import React from "react";

export default function Announcement() {
  return (
    <section>
      <div className="section_container mt-1 lg:mt-2">
        <div className="relative h-6 md:h-8 lg:h-10 xl:h-12">
          <Image
            src="/assets/images/art-bg.svg"
            alt="divider"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover opacity-40 grayscale sm:rounded-md"
          />
        </div>
      </div>
    </section>
  );
}

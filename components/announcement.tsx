import Image from "next/image";
import React from "react";

export default function Announcement() {
  return (
    <section>
      <div className="container relative w-full h-12 my-3 rounded-lg overflow-hidden">
        <Image
          src="/assets/images/art-bg.svg"
          alt="divider"
          fill
          className="object-cover opacity-40 grayscale"
        />
      </div>
    </section>
  );
}

import Link from "next/link";
import React from "react";

export default function InstagramBanner() {
  return (
    <section>
      <div className="container flex_col justify-center items-center">
        <div className="w-1/3 h-2 bg-gradient-to-r gradient rounded-sm" />
        <div className="arvo sm:text-xl md:text-3xl py-1 lg:py-4 text-center">
          Follow{" "}
          <Link
            href="https://www.instagram.com/ics_conferences/"
            target="_blank"
            rel="noreferrer"
            className="text-yellow-400"
          >
            @ics_conferences
          </Link>{" "}
          on Instagram
        </div>
        <div className="w-1/3 h-2 bg-gradient-to-r gradient rounded-sm" />
      </div>
    </section>
  );
}

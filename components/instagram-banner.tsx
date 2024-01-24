import Link from "next/link";
import React from "react";

export default function InstagramBanner() {
  return (
    <section>
      <div className="section_container flex_col justify-center items-center py-4 lg:py-6">
        <div className="w-32 h-3 bg-gradient-to-r gradient rounded-sm" />
        <div className="text-xl md:text-3xl py-2 lg:py-4 text-center">
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
        <div className="w-32 h-3 bg-gradient-to-r gradient rounded-sm" />
      </div>
    </section>
  );
}

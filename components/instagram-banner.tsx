import Link from "next/link";
import React from "react";

export default function InstagramBanner() {
  return (
    <section>
      <div className="section_container flex_col justify-center items-center xl:h-36">
        <div className="w-40 h-3 bg-white rounded-sm" />
        <div className="text-3xl xl:py-6">
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
        <div className="w-40 h-3 bg-white rounded-sm" />
      </div>
    </section>
  );
}

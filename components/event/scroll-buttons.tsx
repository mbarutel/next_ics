"use client";

import { useActiveSectionContext } from "@/context/active-section-context";
import { eventLinks } from "@/lib/data";
import Link from "next/link";
import React, { Fragment } from "react";
import { BiSolidSquareRounded, BiSquareRounded } from "react-icons/bi";

export default function ScrollBottons() {
  const { activeSection, setActiveSection, setTimeOfLastClick } =
    useActiveSectionContext();

  console.log(activeSection);

  return (
    <div className="sticky h-fit top-1/3 right-2 z-[899] flex flex-col rounded-md bg-white/80 backdrop-blur-[0.5rem] px-1 gap-3 py-2">
      {eventLinks.map((link) => (
        <Fragment key={link.hash}>
          <Link
            href={link.hash}
            onClick={() => {
              setTimeOfLastClick(Date.now());
              setActiveSection(link.name);
            }}
            className="text-base md:text-lg transition-all ease-in-out text-orange-500/80"
          >
            {activeSection === link.name
              ? <BiSolidSquareRounded />
              : <BiSquareRounded />}
          </Link>
        </Fragment>
      ))}
    </div>
  );
}

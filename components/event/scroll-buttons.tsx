"use client";

import { useActiveSectionContext } from "@/context/active-section-context";
import { eventLinks } from "@/lib/data";
import clsx from "clsx";
import Link from "next/link";
import React, { Fragment } from "react";
import { BiSolidCircle } from "react-icons/bi";

export default function ScrollBottons() {
  const { activeSection, setActiveSection, setTimeOfLastClick } =
    useActiveSectionContext();

  console.log(activeSection);

  return (
    <div className="sticky h-fit top-20 right-2 z-[899] flex flex-col rounded-md bg-white/80 backdrop-blur-[0.5rem] px-1 gap-3 border py-2">
      {eventLinks.map((link) => (
        <Fragment key={link.hash}>
          <Link
            href={link.hash}
            onClick={() => {
              setTimeOfLastClick(Date.now());
              setActiveSection(link.name);
            }}
            className={clsx("text-base md:text-lg transition-all ease-in-out", {
              "text-orange-500": activeSection === link.name,
              "text-slate-800/80": activeSection !== link.name,
            })}
          >
            <BiSolidCircle />
          </Link>
        </Fragment>
      ))}
    </div>
  );
}

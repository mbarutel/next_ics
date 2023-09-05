import Link from "next/link";
import React from "react";
import { BiSolidDownArrow } from "react-icons/bi";

export default function Header() {
  return (
    <header className="relative h-[40vh] sm:h-[50vh] flex items-center justify-center bg-gradient-to-b from-stone-400/80 to-neutral-50/10">
      <HeaderBox />
      <GetStarted />
    </header>
  );
}

function HeaderBox() {
  return (
    <div className="text-center">
      <div className="bg-gradient-to-t from-yellow-400/70 to-neutral-50/10 pb-2 pt-6 sm:py-7 rounded-xl mb-5 px-4">
        <h1 className="text-[1.1rem] sm:text-4xl font-black tracking-wide uppercase text-stone-600">
          Indigenous Conference Services
        </h1>
        <p className="text-[0.7rem] sm:text-xl uppercase text-stone-400 !text-center">
          The impossible is the next step for our journey
        </p>
      </div>
      <Link
        href="/"
        target="_blank"
        rel="noreferrer"
        className="btn effects bg-stone-600 text-white/90"
      >
        Register
      </Link>
      <Link
        href="/"
        target="_blank"
        rel="noreferrer"
        className="btn effects text-stone-500/80"
      >
        Submit a paper
      </Link>
    </div>
  );
}

function GetStarted() {
  return (
    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex flex-col items-center group effects text-[0.7rem] sm:text-lg w-full">
      <a href="#conferences" className="text-stone-600/80">
        To get started, check the information below
      </a>
      <BiSolidDownArrow className="text-stone-600/60 group-hover:translate-y-[2px] transition-all" />
    </div>
  );
}

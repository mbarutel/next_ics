import Link from "next/link";
import React from "react";
import { BiSolidDownArrow } from "react-icons/bi";

export default function Header() {
  return (
    <header className="relative h-[700px] w-full">
      <HeaderBox />
      <GetStarted />
    </header>
  );
}

function HeaderBox() {
  return (
    <div className="text-center w-max absolute top-1/2 left-1/2 -translate-x-1/2">
      <div className="bg-gradient-to-t from-yellow-400/70 to-neutral-50 py-7 px-10 rounded-xl mb-5">
        <h1 className="text-3xl sm:text-4xl font-black tracking-wide uppercase text-stone-500">
          Indigenous Conference Services
        </h1>
        <p className="text-xl sm:text-3xl uppercase text-stone-400">
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
        className="btn effects text-stone-500/70"
      >
        Submit a paper
      </Link>
    </div>
  );
}

function GetStarted() {
  return (
    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex flex-col items-center group effects">
      <a href="/" className="text-stone-600">
        To get started, check the information below
      </a>
      <BiSolidDownArrow className="text-stone-600/60 group-hover:translate-y-[2px] transition-all" />
    </div>
  );
}

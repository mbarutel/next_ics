import Link from "next/link";
import React from "react";
import { BiSolidDownArrow } from "react-icons/bi";

export default function Header() {
  return (
    <header className="relative h-[700px]">
      <HeaderBox />
      <GetStarted />
    </header>
  );
}

function HeaderBox() {
  return (
    <div className="text-center w-max absolute top-1/2 left-1/2 -translate-x-1/2">
      <div className="bg-gradient-to-t from-yellow-400/70 to-neutral-50 py-7 px-10 rounded-xl mb-5">
        <h1 className="text-4xl font-black tracking-wide uppercase text-stone-500">
          Indigenous Conference Services
        </h1>
        <p className="text-2xl uppercase text-stone-400">
          The impossible is the next step for our journey
        </p>
      </div>
      <Link
        href="/"
        target="_blank"
        rel="noreferrer"
        className="btn bg-stone-600 text-white/90"
      >
        Register
      </Link>
      <Link
        href="/"
        target="_blank"
        rel="noreferrer"
        className="btn text-stone-500/70"
      >
        Submit a paper
      </Link>
    </div>
  );
}

function GetStarted() {
  return (
    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex flex-col items-center">
      <a href="/">
        To get started, check the information below
      </a>
      <BiSolidDownArrow />
    </div>
  );
}

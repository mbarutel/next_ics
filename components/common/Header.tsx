import { configs } from "@/lib/data";
import Link from "next/link";
import React from "react";
import { BiSolidDownArrow } from "react-icons/bi";

type HeaderProps = {
  link: string;
  text: string;
};
export default function Header({ link, text }: HeaderProps) {
  return (
    <header className="relative h-[25rem] sm:h-[40rem] lg:h-[50rem] flex items-center justify-center bg-gradient-to-b from-night to-hibiscus">
      <HeaderBox />
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center group text-[0.7rem] sm:text-[1.1rem] w-full text-indian transition-all hover:scale-[1.05] active:scale-[1.02]">
        <a
          href={link}
          className="uppercase font-thin font-mono"
        >
          {text}
        </a>
        <BiSolidDownArrow className="group-hover:translate-y-[2px] text-xl transition-all -mt-[2px]" />
      </div>
    </header>
  );
}

function HeaderBox() {
  return (
    <div className="text-center">
      <div className="bg-elden/80 shadow-lg rounded-xl mb-3 px-3 sm:px-5 lg:px-6 py-2 sm:py-3 lg:py-5">
        <h1 className="text-[0.9rem] sm:text-3xl lg:text-4xl font-black tracking-wide uppercase text-indian drop-shadow-lg">
          Indigenous Conference&nbsp;Services
        </h1>
        <p className="text-[0.7rem] sm:text-xl lg:text-2xl uppercase text-night !text-center">
          The impossible is the next step for our journey
        </p>
      </div>
      <div className="flex gap-4 justify-center">
        <Link
          href={configs.forms.registration}
          target="_blank"
          rel="noreferrer"
          className="px-4 py-2 bg-night sm:text-lg rounded-xl shadow-xl transition-all hover:-translate-y-[2px] focus:-translate-y-1 active:translate-y-1 text-indian uppercase font-mono"
        >
          Register
        </Link>
        <Link
          href={configs.forms.submitPaper}
          target="_blank"
          rel="noreferrer"
          className="px-4 py-2 bg-night sm:text-lg rounded-xl shadow-xl transition-all hover:-translate-y-[2px] focus:-translate-y-1 active:translate-y-1 text-indian uppercase font-mono"
        >
          Submit a paper
        </Link>
      </div>
    </div>
  );
}

import { configs } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BiSolidDownArrow } from "react-icons/bi";

type HeaderProps = {
  link: string;
  text: string;
};

export default function Header({ link, text }: HeaderProps) {
  return (
    <header className="relative h-[25rem] sm:h-[30rem] lg:h-[40rem] flex items-center justify-center">
      <Image
        src="/assets/images/header.webp"
        alt="Indigenous Health Conference Services"
        fill
        className="contrast-[0.9] object-cover"
      />
      <HeaderBox />
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex flex-col items-center group text-[0.7rem] sm:text-[1rem] text-white/90 w-[90%] effects">
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
    <div className="flex flex-col bg-gradient-to-b from-stone-950/90 to-red-950/90 px-2 py-6 sm:py-8 z-[99] text-white rounded-tr-xl rounded-bl-xl w-[min(90%,40rem)]">
      <div className="mb-4 sm:mb-6">
        <h1 className="text-center text-white text-[1.6rem] sm:text-3xl font-black uppercase tracking-wider leading-tight mb-1 drop-shadow-xs">
          Indigenous Conference Services
        </h1>
        <p className="text-center text-yellow-200/70 text-[0.8rem] sm:text-lg uppercase font-semibold">
          The impossible is the next step for our journey
        </p>
      </div>
      <div className="max-w-lg mx-auto flex justify-center items-center gap-4">
        <Link
          href={configs.forms.registration}
          target="_blank"
          rel="noreferrer"
          className="group relative inline-flex border border-orange-500 focus:outline-none w-full sm:w-auto"
        >
          <span className="w-full inline-flex items-center justify-center self-stretch px-4 py-2 text-sm text-white text-center font-bold uppercase bg-orange-500 ring-1 ring-orange-500 ring-offset-1 ring-offset-orange-500 transform transition-transform group-hover:-translate-y-1 group-hover:-translate-x-1 group-focus:-translate-y-1 group-focus:-translate-x-1 group-active:translate-y-0 group-active:translate-x-0">
            Register
          </span>
        </Link>
        <Link
          className="group relative inline-flex border border-orange-500 focus:outline-none w-full sm:w-auto"
          href={configs.forms.submitPaper}
          target="_blank"
          rel="noreferrer"
        >
          <span className="w-full inline-flex items-center justify-center self-stretch px-4 py-2 text-sm text-white text-center font-bold uppercase bg-transparent ring-1 ring-orange-500 ring-offset-1 ring-offset-orange-500 transform transition-transform group-hover:-translate-y-1 group-hover:-translate-x-1 group-focus:-translate-y-1 group-focus:-translate-x-1 group-active:translate-y-0 group-active:translate-x-0">
            Submit&nbsp;a&nbsp;paper
          </span>
        </Link>
      </div>
    </div>
  );
}

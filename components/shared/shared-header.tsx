import React from "react";
import Link from "next/link";
import { BsChevronDown } from "react-icons/bs";

type HeaderProp = {
  title: string;
  subtitle: string;
  anchor: string;
};
export default function SharedHeader({ prop }: { prop: HeaderProp }) {
  return (
    <header className="bg-yellow-400">
      <div className="section_container header_height relative text-stone-900 flex_col justify-center text-center">
        <h1 className="uppercase drop-shadow font-extrabold leading-tight text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl">
          {prop.title}
        </h1>
        <p className="italic drop_shadow mt-2 text-sm sm:text-lg">
          {prop.subtitle}
        </p>
        <Link
          href={prop.anchor}
          className="absolute bottom-5 left-1/2 -translate-x-1/2 text-5xl"
        >
          <BsChevronDown className="animate-bounce ease-in-out" />
        </Link>
      </div>
    </header>
  );
}

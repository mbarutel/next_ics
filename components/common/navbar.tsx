"use client";

import React, { useState } from "react";
import { links } from "@/lib/data";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNav = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="fixed w-full top-0 left-0 z-[999] bg-stone-200">
      <div className="container h-16 flex justify-between items-center">
        <Link
          href="/"
          className="flex items-center h-full gap-1 sm:gap-2 transition-all active:scale-95"
        >
          <span className="relative w-10 sm:w-12 h-full">
            <Image
              src="/assets/images/logo.svg"
              alt="Indigenous Health Conferences"
              fill
              quality={100}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-contain"
            />
          </span>
          <span
            style={{ fontFamily: "Bungee Shade" }}
            className="flex flex-col text-xl sm:text-3xl text-slate-700"
          >
            ICS
          </span>
        </Link>
        <button
          onClick={handleNav}
          className="sm:hidden cursor-pointer flex items-center"
        >
          <AiOutlineMenu size={25} />
        </button>
        <ul className="hidden md:flex items-center">
          {links.map((link) => (
            <li
              key={link.name}
              className="relative px-4 py-3 group last:bg-orange-500 text-slate-800 last:text-white active:scale-95 rounded-md"
            >
              <Link
                href={link.path}
                className="inline-flex"
              >
                <span className="z-10">
                  {link.name}
                </span>
                <span className="absolute h-1 group-last:h-full w-0 left-0 bottom-0 group-hover:w-full bg-orange-500 group-last:bg-slate-900 transition-all ease-in-out z-0 rounded-md" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div
        className={menuOpen
          ? "fixed left-0 top-0 w-[65%] sm:hidden h-screen p-10 ease-in duration-500 bg-stone-200 z-[999]"
          : "fixed left-[-100%] top-0 p-10 ease-out duration-500"}
      >
        <div className="flex w-full items-center justify-end">
          <div onClick={handleNav} className="cursor-pointer">
            <AiOutlineClose size={25} />
          </div>
        </div>
        <ul className="flex flex-col gap-1">
          {links.map((item, index) => (
            <li
              key={index}
              onClick={() => setMenuOpen(!menuOpen)}
              className="cursor-pointer"
            >
              <Link
                href={item.path}
                className="text-lg uppercase"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

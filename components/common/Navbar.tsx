"use client";

import React, { useState } from "react";
import { links } from "@/lib/data";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import Logo from "@/public/assets/images/logo.png";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNav = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="w-full sm:px-6 bg-white/50 backdrop-blur-md fixed top-0 z-[999]">
      <div className="relative container py-2">
        <nav className="relative flex items-center justify-between sm:h-10 md:justify-center">
          <div className="flex items-center flex-1 md:absolute md:inset-y-0 md:left-0">
            <div className="flex items-center justify-between w-full md:w-auto">
              <Link href="/" className="-my-3 sm:my-0">
                <Image
                  src={Logo}
                  width={60}
                  height={60}
                  quality={100}
                  className="object-cover h-16 w-16"
                  alt="Indigenous Health Conferences"
                />
              </Link>
              <div
                onClick={handleNav}
                className="sm:hidden cursor-pointer flex items-center -mr-2"
              >
                <AiOutlineMenu size={25} />
              </div>
            </div>
          </div>

          <div
            className={menuOpen
              ? "fixed left-0 top-0 w-[65%] sm:hidden h-screen bg-[#ecf0f3] p-10 ease-in duration-500"
              : "fixed left-[-100%] top-0 p-10 ease-out duration-500"}
          >
            <div className="flex w-full items-center justify-end">
              <div onClick={handleNav} className="cursor-pointer">
                <AiOutlineClose size={25} />
              </div>
            </div>
            <div className="flex-col py-4">
              <ul>
                {links.map((item, index) => (
                  <li
                    key={index}
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="py-2 cursor-pointer"
                  >
                    <Link
                      href={item.path}
                      className="text-xl font-semibold uppercase text-night/80"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="hidden md:flex md:space-x-10 list-none">
            <li className="active:scale-95">
              <Link
                href="/"
                className="text-base font-normal text-stone-500 list-none hover:text-red-800 transition uppercase group"
                target=""
              >
                Home
                <div className="grid grid-cols-2 h-[2px]">
                  <span className="relative">
                    <span className="absolute right-0 h-full w-0 group-hover:w-full bg-red-800 transition-all">
                    </span>
                  </span>
                  <span className="relative">
                    <span className="absolute left-0 h-full w-0 group-hover:w-full bg-red-800 transition-all">
                    </span>
                  </span>
                </div>
              </Link>
            </li>
            <li className="active:scale-95">
              <Link
                href="/about"
                className="text-base font-normal text-stone-500 list-none hover:text-red-800 transition uppercase group"
              >
                About
                <div className="grid grid-cols-2 h-[2px]">
                  <span className="relative">
                    <span className="absolute right-0 h-full w-0 group-hover:w-full bg-red-800 transition-all">
                    </span>
                  </span>
                  <span className="relative">
                    <span className="absolute left-0 h-full w-0 group-hover:w-full bg-red-800 transition-all">
                    </span>
                  </span>
                </div>
              </Link>
            </li>
            <li className="active:scale-95">
              <Link
                href="/conferences"
                className="text-base font-normal text-stone-500 list-none hover:text-red-800 transition uppercase group"
              >
                Conferences
                <div className="grid grid-cols-2 h-[2px]">
                  <span className="relative">
                    <span className="absolute right-0 h-full w-0 group-hover:w-full bg-red-800 transition-all">
                    </span>
                  </span>
                  <span className="relative">
                    <span className="absolute left-0 h-full w-0 group-hover:w-full bg-red-800 transition-all">
                    </span>
                  </span>
                </div>
              </Link>
            </li>
          </div>
          <div className="hidden md:absolute md:flex md:items-center md:justify-end md:inset-y-0 md:right-0">
            <div className="inline-flex rounded-md shadow transition-all bg-gradient-to-b hover:bg-gradient-to-t from-stone-950/90 to-red-950/90 active:scale-95">
              <Link
                href="/contact"
                className="inline-flex items-center px-4 py-2 text-base text-white border border-transparent cursor-pointer font-base uppercase"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}

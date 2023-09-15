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
    <nav className="fixed top-0 z-[999] w-screen bg-dove">
      <div className="flex items-center justify-between w-[min(100%,70rem)] h-12 sm:h-16 mx-auto">
        <Link href="/">
          <Image
            src={Logo}
            width={60}
            height={60}
            quality={90}
            className="object-contain h-16 w-16"
            alt="Indigenous Health Conferences"
          />
        </Link>
        <ul className="hidden sm:flex items-center justify-center gap-2 text-lg lg:text-xl pr-2 font-semibold tracking-wider capitalize">
          {links.map((link) => (
            <li key={link.name} className="border-solid border-r-2 border-night/70 first:border-l-2">
              <Link
                href={link.path}
                className="flex text-night transition-all hover:-translate-y-1 active:scale-105 px-2"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
        <div
          onClick={handleNav}
          className="sm:hidden cursor-pointer h-full flex items-center px-3 text-night"
        >
          <AiOutlineMenu size={25} />
        </div>
        <div
          className={menuOpen
            ? "fixed left-0 top-0 w-[65%] sm:hidden h-screen bg-[#ecf0f3] p-10 ease-in duration-500 z-20"
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
      </div>
    </nav>
  );
}

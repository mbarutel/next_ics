"use client";

import React, { useState } from "react";
import { links } from "@/lib/data";
import Link from "next/link";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNav = () => {
    setMenuOpen(!menuOpen);
  };
  return (
    <nav className="flex fixed top-0 justify-end sm:justify-center h-12 sm:h-16 z-[999] w-screen bg-white/80">
      <ul className="hidden sm:flex items-center justify-center gap-6 text-xl font-semibold uppercase text-gray-700/50">
        {links.map((link) => (
          <li
            key={link.name}
          >
            <Link
              href={link.path}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
      <div
        onClick={handleNav}
        className="sm:hidden cursor-pointer h-full flex items-center px-3 text-stone-700/50"
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
                  className="text-xl font-semibold uppercase text-gray-700/50"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

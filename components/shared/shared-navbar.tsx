"use client";

import Link from "next/link";
import Image from "next/image";
import { links } from "@/lib/data";
import React, { useState } from "react";
import { a, useSpring } from "@react-spring/web";
import { GiHamburgerMenu } from "react-icons/gi";

export default function SharedNavbar() {
  const [mobileNavOpen, setMobileNavOpen] = useState<boolean>(false);

  const dropdownAnimation = useSpring({
    transform: mobileNavOpen ? "translateX(0)" : "translateX(-100%)",
    opacity: mobileNavOpen ? 1 : 0,
  });

  return (
    <>
      <div />
      <nav className="sticky w-full top-0 z-[99] py-2 bg-stone-900">
        <div className="section_container !overflow-visible">
          {/* Medium Upwards */}
          <div className="hidden md:block ">
            <div className="flex justify-center">
              {links.map((link) => (
                <Link key={link.name} href={link.path} className="nav_links">
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          {/* Mobile Topbar */}
          <div className="md:hidden h-12 flex justify-between items-center">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center h-full transition active:scale-95 bg-gradient-to-r gradient px-3 py-2 rounded-md"
            >
              <span className="relative w-8 h-full">
                <Image
                  src="/assets/images/logo.svg"
                  alt="Indigenous Health Conferences"
                  fill
                  quality={100}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover overflow-visible"
                />
              </span>
            </Link>
            {/* Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileNavOpen((currentState) => !currentState)}
            >
              <GiHamburgerMenu className="text-4xl" />
            </button>
          </div>

          {/* Mobile Sidebar*/}
          <a.div
            style={{
              overflow: "hidden",
              transform: dropdownAnimation.transform,
            }}
            className="md:hidden absolute top-0 left-0 h-screen bg-black shadow-lg z-[999] flex_col gap-4 py-7 px-14"
          >
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className="font-extrabold text-white/90 text-3xl uppercase"
              >
                {link.name}
              </Link>
            ))}
          </a.div>
        </div>
      </nav>
    </>
  );
}

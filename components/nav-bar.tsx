"use client";
import React, { useState } from "react";
import { links } from "@/lib/data";
import Link from "next/link";
import { ConferenceType } from "@/lib/types";
import { Fragment } from "react";
import { a, useSpring } from "@react-spring/web";
import { GiHamburgerMenu } from "react-icons/gi";
import Image from "next/image";

export default function NavBar(
  { conferences }: { conferences: ConferenceType[] },
) {
  const [conferencesOpen, setConferencesOpen] = useState<boolean>(false);
  const [mobileNavOpen, setMobileNavOpen] = useState<boolean>(false);
  const dropdownAnimation = useSpring({
    y: conferencesOpen ? 0 : -10,
    height: conferencesOpen ? "auto" : 0,
    transform: mobileNavOpen ? "translateX(0)" : "translateX(-100%)",
    opacity: conferencesOpen ? 1 : 0,
  });

  return (
    <nav className="sticky top-0 z-[999] py-2 bg-black">
      <div className="section_container !overflow-visible">
        {/* Medium Upwards */}
        <div className="hidden md:block ">
          <div className="flex flex-wrap">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className="nav_links group"
              >
                <span className="nav_span group-hover:w-1/2 left-0 bg-gradient-to-r" />
                <span className="z-20 group-active:scale-95 transition-transform">
                  {link.name}
                </span>
                <span className="nav_span group-hover:w-1/2 right-0 bg-gradient-to-l" />
              </Link>
            ))}
            <div className="relative grow">
              <button
                type="button"
                className="nav_links group"
                onClick={() =>
                  setConferencesOpen((currentState) => !currentState)}
              >
                <span className="nav_span group-hover:w-1/2 left-0 bg-gradient-to-r" />
                <span className="z-20 group-active:scale-95 transition-transform">
                  Conferences
                </span>
                <span className="nav_span group-hover:w-1/2 right-0 bg-gradient-to-l" />
              </button>
              <a.div
                style={{
                  overflow: "hidden",
                  y: dropdownAnimation.y,
                  height: dropdownAnimation.height,
                  opacity: dropdownAnimation.opacity,
                }}
                className="absolute top-full flex_col gap-3 pl-2 py-4 rounded-md mt-3 bg-black"
              >
                {conferences.map((conference) => (
                  <Fragment key={conference.slug}>
                    <Link
                      href={`/conference/${conference.slug}`}
                      className="nav_dropdown bg-gradient-to-r gradient bg-clip-text hover:text-transparent transition"
                    >
                      <span>
                        {conference.title}
                      </span>
                    </Link>
                  </Fragment>
                ))}
              </a.div>
            </div>
          </div>
        </div>

        {/* Mobile Topbar */}
        <div className="md:hidden h-12 flex justify-between items-center">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center h-full transition active:scale-95 bg-gradient-radial gradient px-3 py-2 rounded-md"
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
        <div className="relative">
          <button
            type="button"
            className="font-extrabold text-white/90 text-3xl uppercase"
            onClick={() => setConferencesOpen((currentState) => !currentState)}
          >
            Conferences
          </button>
          <a.div
            style={{
              overflow: "hidden",
              y: dropdownAnimation.y,
              height: dropdownAnimation.height,
              opacity: dropdownAnimation.opacity,
            }}
            className="absolute top-full flex_col gap-3 mt-3 pl-2"
          >
            {conferences.map((conference) => (
              <Fragment key={conference.slug}>
                <Link
                  href={`/conference/${conference.slug}`}
                  className="font-medium leading-none text-lg"
                >
                  {conference.title}
                </Link>
              </Fragment>
            ))}
          </a.div>
        </div>
      </a.div>
    </nav>
  );
}

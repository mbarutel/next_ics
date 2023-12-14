"use client";
import React, { useState } from "react";
import { links } from "@/lib/data";
import Link from "next/link";
import { ConferenceType } from "@/lib/types";
import { Fragment } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { a, animated, useSpring } from "@react-spring/web";
import useMeasure from "react-use-measure";

function usePrevious<T>(value: T) {
  const ref = useRef<T>();
  useEffect(() => void (ref.current = value), [value]);
  return ref.current;
}

export default function NavBar(
  { conferences }: { conferences: ConferenceType[] },
) {
  const [open, setOpen] = useState<boolean>(false);
  const dropdownAnimation = useSpring({
    y: open ? 0 : -10,
    height: open ? "auto" : 0,
    opacity: open ? 1 : 0,
  });

  return (
    <nav className="sticky top-0 z-20 py-2 bg-black">
      <div className="container">
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
              className="nav_links group"
              onClick={() => setOpen((currentState) => !currentState)}
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
                ...dropdownAnimation,
              }}
              className="absolute top-full flex_col gap-3 pl-2 py-4 rounded-md mt-3 bg-black"
            >
              {conferences.map((conference) => (
                <Fragment key={conference.slug}>
                  <Link
                    href={`/conferences/${conference.slug}`}
                    className="nav_dropdown bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text hover:text-transparent transition"
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
    </nav>
  );
}

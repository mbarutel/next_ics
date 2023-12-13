import { links } from "@/lib/data";
import Link from "next/link";
import React from "react";

export default function NavBar() {
  return (
    <nav className="sticky top-0 z-20 my-2 bg-black">
      <div className="container flex gap-8">
        {links.map((link) => (
          <Link
            key={link.name}
            href={link.path}
            className="nav_links group"
          >
            <span className="nav_span group-hover:w-1/2 left-0 bg-gradient-to-r" />
            <span className="z-20">
              {link.name}
            </span>
            <span className="nav_span group-hover:w-1/2 right-0 bg-gradient-to-l" />
          </Link>
        ))}
      </div>
    </nav>
  );
}

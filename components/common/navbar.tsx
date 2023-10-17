"use client";

import React, { useState } from "react";
import { links } from "@/lib/data";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import Link from "next/link";
import Image from "next/image";

// export default function Navbar() {
//   const [menuOpen, setMenuOpen] = useState(false);
//
//   const handleNav = () => {
//     setMenuOpen(!menuOpen);
//   };
//
//   return (
//     <div className="w-full sm:px-6 bg-white/50 backdrop-blur-md fixed top-0 z-[999]">
//       <div className="relative container py-2">
//         <nav className="relative flex items-center justify-between sm:h-10 md:justify-center">
//           <div className="flex items-center flex-1 md:absolute md:inset-y-0 md:left-0">
//             <div className="flex items-center justify-between w-full md:w-auto">
//               <Link href="/" className="relative h-full w-24">
//                 <Image
//                   src={Logo}
//                   quality={100}
//                   fill
//                   className="object-cover"
//                   alt="Indigenous Health Conferences"
//                 />
//               </Link>
//               <div
//                 onClick={handleNav}
//                 className="sm:hidden cursor-pointer flex items-center -mr-2"
//               >
//                 <AiOutlineMenu size={25} />
//               </div>
//             </div>
//           </div>
//
//           <div
//             className={menuOpen
//               ? "fixed left-0 top-0 w-[65%] sm:hidden h-screen bg-[#ecf0f3] p-10 ease-in duration-500"
//               : "fixed left-[-100%] top-0 p-10 ease-out duration-500"}
//           >
//             <div className="flex w-full items-center justify-end">
//               <div onClick={handleNav} className="cursor-pointer">
//                 <AiOutlineClose size={25} />
//               </div>
//             </div>
//             <div className="flex-col py-4">
//               <ul>
//                 {links.map((item, index) => (
//                   <li
//                     key={index}
//                     onClick={() => setMenuOpen(!menuOpen)}
//                     className="py-2 cursor-pointer"
//                   >
//                     <Link
//                       href={item.path}
//                       className="text-xl font-semibold uppercase text-night/80"
//                     >
//                       {item.name}
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//           <div className="hidden md:flex md:space-x-10 list-none">
//             <li className="active:scale-95">
//               <Link
//                 href="/"
//                 className="text-base font-normal text-stone-500 list-none hover:text-red-800 transition uppercase group"
//                 target=""
//               >
//                 Home
//                 <div className="grid grid-cols-2 h-[2px]">
//                   <span className="relative">
//                     <span className="absolute right-0 h-full w-0 group-hover:w-full bg-red-800 transition-all">
//                     </span>
//                   </span>
//                   <span className="relative">
//                     <span className="absolute left-0 h-full w-0 group-hover:w-full bg-red-800 transition-all">
//                     </span>
//                   </span>
//                 </div>
//               </Link>
//             </li>
//             <li className="active:scale-95">
//               <Link
//                 href="/about"
//                 className="text-base font-normal text-stone-500 list-none hover:text-red-800 transition uppercase group"
//               >
//                 About
//                 <div className="grid grid-cols-2 h-[2px]">
//                   <span className="relative">
//                     <span className="absolute right-0 h-full w-0 group-hover:w-full bg-red-800 transition-all">
//                     </span>
//                   </span>
//                   <span className="relative">
//                     <span className="absolute left-0 h-full w-0 group-hover:w-full bg-red-800 transition-all">
//                     </span>
//                   </span>
//                 </div>
//               </Link>
//             </li>
//             <li className="active:scale-95">
//               <Link
//                 href="/conferences"
//                 className="text-base font-normal text-stone-500 list-none hover:text-red-800 transition uppercase group"
//               >
//                 Conferences
//                 <div className="grid grid-cols-2 h-[2px]">
//                   <span className="relative">
//                     <span className="absolute right-0 h-full w-0 group-hover:w-full bg-red-800 transition-all">
//                     </span>
//                   </span>
//                   <span className="relative">
//                     <span className="absolute left-0 h-full w-0 group-hover:w-full bg-red-800 transition-all">
//                     </span>
//                   </span>
//                 </div>
//               </Link>
//             </li>
//           </div>
//           <div className="hidden md:absolute md:flex md:items-center md:justify-end md:inset-y-0 md:right-0">
//             <div className="inline-flex rounded-md shadow transition-all bg-gradient-to-b hover:bg-gradient-to-t from-stone-950/90 to-red-950/90 active:scale-95">
//               <Link
//                 href="/contact"
//                 className="inline-flex items-center px-4 py-2 text-base text-white border border-transparent cursor-pointer font-base uppercase"
//               >
//                 Contact Us
//               </Link>
//             </div>
//           </div>
//         </nav>
//       </div>
//     </div>
//   );
// }
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
              className="object-contain"
            />
          </span>
          <span
            style={{ fontFamily: "Bungee Inline" }}
            className="flex flex-col text-xl sm:text-3xl text-slate-700"
          >
            ICS
            <span className="w-full h-1 bg-slate-800/80" />
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
              className="relative px-4 py-3 group last:bg-orange-500 text-slate-800 last:text-white active:scale-95"
            >
              <Link
                href={link.path}
                className="inline-flex"
              >
                <span className="z-10">
                  {link.name}
                </span>
                <span className="absolute h-1 group-last:h-full w-0 left-0 bottom-0 group-hover:w-full bg-orange-500 group-last:bg-slate-900 transition-all ease-in-out z-0" />
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
// <Image
//   src="/assets/images/logo.svg"
//   alt="Indigenous Health Conferences"
//   fill
//   quality={100}
//   className="object-cover"
// />

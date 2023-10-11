import { ConferencesType } from "@/contentful/services/conferences";
import { configs } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import React from "react";

// export default function Header() {
//   return (
//     <header className="relative h-[25rem] sm:h-[30rem] lg:h-[60rem] flex items-center justify-center">
//       <Image
//         src="/assets/images/header-testing.jpg"
//         alt="Indigenous Health Conference Services"
//         fill
//         className="contrast-[0.9] object-cover"
//       />
//       <HeaderBox />
//     </header>
//   );
// }
//
// function HeaderBox() {
//   return (
//     <div className="flex flex-col bg-gradient-to-b from-stone-950/90 to-red-950/90 px-2 py-6 sm:py-8 z-[99] text-white rounded-tr-xl rounded-bl-xl w-[min(90%,40rem)]">
//       <div className="mb-4 sm:mb-6">
//         <h1 className="text-center text-white text-[1.6rem] sm:text-3xl font-black uppercase tracking-wider leading-tight mb-1 drop-shadow-xs">
//           Indigenous Conference Services
//         </h1>
//         <p className="text-center text-yellow-500 text-[0.8rem] sm:text-lg uppercase font-semibold">
//           The impossible is the next step for our journey
//         </p>
//       </div>
//       <div className="max-w-lg mx-auto flex justify-center items-center gap-4">
//         <Link
//           href={configs.forms.registration}
//           target="_blank"
//           rel="noreferrer"
//           className="group relative inline-flex border border-orange-500 focus:outline-none w-full sm:w-auto rounded-md"
//         >
//           <span className="w-full inline-flex items-center justify-center self-stretch px-4 py-2 text-sm text-white text-center font-bold uppercase bg-orange-500 ring-1 ring-orange-500 ring-offset-1 ring-offset-orange-500 transform transition-transform group-hover:-translate-y-1 group-hover:-translate-x-1 group-focus:-translate-y-1 group-focus:-translate-x-1 group-active:translate-y-0 group-active:translate-x-0 rounded-md">
//             Register
//           </span>
//         </Link>
//         <Link
//           className="group relative inline-flex border border-orange-500 focus:outline-none w-full sm:w-auto rounded-md"
//           href={configs.forms.submitPaper}
//           target="_blank"
//           rel="noreferrer"
//         >
//           <span className="w-full inline-flex items-center justify-center self-stretch px-4 py-2 text-sm text-white text-center font-bold uppercase bg-transparent ring-1 ring-orange-500 ring-offset-1 ring-offset-orange-500 transform transition-transform group-hover:-translate-y-1 group-hover:-translate-x-1 group-focus:-translate-y-1 group-focus:-translate-x-1 group-active:translate-y-0 group-active:translate-x-0 rounded-md">
//             Submit&nbsp;a&nbsp;paper
//           </span>
//         </Link>
//       </div>
//     </div>
//   );
// }

type HeaderProps = {
  conferences: ConferencesType[];
};

export default function Header({ conferences }: HeaderProps) {
  console.log(conferences);

  return (
    <header className="relative h-[25rem] sm:h-[30rem] lg:h-[60rem] flex items-center justify-center">
      <Image
        src={conferences[0].coverImage?.src}
        alt="Indigenous Health Conference Services"
        fill
        className="contrast-[0.9] object-cover"
      />
    </header>
  );
}

// function HeaderBox() {
//   return (
//     <div className="flex flex-col bg-gradient-to-b from-stone-950/90 to-red-950/90 px-2 py-6 sm:py-8 z-[99] text-white rounded-tr-xl rounded-bl-xl w-[min(90%,40rem)]">
//       <div className="mb-4 sm:mb-6">
//         <h1 className="text-center text-white text-[1.6rem] sm:text-3xl font-black uppercase tracking-wider leading-tight mb-1 drop-shadow-xs">
//           Indigenous Conference Services
//         </h1>
//         <p className="text-center text-yellow-500 text-[0.8rem] sm:text-lg uppercase font-semibold">
//           The impossible is the next step for our journey
//         </p>
//       </div>
//       <div className="max-w-lg mx-auto flex justify-center items-center gap-4">
//         <Link
//           href={configs.forms.registration}
//           target="_blank"
//           rel="noreferrer"
//           className="group relative inline-flex border border-orange-500 focus:outline-none w-full sm:w-auto rounded-md"
//         >
//           <span className="w-full inline-flex items-center justify-center self-stretch px-4 py-2 text-sm text-white text-center font-bold uppercase bg-orange-500 ring-1 ring-orange-500 ring-offset-1 ring-offset-orange-500 transform transition-transform group-hover:-translate-y-1 group-hover:-translate-x-1 group-focus:-translate-y-1 group-focus:-translate-x-1 group-active:translate-y-0 group-active:translate-x-0 rounded-md">
//             Register
//           </span>
//         </Link>
//         <Link
//           className="group relative inline-flex border border-orange-500 focus:outline-none w-full sm:w-auto rounded-md"
//           href={configs.forms.submitPaper}
//           target="_blank"
//           rel="noreferrer"
//         >
//           <span className="w-full inline-flex items-center justify-center self-stretch px-4 py-2 text-sm text-white text-center font-bold uppercase bg-transparent ring-1 ring-orange-500 ring-offset-1 ring-offset-orange-500 transform transition-transform group-hover:-translate-y-1 group-hover:-translate-x-1 group-focus:-translate-y-1 group-focus:-translate-x-1 group-active:translate-y-0 group-active:translate-x-0 rounded-md">
//             Submit&nbsp;a&nbsp;paper
//           </span>
//         </Link>
//       </div>
//     </div>
//   );
// }

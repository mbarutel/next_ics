import React, { Fragment } from "react";
import { cta } from "@/lib/data";
import Link from "next/link";
import Image from "next/image";

// export default function CallToAction() {
//   return (
//     <section>
//       <div className="mx-auto max-w-[90rem] grid grid-cols-1 sm:grid-cols-3 h-96 text-white">
//         <div className="bg-red-500/80 h-full flex flex-col justify-center items-center">
//           <span className="text-4xl">
//             {cta[0].icon}
//           </span>
//           <strong className="text-base sm:text-2xl">
//             {cta[0].title}
//           </strong>
//           <p className="italic text-center text-stone-950 mb-8">
//             {cta[0].description}
//           </p>
//
//           <Link
//             href={cta[0].form}
//             target="_blank"
//             rel="noreferrer"
//             className="group relative inline-flex border border-orange-700 focus:outline-none w-[80%] sm:w-auto"
//           >
//             <span className="w-full inline-flex items-center justify-center self-stretch px-4 py-2 text-sm text-white text-center font-bold uppercase bg-orange-700 ring-1 ring-orange-700 ring-offset-1 ring-offset-orange-700 transform transition-transform group-hover:translate-y-1 group-hover:translate-x-1 group-focus:translate-y-1 group-focus:translate-x-1 group-active:translate-y-0 group-active:translate-x-0">
//               {cta[0].button}
//             </span>
//           </Link>
//         </div>
//         <div className="bg-orange-500/80 h-full flex flex-col justify-center items-center">
//           <span className="text-4xl">
//             {cta[1].icon}
//           </span>
//           <strong className="text-base sm:text-2xl">
//             {cta[1].title}
//           </strong>
//           <p className="italic text-center text-stone-950 mb-8">
//             {cta[1].description}
//           </p>
//
//           <Link
//             href={cta[1].form}
//             target="_blank"
//             rel="noreferrer"
//             className="group relative inline-flex border border-orange-700 focus:outline-none w-[80%] sm:w-auto"
//           >
//             <span className="w-full inline-flex items-center justify-center self-stretch px-4 py-2 text-sm text-white text-center font-bold uppercase bg-orange-700 ring-1 ring-orange-700 ring-offset-1 ring-offset-orange-700 transform transition-transform group-hover:translate-y-1 group-hover:translate-x-1 group-focus:translate-y-1 group-focus:translate-x-1 group-active:translate-y-0 group-active:translate-x-0">
//               {cta[1].button}
//             </span>
//           </Link>
//         </div>
//         <div className="bg-yellow-500/80 h-full flex flex-col justify-center items-center">
//           <span className="text-4xl">
//             {cta[2].icon}
//           </span>
//           <strong className="text-base sm:text-2xl">
//             {cta[2].title}
//           </strong>
//           <p className="italic text-center text-stone-950 mb-8">
//             {cta[2].description}
//           </p>
//
//           <Link
//             href={cta[2].form}
//             target="_blank"
//             rel="noreferrer"
//             className="group relative inline-flex border border-orange-700 focus:outline-none w-[80%] sm:w-auto"
//           >
//             <span className="w-full inline-flex items-center justify-center self-stretch px-4 py-2 text-sm text-white text-center font-bold uppercase bg-orange-700 ring-1 ring-orange-700 ring-offset-1 ring-offset-orange-700 transform transition-transform group-hover:translate-y-1 group-hover:translate-x-1 group-focus:translate-y-1 group-focus:translate-x-1 group-active:translate-y-0 group-active:translate-x-0">
//               {cta[2].button}
//             </span>
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// }
export default function CallToAction() {
  return (
    <section className="pt-8 lg:pt-12">
      <div className="container grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-8">
        {cta.map((action, index) => (
          <Fragment key={index}>
            <ActionCard {...action} />
          </Fragment>
        ))}
      </div>
    </section>
  );
}

type ActionCardProp = (typeof cta)[number];
function ActionCard(
  { title, description, button, image, form }: ActionCardProp,
) {
  return (
    <div className="bg-slate-400/90 shadow-xl shadow-black/20">
      <div className="relative h-52 lg:h-96">
        <Image src={image} alt={title} fill className="object-cover" />
      </div>
      <div className="px-3 pb-3 lg:px-6 lg:pb-6 mt-5">
        <h3 className="text-slate-950 text-2xl mb-1 lg:mb-3">{title}</h3>
        <p className="text-slate-200 lg:text-lg">{description}</p>
        <span className="inline-flex w-full h-[3px] bg-slate-800/80" />
        <Link
          href={form}
          className="relative inline-flex group mt-3 lg:mt-5 button_padding bg-slate-700  text-white transition-all active:scale-95"
        >
          <span className="z-10">
            {button}
          </span>
          <span className="absolute h-full w-0 left-0 bottom-0 group-hover:w-full bg-slate-950 transition-all ease-in-out z-0" />
        </Link>
      </div>
    </div>
  );
}

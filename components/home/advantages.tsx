"use client";
import React, { Fragment } from "react";
import { advantages } from "@/lib/data";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

// export default function Advantages() {
//   const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay()]);
//
//   return (
//     <section className="px-2">
//       <div className="container bg-advantages_background bg-cover bg-center bg-fixed rounded-md py-7 lg:py-32 sm:px-12">
//         <div className="bg-white/40 rounded-xl p-2 sm:p-5 flex flex-col">
//           <h2 className="section_header text-orange-500 text-center pb-1 md:pb-3">
//             Become part of&nbsp;ICS
//           </h2>
//           <div ref={emblaRef} className="overflow-hidden sm:-mt-1">
//             <div className="flex mb-4">
//               {advantages.map((advantage, index) => (
//                 <div key={index} className="flex-grow flex-shrink-0 w-full">
//                   <div className="flex flex-col gap-5 sm:gap-7 lg:gap-12">
//                     {advantage.map((item, index) => (
//                       <div key={index}>
//                         <h3 className="text-stone-700 text-center text-[1rem] sm:text-2xl">
//                           {item.header}
//                         </h3>
//                         <p className="text-center text-stone-700/90 w-[min(100%,60rem)] mx-auto italic">
//                           {item.description}
//                         </p>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

export default function Advantages() {
  return (
    <section className="pt-8 lg:pt-12">
      <div className="mx-auto max-w-[90rem] grid grid-cols-2 sm:grid-cols-4">
        {advantages.map((advantage, index) => (
          <Fragment key={index}>
            <AdvantageCard {...advantage} />
          </Fragment>
        ))}
      </div>
    </section>
  );
}

type AdvantageCardProps = (typeof advantages)[number];
function AdvantageCard(
  { header, image }: AdvantageCardProps,
) {
  return (
    <div className="relative h-64">
      <Image src={image} alt="Advantages ICS" fill className="object-cover" />
      <h3 className="absolute uppercase text-white bottom-6 left-1/2 -translate-x-1/2 w-full text-center">{header}</h3>
    </div>
  );
}

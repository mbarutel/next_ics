import React from "react";
import { cta } from "@/lib/data";
import Link from "next/link";

// export default function CallToAction() {
//   return (
//     <section>
//       <div className="container text-center py-12">
//         <h3 className="text-center mb-8 lg:mb-12 section_header text-red-800 !font-normal italic">
//           Building better future together
//         </h3>
//         <div className="flex flex-col sm:flex-row justify-center p-[20px]">
//           <div className="text-white flex-grow h-[400px] sm:-mx-[15px] -mb-[15px] sm:my-0 mix-blend-multiply">
//             <div
//               style={{ borderRadius: "50% 50% 50% 70%/50% 50% 70% 60%" }}
//               className="bg-red-500/80 h-full flex flex-col justify-center items-center"
//             >
//               <span className="text-4xl">
//                 {cta[0].icon}
//               </span>
//               <strong className="text-base sm:text-2xl">
//                 {cta[0].title}
//               </strong>
//               <p className="italic text-center text-stone-950 mb-8">
//                 {cta[0].description}
//               </p>
//
//               <div>
//                 <Link
//                   href={cta[0].form}
//                   target="_blank"
//                   rel="noreferrer"
//                   className="group relative inline-flex border border-orange-700 focus:outline-none w-[80%] sm:w-auto rounded-md"
//                 >
//                   <span className="w-full inline-flex items-center justify-center self-stretch px-4 py-2 text-sm text-white rounded-md text-center font-bold uppercase bg-orange-700 ring-1 ring-orange-700 ring-offset-1 ring-offset-orange-700 transform transition-transform group-hover:translate-y-1 group-hover:translate-x-1 group-focus:translate-y-1 group-focus:translate-x-1 group-active:translate-y-0 group-active:translate-x-0">
//                     {cta[0].button}
//                   </span>
//                 </Link>
//               </div>
//             </div>
//           </div>
//           <div className="text-white flex-grow h-[400px] sm:-mx-[15px] -my-[15px] sm:my-0 mix-blend-multiply">
//             <div
//               style={{ borderRadius: "80% 30% 50% 50%/50%" }}
//               className="bg-orange-500/80 h-full flex flex-col justify-center items-center"
//             >
//               <span className="text-4xl">
//                 {cta[1].icon}
//               </span>
//               <strong className="text-base sm:text-2xl">
//                 {cta[1].title}
//               </strong>
//               <p className="italic text-center text-stone-950 mb-8">
//                 {cta[1].description}
//               </p>
//
//               <div>
//                 <Link
//                   href={cta[1].form}
//                   target="_blank"
//                   rel="noreferrer"
//                   className="group relative inline-flex border border-orange-700 focus:outline-none w-[80%] sm:w-auto rounded-md"
//                 >
//                   <span className="w-full inline-flex items-center justify-center self-stretch px-4 py-2 text-sm text-white rounded-md text-center font-bold uppercase bg-orange-700 ring-1 ring-orange-700 ring-offset-1 ring-offset-orange-700 transform transition-transform group-hover:translate-y-1 group-hover:translate-x-1 group-focus:translate-y-1 group-focus:translate-x-1 group-active:translate-y-0 group-active:translate-x-0">
//                     {cta[1].button}
//                   </span>
//                 </Link>
//               </div>
//             </div>
//           </div>
//           <div className="text-white flex-grow h-[400px] sm:-mx-[15px] -mt-[15px] sm:my-0 mix-blend-multiply">
//             <div
//               style={{ borderRadius: "40% 40% 50% 40%/30% 50% 50% 50%" }}
//               className="bg-yellow-500/80 h-full flex flex-col justify-center items-center"
//             >
//               <span className="text-4xl">
//                 {cta[2].icon}
//               </span>
//               <strong className="text-base sm:text-2xl">
//                 {cta[2].title}
//               </strong>
//               <p className="italic text-center text-stone-950 mb-8">
//                 {cta[2].description}
//               </p>
//
//               <div>
//                 <Link
//                   href={cta[2].form}
//                   target="_blank"
//                   rel="noreferrer"
//                   className="group relative inline-flex border border-orange-700 focus:outline-none w-[80%] sm:w-auto rounded-md"
//                 >
//                   <span className="w-full inline-flex items-center justify-center self-stretch px-4 py-2 text-sm text-white rounded-md text-center font-bold uppercase bg-orange-700 ring-1 ring-orange-700 ring-offset-1 ring-offset-orange-700 transform transition-transform group-hover:translate-y-1 group-hover:translate-x-1 group-focus:translate-y-1 group-focus:translate-x-1 group-active:translate-y-0 group-active:translate-x-0">
//                     {cta[2].button}
//                   </span>
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

export default function CallToAction() {
  return (
    <section>
      <div className="mx-auto max-w-[90rem]">
        <div className="flex flex-col sm:flex-row justify-center">
          <div className="text-white flex-grow h-[400px] mix-blend-multiply">
            <div className="bg-red-500/80 h-full flex flex-col justify-center items-center">
              <span className="text-4xl">
                {cta[0].icon}
              </span>
              <strong className="text-base sm:text-2xl">
                {cta[0].title}
              </strong>
              <p className="italic text-center text-stone-950 mb-8">
                {cta[0].description}
              </p>

              <div>
                <Link
                  href={cta[0].form}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative inline-flex border border-orange-700 focus:outline-none w-[80%] sm:w-auto"
                >
                  <span className="w-full inline-flex items-center justify-center self-stretch px-4 py-2 text-sm text-white text-center font-bold uppercase bg-orange-700 ring-1 ring-orange-700 ring-offset-1 ring-offset-orange-700 transform transition-transform group-hover:translate-y-1 group-hover:translate-x-1 group-focus:translate-y-1 group-focus:translate-x-1 group-active:translate-y-0 group-active:translate-x-0">
                    {cta[0].button}
                  </span>
                </Link>
              </div>
            </div>
          </div>
          <div className="text-white flex-grow h-[400px] mix-blend-multiply">
            <div className="bg-orange-500/80 h-full flex flex-col justify-center items-center">
              <span className="text-4xl">
                {cta[1].icon}
              </span>
              <strong className="text-base sm:text-2xl">
                {cta[1].title}
              </strong>
              <p className="italic text-center text-stone-950 mb-8">
                {cta[1].description}
              </p>

              <div>
                <Link
                  href={cta[1].form}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative inline-flex border border-orange-700 focus:outline-none w-[80%] sm:w-auto"
                >
                  <span className="w-full inline-flex items-center justify-center self-stretch px-4 py-2 text-sm text-white text-center font-bold uppercase bg-orange-700 ring-1 ring-orange-700 ring-offset-1 ring-offset-orange-700 transform transition-transform group-hover:translate-y-1 group-hover:translate-x-1 group-focus:translate-y-1 group-focus:translate-x-1 group-active:translate-y-0 group-active:translate-x-0">
                    {cta[1].button}
                  </span>
                </Link>
              </div>
            </div>
          </div>
          <div className="text-white flex-grow h-[400px] mix-blend-multiply">
            <div className="bg-yellow-500/80 h-full flex flex-col justify-center items-center">
              <span className="text-4xl">
                {cta[2].icon}
              </span>
              <strong className="text-base sm:text-2xl">
                {cta[2].title}
              </strong>
              <p className="italic text-center text-stone-950 mb-8">
                {cta[2].description}
              </p>

              <div>
                <Link
                  href={cta[2].form}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative inline-flex border border-orange-700 focus:outline-none w-[80%] sm:w-auto"
                >
                  <span className="w-full inline-flex items-center justify-center self-stretch px-4 py-2 text-sm text-white text-center font-bold uppercase bg-orange-700 ring-1 ring-orange-700 ring-offset-1 ring-offset-orange-700 transform transition-transform group-hover:translate-y-1 group-hover:translate-x-1 group-focus:translate-y-1 group-focus:translate-x-1 group-active:translate-y-0 group-active:translate-x-0">
                    {cta[2].button}
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

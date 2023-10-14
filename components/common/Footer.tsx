import React, { Fragment } from "react";
import Link from "next/link";
import { configs, links } from "@/lib/data";
import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai";

// export default function Footer() {
//   return (
//     <footer className="flex justify-center py-3 lg:py-6">
//       <div className="container text-night">
//         <div className="w-full flex flex-col lg:flex-row lg:justify-between items-center">
//           <div className="order-1 md:order-none">
//             <div className="text-center lg:text-left">
//               <span className="w-fit mb-3 flex flex-col gap-1">
//                 <h2
//                   style={{ fontFamily: "Bungee Inline" }}
//                   className="text-lg mm:text-2xl lg:text-3xl w-fit text-slate-800"
//                 >
//                   Indigenous Conference Services
//                 </h2>
//                 <span className="inline-flex h-1 bg-slate-800/90 w-3/4" />
//               </span>
//               <div className="flex flex-col text-stone-700">
//                 <span>8 Kiwi Court</span>
//                 <span>Point Vernon, Hervey Bay</span>
//                 <span>QLD Australia 4655</span>
//               </div>
//             </div>
//             <div className="flex gap-5 justify-center mt-4">
//               <Link
//                 href={`mailto:${configs.contact.email}`}
//                 target="_blank"
//                 rel="noreferrer"
//                 className="flex items-center p-2 group active:scale-95 relative"
//               >
//                 <div className="w-0 h-full bg-stone-400/50 transition-all group-hover:w-full absolute inset-0 z-0 rounded-md">
//                 </div>
//                 <AiOutlineMail className="text-3xl sm:mr-2 z-10" />
//                 <span className="font-bold hidden sm:block z-10">
//                   {configs.contact.email}
//                 </span>
//               </Link>
//               <Link
//                 href={`tel:${configs.contact.phone}`}
//                 className="flex items-center p-2 group active:scale-95 relative"
//               >
//                 <div className="w-0 h-full bg-stone-400/50 transition-all group-hover:w-full absolute inset-0 z-0 rounded-md">
//                 </div>
//                 <AiOutlinePhone className="text-3xl sm:mr-2 z-10" />
//                 <span className="font-bold hidden sm:block z-10">
//                   {configs.contact.phone}
//                 </span>
//               </Link>
//             </div>
//           </div>
//           <div className="flex flex-row lg:flex-col py-4 gap-3 sm:gap-6 lg:gap-3">
//             {links.map((link, index) => (
//               <Fragment key={index}>
//                 <Link
//                   href={link.path}
//                   className="text-center lg:text-right text-[0.9rem] md:text-lg font-medium uppercase transition sm:hover:-translate-x-2 sm:focus:-translate-x-2 active:scale-95"
//                 >
//                   {link.name}
//                 </Link>
//               </Fragment>
//             ))}
//           </div>
//         </div>
//         <div className="mt-4">
//           <p className="italic text-center lg:text-lg font-thin">
//             ©&nbsp;Indigenous&nbsp;Conference&nbsp;Services&nbsp;2023
//           </p>
//         </div>
//       </div>
//     </footer>
//   );
// }
export default function Footer() {
  return (
    <footer>
      <div className="container grid lg:grid-cols-3">
        <div>
          <span className="w-fit mb-3 flex flex-col gap-1">
            <h2
              style={{ fontFamily: "Bungee Inline" }}
              className="text-lg sm:text-2xl w-fit text-slate-800"
            >
              Indigenous Conference Services
            </h2>
            <span className="inline-flex h-1 bg-slate-800/90 w-3/4" />
          </span>
          <p className="text-sm">
            We acknowledge the Traditional Owners and Custodians of the lands on
            which we work, live, and create. We pay our respects to their Elders
            past, present, and emerging. We recognize the enduring connection of
            Indigenous Australians to this land, its waterways, and its cultural
            heritage. We are committed to fostering reconciliation,
            understanding, and respect for Indigenous peoples and their unique
            histories, cultures, and contributions.
          </p>
        </div>
        <div className="flex flex-col">
          <h3>Contacts</h3>
          <span>
            Phone:{" "}
            <span className="inline-flex text-blue-700">
              {configs.contact.phone}
            </span>
          </span>
          <span>
            Email:{" "}
            <span className="inline-flex text-blue-700">
              {configs.contact.email}
            </span>
          </span>
          <span>
            Address:{" "}
            <span className="inline-flex text-blue-700">
              8 Kiwi Court, Hervey Bay QLD Australia 4655
            </span>
          </span>
        </div>
        <div className="flex flex-row lg:flex-col">
          <h3>Links</h3>
          {links.map((link, index) => (
            <Fragment key={index}>
              <Link
                href={link.path}
                className="text-center lg:text-right text-[0.9rem] md:text-lg font-medium uppercase transition sm:hover:-translate-x-2 sm:focus:-translate-x-2 active:scale-95"
              >
                {link.name}
              </Link>
            </Fragment>
          ))}
        </div>
      </div>
    </footer>
  );
}

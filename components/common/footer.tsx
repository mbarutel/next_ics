import Link from "next/link";
import React, { Fragment } from "react";
import { configs, links } from "@/lib/data";
import {
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlinePushpin,
} from "react-icons/ai";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="pt-2">
      <div className="section_container">
        <div className="relative rounded-sm overflow-hidden flex flex-col">
          <Image
            src="/assets/images/art-bg.svg"
            alt="Announcements"
            fill
            className="object-cover opacity-20 grayscale z-0"
          />
          <div className="grid grid-cols-2 lg:grid-cols-3 lg:gap-8 mb-2 px-6 pt-4 z-10">
            <Links />
            <Acknowledgement />
            <Contacts />
          </div>
          <small className="italic mx-auto text-sm">
            ©&nbsp;Indigenous&nbsp;Conference&nbsp;Services&nbsp;2023
          </small>
        </div>
      </div>
    </footer>
  );
}

function Acknowledgement() {
  return (
    <div className="hidden lg:block">
      <h3 className="footer_grid_header">
        Indigenous Conference Services
      </h3>
      <p className="text-sm">
        We acknowledge the Traditional Owners and Custodians of the lands on
        which we work, live, and create. We pay our respects to their Elders
        past, present, and emerging.
      </p>
    </div>
  );
}

function Links() {
  return (
    <div className="flex flex-col">
      <h3 className="footer_grid_header">
        Links
      </h3>
      <div className="grid grid-cols-2 gap-1 lg:gap-2 w-fit mr-auto">
        {links.map((link, index) => (
          <Fragment key={index}>
            <Link
              href={link.path}
              className="group text-xs sm:text-sm lg:text-lg"
            >
              <span className="relative pb-1">
                {link.name}
                <span className="absolute h-1 w-0 right-0 bottom-0 group-hover:w-full group-focus:w-full group-active:scale-95 bg-white transition-all ease-in-out" />
              </span>
            </Link>
          </Fragment>
        ))}
      </div>
    </div>
  );
}

function Contacts() {
  return (
    <div className="flex flex-col text-right">
      <h3 className="footer_grid_header">
        Contacts
      </h3>
      <span className="text-xs sm:text-sm lg:text-base flex">
        <span className="hidden sm:block sm:float-left font-medium pr-1">
          Phone{" "}
        </span>
        <AiOutlinePhone className="float-left sm:hidden" />
        <span className="border-dotted border-b-2 grow border-white/80 -translate-y-[6px]" />
        <Link
          href={`tel:${configs.contact.phone}`}
          className="group"
        >
          <span className="relative pb-1 ml-1">
            {configs.contact.phone}
            <span className="absolute h-1 w-0 left-0 bottom-0 group-hover:w-full group-focus:w-full group-active:scale-95 bg-white transition-all ease-in-out" />
          </span>
        </Link>
      </span>
      <span className="text-xs sm:text-sm lg:text-base flex">
        <span className="hidden sm:block sm:float-left font-medium pr-1">
          Email{" "}
        </span>
        <AiOutlineMail className="float-left sm:hidden" />
        <span className="border-dotted border-b-2 grow border-white/80 -translate-y-[6px]" />
        <Link
          href={`mailto:${configs.contact.email}`}
          target="_blank"
          rel="noreferrer"
          className="group"
        >
          <span className="relative pb-1 ml-1">
            {configs.contact.email}
            <span className="absolute h-1 w-0 left-0 bottom-0 group-hover:w-full group-focus:w-full group-active:scale-95 bg-white transition-all ease-in-out" />
          </span>
        </Link>
      </span>
      <span className="text-xs sm:text-sm lg:text-base flex">
        <span className="hidden sm:block sm:float-left font-medium pr-1">
          Address{" "}
        </span>
        <AiOutlinePushpin className="float-left sm:hidden" />
        <span className="border-dotted border-b-2 grow border-white/80 -translate-y-[6px]" />
        <span className="ml-1">
          {configs.contact.address}
        </span>
      </span>
    </div>
  );
}

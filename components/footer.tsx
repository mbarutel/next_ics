import Link from "next/link";
import React from "react";
import {
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlinePushpin,
} from "react-icons/ai";
import Image from "next/image";
import { configs } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="pt-2">
      <div className="section_container">
        <div className="relative rounded-md overflow-hidden flex flex-col px-6 pt-10 pb-7 bg-gradient-to-br gradient_secondary text-gray-700">
          <div className="grid grid-cols-1 sm:grid-cols-2 mb-2 z-10 gap-2">
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
    <div className="w-full order-1 sm:order-none">
      <h3 className="uppercase font-bold tracking-tight md:text-lg lg:text-xl">
        Indigenous Conference Services
      </h3>
      <div className="flex gap-2">
        <Image
          src="/assets/images/flags.svg"
          alt="Australian Aboriginal Conferences"
          width={40}
          height={30}
          className="hidden lg:block"
        />

        <p className="leading-tight w-[450px]">
          We acknowledge the Traditional Owners and Custodians of the lands on
          which we work, live, and create. We pay our respects to their Elders
          past, present, and emerging.
        </p>
      </div>
    </div>
  );
}

function Contacts() {
  return (
    <div className="w-full sm:text-right">
      <h3 className="uppercase font-bold tracking-tight md:text-lg lg:text-xl">
        Contacts
      </h3>

      <div className="flex flex-col -mt-1">
        <Link
          href={`tel:${configs.contact.phone}`}
          className="hover:-translate-x-1 transition_config"
        >
          Phone{": "}
          {configs.contact.phone}
        </Link>

        <Link
          target="_blank"
          rel="noreferrer"
          href="https://www.instagram.com/ics_conferences/"
          className="hover:-translate-x-1 transition_config -mt-1"
        >
          Instagram{": "}
          @ics_conferences
        </Link>

        <Link
          target="_blank"
          rel="noreferrer"
          href={`mailto:${configs.contact.email}`}
          className="hover:-translate-x-1 transition_config -mt-1"
        >
          Email{": "}
          {configs.contact.email}
        </Link>
      </div>
    </div>
  );
}

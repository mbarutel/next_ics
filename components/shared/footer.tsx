import Link from "next/link";
import React from "react";
import Image from "next/image";
import { configs, links } from "@/lib/data";
import { RiMailFill, RiPhoneFill } from "react-icons/ri";

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="rounded-sm flex_col px-6 pt-7 pb-5 bg-yellow-400 text-stone-800">
          <div className="grid grid-cols-3 lg:grid-cols-5 gap-2 text-center lg:text-left text-xs lg:text-sm">
            <Links />
            <Forms />
            <Contacts />
            <Acknowledgement />
          </div>
          <small className="italic mx-auto text-xs mt-3 lg:mt-0">
            ©&nbsp;Indigenous&nbsp;Conference&nbsp;Services&nbsp;2023
          </small>
        </div>
      </div>
    </footer>
  );
}

function Acknowledgement() {
  return (
    <div className="hidden lg:block col-span-2 text-right">
      <h3 className="arvo uppercase font-bold tracking-tight text-lg lg:text-xl lg:mb-2">
        Indigenous Conference Services
      </h3>
      <div className="flex gap-2 justify-center">
        <p className="leading-tight w-[450px] ml-auto italic">
          We acknowledge the Traditional Owners and Custodians of the lands on
          which we work, live, and create. We pay our respects to their Elders
          past, present, and emerging.
        </p>
        <Image
          src="/assets/images/flags.svg"
          alt="Australian Aboriginal Conferences"
          width={40}
          height={30}
          className="hidden lg:block"
        />
      </div>
    </div>
  );
}

function Contacts() {
  const contacts = [
    {
      icon: React.createElement(RiMailFill),
      href: `mailto:${configs.contact.email}`,
      text: "Email",
    },
    {
      icon: React.createElement(RiPhoneFill),
      href: `tel:${configs.contact.phone}`,
      text: "Phone",
    },
  ];

  return (
    <div>
      <h3 className="arvo uppercase font-bold tracking-tight text-lg lg:text-xl lg:mb-2">
        Contacts
      </h3>

      <div className="flex flex-col">
        {contacts.map((contact, index) => (
          <Link key={index} href={contact.href}>
            <div className="flex gap-2 justify-center lg:justify-start items-center">
              <span className="text-lg">{contact.icon}</span>
              {contact.text}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function Forms() {
  const forms = [
    {
      href: configs.forms.submitPaper,
      text: "Become a Speaker",
    },
    {
      href: configs.forms.exhibitor,
      text: "Become a Exhibitor",
    },
    {
      href: configs.forms.sponsor,
      text: "Become a Sponsor",
    },
  ];

  return (
    <div>
      <h3 className="arvo uppercase font-bold tracking-tight text-lg lg:text-xl lg:mb-2">
        Join Us
      </h3>
      <div className="flex flex-col">
        {forms.map((form, index) => (
          <Link key={index} href={form.href}>
            {form.text}
          </Link>
        ))}
      </div>
    </div>
  );
}

function Links() {
  return (
    <div>
      <h3 className="arvo uppercase font-bold tracking-tight text-lg lg:text-xl lg:mb-2">
        Links
      </h3>
      <div className="flex flex-col">
        {links.map((link, index) => (
          <Link key={index} href={link.path}>
            {link.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

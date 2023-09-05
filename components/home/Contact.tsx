import React, { Fragment } from "react";
import Link from "next/link";
import { configs, links } from "@/lib/data";
import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai";

export default function Contact() {
  return (
    <footer className="bg-stone-700/90">
      <div className="container text-white/70">
        <div className="w-full flex flex-col sm:flex-row sm:justify-between items-center">
          <div className="order-1 sm:order-none">
            <div className="text-center">
              <h3 className="text-lg font-semibold uppercase">
                Indigenous Conference Services
              </h3>
              <div className="flex flex-col text-white/60">
                <span>8 Kiwi Court</span>
                <span>Point Vernon, Hervey Bay</span>
                <span>QLD Australia 4655</span>
              </div>
            </div>
            <div className="flex gap-5 justify-center mt-4">
              <a
                href={`mailto:${configs.contact.email}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center border-solid border-2 rounded-full border-white/70 p-2"
              >
                <AiOutlineMail className="text-4xl sm:mr-2" />
                <span className="font-bold hidden sm:block">
                  {configs.contact.email}
                </span>
              </a>
              <a
                href={`tel:${configs.contact.phone}`}
                className="flex items-center border-solid border-2 rounded-full border-white/70 p-2"
              >
                <AiOutlinePhone className="text-4xl sm:mr-2" />
                <span className="font-bold hidden sm:block">
                  {configs.contact.phone}
                </span>
              </a>
            </div>
          </div>
          <div className="flex flex-row sm:flex-col items-center py-4 gap-4">
            {links.map((link, index) => (
              <Fragment key={index}>
                <Link href={link.path} className="effects text-center">
                  {link.name}
                </Link>
              </Fragment>
            ))}
          </div>
        </div>
        <div>
          <small className="italic text-center mt-3">
            ©&nbsp;Indigenous&nbsp;Conference&nbsp;Services&nbsp;2023
          </small>
        </div>
      </div>
    </footer>
  );
}

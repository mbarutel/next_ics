import React from "react";
import { HiSpeakerphone } from "react-icons/hi";
import { PiMedalFill } from "react-icons/pi";
import { RiPresentationFill } from "react-icons/ri";
import { configs } from "@/lib/data";

export default function CallToAction() {
  return (
    <section>
      <div className="container text-center">
        <h3 className="text-center mb-8 text-3xl italic font-thin">
          Building better future together
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <div className="advantage_card">
              <HiSpeakerphone className="text-4xl mb-3" />
              <strong className="text-2xl">
                Keynotes
              </strong>
              <p className="italic text-center">
                Share your passion through ICS
              </p>
            </div>
            <a
              href={configs.forms.submitPaper}
              className="border-b-[1px] inline-block mt-4 transition-all hover:scale-105 text-2xl"
              target="_blank"
              rel="noreferrer"
            >
              <span className="text-lg lg:text-2xl">
                Become a Speaker
              </span>
            </a>
          </div>
          <div>
            <div className="advantage_card">
              <RiPresentationFill className="text-4xl mb-3" />
              <strong className="text-2xl">
                Exhibitions
              </strong>
              <p className="italic text-center">
                Connect, Engage, & Exhibit at ICS
              </p>
            </div>
            <a
              href={configs.forms.exhibitor}
              className="border-b-[1px] inline-block mt-4 transition-all hover:scale-105 text-2xl"
              target="_blank"
              rel="noreferrer"
            >
              <span className="text-lg lg:text-2xl">
                Become an Exhibitor
              </span>
            </a>
          </div>
          <div>
            <div className="advantage_card">
              <PiMedalFill className="text-4xl mb-3" />
              <strong className="text-2xl">
                Sponsorship
              </strong>
              <p className="italic text-center">
                Partner with us at ICS
              </p>
            </div>
            <a
              href={configs.forms.sponsor}
              className="border-b-[1px] inline-block mt-4 transition-all hover:scale-105 text-2xl"
              target="_blank"
              rel="noreferrer"
            >
              <span className="text-lg lg:text-2xl">
                Become a Sponsor
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

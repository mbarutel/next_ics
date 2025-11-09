import "./conference.css";

import { ConferenceType, MasterclassType, EventType } from "@/lib/types";
import FormButtons from "../shared/form-buttons";
import Link from "next/link";
import React from "react";

type ConferenceProps = {
  conference: ConferenceType;
};

export default function ConferenceAbout({ conference }: ConferenceProps) {
  return (
    <section id="about" className="section_margin bg_accent">
      <div className="section_container">
        <h2 className="title text-center">About the Conference</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 mb-4 lg:py-6">
          <Events events={conference.events} />
          <Masterclass masterclass={conference.masterclass} />
          <NetworkingDinner />
          <Accommodation venue={conference.venue} />
        </div>
        <FormButtons
          registration={`/forms/delegates?conference=${conference.slug}`}
          submitPaper={conference.submitPaperLink}
        />
      </div>
    </section>
  );
}

type EventsProps = {
  events: EventType[];
};
function Events({ events }: EventsProps) {
  return (
    <div className="about_card_wrapper">
      <h3 className="about_card_title">Conference Events</h3>
      <h5 className="about_card_subtitle">
        By registering, you get access to all keynotes and panels
      </h5>
      <ul className="ul mb-6 about_card_content">
        {events.map((theme) => (
          <li key={theme.slug}>{theme.title}</li>
        ))}
      </ul>
      <Link href="#events" className="underline text-white">
        Learn more about events
      </Link>
    </div>
  );
}

type MasterclassProps = {
  masterclass: MasterclassType[];
};
function Masterclass({ masterclass }: MasterclassProps) {
  return (
    <div className="about_card_wrapper">
      <h3 className="about_card_title">POST-CONFERENCE MASTERCLASS</h3>
      <h5 className="about_card_subtitle">(optional, AUD$350 per person)</h5>
      {
        masterclass.length
          ? (
            <ul className="ul about_card_content">
              {masterclass.map((cla) => (
                <li key={cla.slug}>{cla.title}</li>
              ))}
            </ul>

          ) : (
            <p className="about_card_content">To be announced</p>
          )
      }
    </div>
  );
}

function NetworkingDinner() {
  return (
    <div className="about_card_wrapper">
      <h3 className="about_card_title">Conference Networking Dinner</h3>
      <h5 className="about_card_subtitle">(optional, AUD$150 per person)</h5>
      <p className="about_card_content">Networking Dinner</p>
    </div>
  );
}

type AccommodationProps = {
  venue: string;
};
function Accommodation({ venue }: AccommodationProps) {
  return (
    <div className="about_card_wrapper">
      <h3 className="about_card_title">Accommodation</h3>
      <h5 className="about_card_subtitle">(optional, from AUD$300 per night)</h5>
      <p className="about_card_content">{`Accommodation at ${venue}`}</p>
    </div>
  );
}

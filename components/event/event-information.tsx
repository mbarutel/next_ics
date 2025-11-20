import React from "react";
import EventContent from "./event-content";
import { EventType } from "@/lib/types";
import EventQuickInfo from "./event-quick-info";
import FloatingCTA from "./floating-cta";
import InfoCard from "./info-card";
import CTAButtons from "./cta-buttons";
import EventAgendaCard from "./event-agenda-card";
import ContactForm from "../contact-form";
import {
  BenefitsForEmployer,
  CallingForPapers,
  EventAcknowledgement,
  GuestSpeakers,
  Registration,
  SponsoringTheConference,
  WhyAttend,
} from "./event-static-text";

export default function EventInformation(event: EventType) {
  const conferenceSlug = event.conference?.slug || "";
  const agenda = event.conference?.agenda || [];

  return (
    <>
      <a
        href="#event-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-yellow-400 focus:text-stone-900 focus:px-4 focus:py-2 focus:rounded-md font:font-bold"
      >
        Skip to event content
      </a>
      <section id="information" className="section_margin">
        <div className="section_container">
          {/* Quick Info - Integrated into flow */}
          <EventQuickInfo event={event} />

          {/* Main Content Area - Seamless integration */}
          <div className="mt-8">
            {/* Main Article Content */}
            <article id="event-content">
              <EventContent event={event} poster={event.poster} />
            </article>

            {/* Key Information Cards - Immediately following content */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
              <InfoCard title="Acknowledgement to Country" variant="highlighted">
                <EventAcknowledgement />
              </InfoCard>

              <InfoCard title="Why Attend" variant="default">
                <WhyAttend />
              </InfoCard>

              <InfoCard title="Guest Speakers" variant="default">
                <GuestSpeakers />
              </InfoCard>
            </div>

            {/* Agenda Section */}
            {agenda.length > 0 && (
              <div className="mt-12">
                <EventAgendaCard agenda={agenda} />
              </div>
            )}

            {/* Registration - Prominent positioning */}
            <div className="mt-12">
              <InfoCard title="Registration" variant="highlighted">
                <Registration />
              </InfoCard>
            </div>

            {/* CTA Buttons - Following registration */}
            {conferenceSlug && (
              <div className="mt-8">
                <CTAButtons conferenceSlug={conferenceSlug} />
              </div>
            )}

            {/* Additional Information - Collapsible sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
              <div>
                <BenefitsForEmployer />
              </div>

              <div>
                <CallingForPapers />
              </div>
            </div>

            {/* Sponsorship Section */}
            <div className="mt-8">
              <SponsoringTheConference />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form - Outside Grid, Full Width Section */}
      <ContactForm />

      {event.conference && <FloatingCTA conferenceSlug={event.conference.slug} />}
    </>
  );
}

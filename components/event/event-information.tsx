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
          {/* Quick Info - Full Width */}
          <EventQuickInfo event={event} />

          {/* Main Article - Full Width, No Grid */}
          <article id="event-content" className="mt-6">
            <EventContent event={event} poster={event.poster} />
          </article>

          {/* Info Cards Section - Grid Below Article */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {/* Acknowledgement */}
            <InfoCard icon="🪃" title="Acknowledgement to Country" variant="highlighted">
              <EventAcknowledgement />
            </InfoCard>

            {/* Why Attend */}
            <InfoCard icon="✨" title="Why Attend" variant="default">
              <WhyAttend />
            </InfoCard>

            {/* Guest Speakers */}
            <InfoCard icon="🎙️" title="Guest Speakers" variant="default">
              <GuestSpeakers />
            </InfoCard>
          </div>

          {/* Agenda Section - Full Width (if available) */}
          {agenda.length > 0 && (
            <div className="mt-6">
              <EventAgendaCard agenda={agenda} />
            </div>
          )}

          {/* Bottom Section - Full Width Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {/* Benefits for Employer - Collapsible */}
            <div>
              <BenefitsForEmployer />
            </div>

            {/* Calling for Papers - Collapsible */}
            <div>
              <CallingForPapers />
            </div>
          </div>

          {/* Registration Section - Full Width */}
          <div className="mt-6">
            <InfoCard icon="📝" title="Registration" variant="highlighted">
              <Registration />
            </InfoCard>
          </div>

          {/* CTA Buttons */}
          {conferenceSlug && (
            <div className="mt-6">
              <CTAButtons conferenceSlug={conferenceSlug} />
            </div>
          )}

          {/* Sponsorship Section - Full Width */}
          <div className="mt-6">
            <SponsoringTheConference />
          </div>
        </div>
      </section>

      {/* Contact Form - Outside Grid, Full Width Section */}
      <ContactForm />

      {event.conference && <FloatingCTA conferenceSlug={event.conference.slug} />}
    </>
  );
}

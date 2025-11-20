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
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-yellow-400 focus:text-stone-900 focus:px-4 focus:py-2 focus:rounded-sm font:font-semibold"
      >
        Skip to event content
      </a>
      <section id="information" className="section_margin">
        <div className="section_container space-y-16 sm:space-y-20">
          {/* Quick Info */}
          <EventQuickInfo event={event} />

          {/* Main Article Content */}
          <article id="event-content">
            <EventContent event={event} poster={event.poster} />
          </article>

          {/* Key Information */}
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
          </div>

          {/* Agenda Section */}
          {agenda.length > 0 && (
            <div className="max-w-6xl mx-auto">
              <EventAgendaCard agenda={agenda} />
            </div>
          )}

          {/* Registration */}
          <div className="max-w-6xl mx-auto">
            <InfoCard title="Registration" variant="highlighted">
              <Registration />
            </InfoCard>
          </div>

          {/* CTA Buttons */}
          {conferenceSlug && (
            <div className="max-w-6xl mx-auto">
              <CTAButtons conferenceSlug={conferenceSlug} />
            </div>
          )}

          {/* Additional Information */}
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <BenefitsForEmployer />
              </div>

              <div>
                <CallingForPapers />
              </div>
            </div>
          </div>

          {/* Sponsorship Section */}
          <div className="max-w-6xl mx-auto">
            <SponsoringTheConference />
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <ContactForm />

      {event.conference && <FloatingCTA conferenceSlug={event.conference.slug} />}
    </>
  );
}

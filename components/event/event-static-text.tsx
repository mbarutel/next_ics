import { configs } from "@/lib/data";
import HeaderUnderline from "../rich-text-elements/header-underline";
import CollapsibleSection from "./collapsible-section";
import "./event.css";

export function EventAcknowledgement() {
  return (
    <>
      <p className="text-stone-300 leading-relaxed mb-3">
        In Australia, the protocol is to recognise the Traditional Owners of the
        land to which we are gathering. Therefore, all presentations must begin
        with an acknowledgement to country and to local Traditional Elders: "We
        wish to acknowledge and respect the traditional custodians whose
        ancestral lands we are to meet upon. We acknowledge the deep feelings of
        attachment and relationship of Aboriginal peoples to Country. We also
        pay respects to the cultural authority of Aboriginal peoples visiting /
        attending from other areas of Australia who are present here".
      </p>

      <p className="text-stone-300 leading-relaxed">
        Indigenous Conference Services acknowledges and pay our respect to the
        Traditional people of the Country. "Welcome to Country" ceremony and
        "acknowledging the traditional custodians" of the land shows respect for
        Aboriginal people as Australia's First Peoples. Ceremonies and protocols
        are a fundamental part of Aboriginal cultures.
      </p>
    </>
  );
}

export function WhyAttend() {
  return (
    <p className="text-stone-300 leading-relaxed">
      This conference presents a unique opportunity for delegates to
      participate in a positive environment that is dedicated to the sharing
      of information and the empowering of all who attend. In our everyday
      working environment the day to day stresses of our positions tends to
      limit us in expanding our knowledge and networking. Whether you work at
      a community level or at governmental level the opportunity to network
      and gain contacts outside of your local region tend to be limited, this
      is why this conference will be so valuable to participants.
    </p>
  );
}

export function YourInvitation() {
  return (
    <div className="px-3">
      <HeaderUnderline>
        <h1 className="primary_title">Your Invitation</h1>
      </HeaderUnderline>
      <p className="rich_text_p">
        We wish to invite Indigenous and non-Indigenous people from Australia
        and throughout, to attend the conference to share and gather
        information. We also extend an invitation to participants to join us at
        the conference dinner in a relaxed atmosphere. To ensure that delegates
        attend and participate fully in the conference experience, it is
        important to note that to show accountability of delegates in meeting
        their obligation; each delegate will receive a Certificate of Attendance
        only when they attend 85% of all the conference sessions. In addition at
        the end of the conference, delegates will receive a copy of all papers &
        presentations presented at the conference through Dropbox.{" "}
      </p>
      <ul className="ul">
        <li>Who:\tIndividuals, Groups, NGO’s, Government Agencies & Others</li>
        <li>When: October 4-6, 2024</li>
        <li>Where: Shangri-La Hotel Cairns QLD Australia</li>
        <li>Time: 9.00am - 5:00pm</li>
      </ul>
      <p className="rich_text_p">
        WARNING: Limited availability. Please register online or contact us via
        email, should you have any further queries.
      </p>
    </div>
  );
}

export function BenefitsForEmployer() {
  return (
    <div className="px-3">
      <CollapsibleSection
        title="Benefits of Attending for the Employer"
        icon="💼"
        defaultOpen={false}
      >
        <p className="rich_text_p">
          As an employee, we are asked to present valid reasons why we should
          attend. Listed below are valid points that can be raised with your
          employer to justify your attendance: Staff attending conferences
          regularly tend to become long term employees. An event such as this adds
          to the positive morale of staff.{" "}
        </p>
        <ul className="ul mb-2">
          <li>
            Staff attending conferences regularly tend to become long-term
            employees.
          </li>
          <li>An event such as this adds to the positive morale of staff.</li>
          <li>Conferences are a great way of providing ongoing training.</li>
          <li>
            Provides the opportunity to further enhance the organisation's
            knowledge base.
          </li>
          <li>
            The opportunity for saving organisations money because of the short
            duration of the event.
          </li>
          <li>
            Allows delegates to showcase the organisation nationally and
            internationally.
          </li>
          <li>May provide organisations with new ideas.</li>
          <li>Gives organisations a showcase and voice at a national level.</li>
          <li>Provide an opportunity to evaluate various programs.</li>
          <li>
            Because this event is conducted over a short period, staff are only
            absent for a minimal number of days.
          </li>
        </ul>
      </CollapsibleSection>
    </div>
  );
}

export function CallingForPapers() {
  return (
    <div className="px-3">
      <CollapsibleSection
        title="Calling for Papers"
        icon="📝"
        defaultOpen={false}
      >
        <p className="rich_text_p">
          To ensure grassroots community programs are highlighted, no less than 50
          per cent of the conference proceedings are and is devoted to community
          groups. If your paper is selected, you may have more than one presenter
          to present your paper. However, only two presenters will be entitled to
          the registration discount. If you are chosen to present at the
          conference, your paper will form part of the conference proceedings and
          be distributed at the conclusion of the event with all other
          presentations.
        </p>
        <p className="rich_text_p font-bold">Guidelines in Submitting Paper:</p>
        <ul className="ul mb-2">
          <li>
            Papers should not contain offensive language and take into account
            cultural sensitivities of Australian first nation people.
          </li>
          <li>
            Papers must treat the themes in a manner that contributes to further
            discussion of conference aims.
          </li>
          <li>
            Conference papers must be presented in the finished format not less
            than 60 days prior to the event.
          </li>
          {/* <li> */}
          {/*   The second round of calling for papers closing date will be on April */}
          {/*   30, 2024. */}
          {/* </li> */}
          <li>
            Papers that are not chosen in the first round may be resubmitted in
            the second round.
          </li>
          <li>
            Papers MUST be submitted in Microsoft Word format. Papers in other
            formats will NOT be considered.
          </li>
          <li>
            Authors of papers presented at the conference will be formally
            notified of their acceptance in writing.
          </li>
          <li>
            A registration fee of $850 will apply to all persons submitting
            papers, payable within 7 days upon notification of acceptance.
          </li>
          <li>
            Papers should explore ways in which the themes show up in the
            philosophy of the conference.
          </li>
          <li>
            All papers must be presented in a positive and informative light.
          </li>
          <li>
            To submit a paper, please complete the online form at this link:{" "}
            <a href={configs.forms.submitPaper}>SUBMIT A PAPER HERE</a>.
          </li>
          <li>
            Conferences are a great way of providing ongoing training and provide
            the opportunity to further enhance the organisation's knowledge base.
          </li>
          <li>
            Allows delegates to showcase the organisation nationally and
            internationally.
          </li>
          <li>
            May provide organisations with new ideas and gives organisations a
            voice at a national/international level.
          </li>
          <li>Provides an opportunity to evaluate various programs.</li>
          <li>
            Because this event is conducted over a short period, staff are only
            absent for a minimal amount of time.
          </li>
        </ul>
      </CollapsibleSection>
    </div>
  );
}

export function GuestSpeakers() {
  return (
    <p className="text-stone-300 leading-relaxed">
      The event is blessed with a kaleidoscope of guest speakers, sharing
      stories, successes and challenges they've overcome, presenting great
      opportunities and inspiration for delegates to participate in an event
      that is devoted to the sharing of Culture, Empowerment, Education &
      Networking. Drawn from a variety of cultural backgrounds, professional
      careers, and grassroots community commitments, this year's conference
      speakers are the difference between an ordinary and extraordinary event;
      one that is soon forgotten and one which lingers in attendees' memories,
      a source of tremendous benefit long after the conference is over.
    </p>
  );
}

export function Registration() {
  return (
    <>
      <div className="p-4 mb-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 rounded-md">
        <p className="font-bold">💰 Early Bird Discount Available!</p>
        <p className="text-sm">Register early to save on registration fees. Pricing changes monthly!</p>
      </div>
      <p className="text-stone-300 leading-relaxed mb-3">
        Please note that registrations are set out in an affordable way for
        organisations, which changes on a monthly basis. Hence the earlier you
        register, the more savings for your organisation. Registration fees
        include all-day access to the event, available conference papers, daily
        lunch, and refreshments for registered delegates only. Fees do not
        include travel costs or accommodation.
      </p>
      <div className="p-4 bg-orange-100 border-l-4 border-orange-500 text-orange-800 rounded-md">
        <p className="font-bold">⚠️ Important Payment Terms</p>
        <p className="text-sm">
          Registration fees must be received within <strong>7 DAYS</strong> from
          being issued an invoice. Otherwise, bookings will not be considered.
        </p>
      </div>
    </>
  );
}

export function SponsoringTheConference() {
  return (
    <div className="px-3">
      <CollapsibleSection
        title="Sponsoring the Conference"
        icon="🤝"
        defaultOpen={false}
      >
        <p className="rich_text_p">
          Flexible sponsorship packages are available. Sponsorship opportunities
          are only open to businesses and private enterprises, not individuals. To
          showcase your organisation to all conference delegates, ICS has
          developed hassle-free promotional opportunities and sponsorship packages
          according to your budget and tailored to your organisation's needs.
        </p>
        <ul className="ul mb-2">
          <li>
            <strong>Gold Sponsorship ($10,000)</strong> includes: Keynote session or Break-out
            sessions, Waived registration fees for your selected staff,
            Complimentary seats at networking conference dinner, Complimentary
            display table & USB with photos for reporting purposes.
          </li>
          <li>
            <strong>Silver Sponsorship ($7,000)</strong> includes: Keynote session, Waived
            registration fees for your selected staff, Complimentary seats at
            networking conference dinner, Complimentary display table & USB with
            photos for reporting purposes.
          </li>
          <li>
            <strong>Bronze Sponsorship ($5,000)</strong> includes: Break-out Session, Waived
            registration fee for your selected staff, Complimentary Display Table
            & USB with photos for reporting purposes.
          </li>
        </ul>
        <p className="rich_text_p">
          To sponsor the conference, please contact us. Indigenous Conference
          Services (Australia) will be of further assistance in tailoring your
          sponsorship arrangement. Please phone us on +61 4557 76 668 or send us
          your expression of interest to admin@icsconferences.org.
        </p>
      </CollapsibleSection>
    </div>
  );
}


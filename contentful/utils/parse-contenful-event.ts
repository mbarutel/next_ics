import coverImageParse from "./cover-image-parse";
import {
  AgendaType,
  ConferenceInEventType,
  ConferencesEntry,
  EventEntry,
  EventType,
  MasterclassEntry,
} from "../types/types";
import parseContentfulMasterClass from "./parse-contenful-masterclass";

function parseConferenceInEvent(
  conference: ConferencesEntry,
): ConferenceInEventType {
  let masterclasses;

  if (conference.fields.masterclass !== undefined) {
    masterclasses = conference.fields.masterclass.filter((masterclass) =>
      masterclass.sys.type === "Entry"
    ).map((masterclass) =>
      parseContentfulMasterClass(masterclass as MasterclassEntry)
    );
  } else {
    masterclasses = undefined;
  }

  return {
    masterclass: masterclasses,
    venue: conference.fields.venue,
    endDate: conference.fields.endDate,
    startDate: conference.fields.startDate,
    registrationLink: conference.fields.registrationLink,
  };
}

// function parseAgendaInEvent({ agenda }: { agenda: any }) {
//   console.log(agenda);
// }

export default function parseContentfulEvent(
  eventEntry: EventEntry,
): EventType {
  const coverImage = coverImageParse({
    coverImage: eventEntry.fields.coverImage,
  });

  const conference = parseConferenceInEvent(
    eventEntry.fields.conference as ConferencesEntry,
  );

  const agenda = eventEntry.fields.agenda === undefined
    ? undefined
    : eventEntry.fields.agenda as AgendaType[];

  return {
    title: eventEntry.fields.title,
    description: eventEntry.fields.description,
    content: eventEntry.fields.content,
    slug: eventEntry.fields.slug,
    tags: eventEntry.fields.tags,
    coverImage: coverImage,
    conference: conference,
    agenda: agenda,
    // media: conferenceEntry.fields.media,
  };
}

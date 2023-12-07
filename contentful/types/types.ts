// import {
//   TypeConferencesSkeleton,
//   TypeEventSkeleton,
//   TypeMasterclassSkeleton,
//   TypeSpeakerSkeleton,
// } from "../types/contentful/types";
// import { Entry } from "contentful";
// import { Omit } from "@react-spring/web";
// import { Document as RichTextDocument } from "@contentful/rich-text-types";
//
// export type ConferencesEntry = Entry<
//   TypeConferencesSkeleton,
//   undefined,
//   string
// >;
// export type MasterclassEntry = Entry<
//   TypeMasterclassSkeleton,
//   undefined,
//   string
// >;
// export type EventEntry = Entry<TypeEventSkeleton, undefined, string>;
// export type SpeakerEntry = Entry<TypeSpeakerSkeleton, undefined, string>;
//
// export type ConferenceType = {
//   slug: string;
//   title: string;
//   venue: string;
//   endDate: string;
//   startDate: string;
//   coverImage: AssetType;
//   events: EventCardType[];
//   speakers: SpeakerType[];
//   registrationLink: string;
//   masterclass: MasterclassType[];
//   submitPaperLink: string | undefined;
// };
//
// export type ConferenceInEventType = Omit<
//   ConferencesType,
//   "slug" | "tite" | "events" | "coverImage" | "speakers"
// >;
//
// export type EventType = {
//   slug: string;
//   title: string;
//   tags: string[];
//   description: string;
//   agenda: AgendaType[];
//   coverImage: AssetType;
//   content: RichTextDocument;
//   conference: ConferenceInEventType | undefined;
// };
//
// export type AssetType = {
//   src: string;
//   alt: string;
// };
//
// export type MasterclassType = {
//   title: string;
//   slug: string;
//   description: RichTextDocument;
//   asset: AssetType | undefined;
// };
//
// export type SpeakerType = {
//   name: string;
//   slug: string;
//   jobTitle: string;
//   photo: AssetType;
//   organization: string;
//   biography: RichTextDocument;
// };
//
// export type AgendaRowType = {
//   time: string;
//   agenda: string[];
// };
//
// export type AgendaType = {
//   title: string;
//   row: AgendaRowType[];
// };

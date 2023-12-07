// import { Entry, UnresolvedLink } from "contentful";
// import { TypeMasterclassSkeleton, TypeSpeakerSkeleton } from "../types/contentful/types";
// import { SpeakerEntry, SpeakerType } from "../types/types";
// import parseContentfulMasterClass from "./parse-contenful-masterclass";
//
// export default function parserSpeakerInConference(
//   speakers:
//     | (
//       | UnresolvedLink<"Entry">
//       | Entry<TypeSpeakerSkeleton, undefined, string>
//     )[]
//     | undefined,
// ): SpeakerType[] {
//   if (speakers) {
//     return speakers.filter((speaker) =>
//       speaker.sys.type === "Entry"
//     )
//       .map((speaker) =>
//         parseContentfulMasterClass(speaker as SpeakerEntry)
//       );
//   } else {
//     return [];
//   }
// }

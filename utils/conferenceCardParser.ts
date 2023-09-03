// import { ConferencePage } from "@/contentful/types/types";
// import { configs } from "@/lib/data";
//
// export type ConferenceCardProps = {
//   title: string;
//   slug: string;
//   startDate: string;
//   endDate: string;
//   coverImage: string;
// };
//
// export default function conferenceCardParser(
//   { conferencePage }: ConferencePage,
// ): ConferenceCardProps {
//   let coverImage;
//   if (!conferencePage.coverImage) {
//     coverImage = configs.defaultCoverImage;
//   } else {
//     coverImage = conferencePage.coverImage.src;
//   }
//
//   return ({conferencePage.title,
//     conferencePage.slug,
//     conferencePage.startDate,
//     conferencePage.endDate,
//     coverImage});
// }

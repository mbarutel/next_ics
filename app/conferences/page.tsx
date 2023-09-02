// import React from "react";
// import { client } from "@/services/conferences";
// import type { GetStaticProps, InferGetStaticPropsType } from "next";
//
// export const getStaticProps: GetStaticProps<{
//   conference: unknown;
// }> = async () => {
//   const response = await client.getEntries({ content_type: "Conference" });
//
//   console.log(response);
//   return {
//     props: {
//       post: response.items,
//       revalidate: 60,
//     },
//   };
// };
//
// export default function Page({
//   posts,
// }: InferGetStaticPropsType<typeof getStaticProps>) {
//   console.log(posts);
//
//   return (
//     <section className="section">
//       <div className="container">
//       </div>
//     </section>
//   );
// }
import React from "react";
import { fetchConferencePages } from "@/services/conferences";
import { draftMode } from "next/headers";
import Link from "next/link";

export default async function Page() {
  const conferencePages = await fetchConferencePages({
    preview: draftMode().isEnabled,
  });

  return (
    <main className="p-[6vw]">
      <div className="prose">
        <h1 className="text-3xl font-bold">Main Page</h1>
        <ul>
          {conferencePages.map((conferencePage) => {
            return (
              <li key={conferencePage.title}>
                <Link href={`/conferences/${conferencePage.slug}`}>
                  {conferencePage.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </main>
  );
}

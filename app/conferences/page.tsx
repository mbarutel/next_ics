import React from "react";
import { fetchConferencePages } from "@/contentful/services/conferences";
import { draftMode } from "next/headers";
import Link from "next/link";

export default async function page() {
  const conferencePages = await fetchConferencePages({
    preview: draftMode().isEnabled,
  });

  return (
    <section>
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
    </section>
  );
}

import { draftMode } from "next/headers";
import { fetchConferencePages } from "@/contentful/services/conferences";
import Link from "next/link";

export default async function Home() {
  const conferencePages = await fetchConferencePages({
    preview: draftMode().isEnabled,
  });

  return (
    <main className="p-[6vw]">
      <div className="container">
        <h1 className="text-3xl font-bold">Main Page</h1>
        <ul>
          {conferencePages.map((conferencePage) => {
            return (
              <li key={conferencePage.title}>
                <Link href={`/conferences/${conferencePage.slug}`}>{conferencePage.title}</Link>
              </li>
            )
          })}
        </ul>
      </div>
    </main>
  );
}

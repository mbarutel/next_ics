import React from "react";
import { ContactForm, Header } from "@/components";
import { fetchConferences } from "@/contentful";

export default async function page() {
  const conferences = await fetchConferences({ preview: false });
  return (
    <>
      <Header conferences={conferences} />
      <ContactForm />
    </>
  );
}

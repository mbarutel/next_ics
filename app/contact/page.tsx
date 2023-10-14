import React from "react";
import Header from "@/components/common/Header";
import ContactForm from "@/components/contact/ContactForm";
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

import React from "react";
import Header from "@/components/common/Header";
import ContactForm from "@/components/contact/ContactForm";

export default function page() {
  return (
    <>
      <Header
        link="#contact"
        text="To get started, check the information below"
      />
      <ContactForm />
    </>
  );
}

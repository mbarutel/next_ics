"use client";
import React from "react";
import { sendEmail } from "@/actions/send-email";
import SubmitBtn from "@/components/contact/SubmitBtn";
import toast from "react-hot-toast";
import { configs } from "@/lib/data";

export default function ContactForm() {
  return (
    <section id="contact">
      <div className="container flex flex-col items-center">
        <div>
          <h2 className="section_header text-center text-amber-800">Contact Us</h2>
          <p className="text-stone-700">
            Please contact us direcly at{" "}
            <a
              href={`mailto:${configs.contact.email}`}
              className="underline"
            >
              {configs.contact.email}
            </a>{" "}
            or through this form.
          </p>
        </div>
        <form
          action={async (formData) => {
            const { error } = await sendEmail(formData);

            if (error) {
              toast.error(error);
              return;
            }
            toast.success("Email sent successfully");
          }}
          className="mt-10 flex flex-col gap-3 w-[min(100%,40rem)]"
        >
          <input
            required
            name="senderEmail"
            type="email"
            maxLength={500}
            placeholder="Your email"
            className="h-14 px-4 rounded-lg border-solid border-[1px] border-stone-500/60 transition-all"
          />
          <input
            required
            name="senderSubject"
            maxLength={500}
            placeholder="Your Subject"
            className="h-14 px-4 rounded-lg border-solid border-[1px] border-stone-500/60 transition-all"
          />
          <textarea
            required
            name="message"
            maxLength={5000}
            placeholder="Your message"
            className="h-52 p-4 rounded-lg border-solid border-[1px] border-stone-500/60 transition-all"
          />
          <SubmitBtn />
        </form>
      </div>
    </section>
  );
}

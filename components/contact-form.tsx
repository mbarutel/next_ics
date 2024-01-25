"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import { configs } from "@/lib/data";
import SubmitButton from "./submit-button";
import { sendEmail } from "@/actions/send-email";

export default function ContactForm() {
  return (
    <section className="section_margin">
      <div className="section_container grid lg:grid-cols-2 gap-2">
        <div className="relative hidden lg:block rounded-sm overflow-hidden">
          <Image
            src="/assets/images/contact-us.webp"
            alt="Contact us ICS"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover image_hover"
          />
        </div>
        <div>
          <h2 className="w-fit section_header mb-1">
            Contact Us
          </h2>
          <small className="text-sm lg:text-base">
            Please contact us direcly at{" "}
            <Link
              href={`mailto:${configs.contact.email}`}
              className="underline"
            >
              {configs.contact.email}
            </Link>{" "}
            or through this form.
          </small>
          <form
            action={async (formData) => {
              const { error } = await sendEmail(formData);

              if (error) {
                toast.error(error);
                return;
              }
              toast.success("Email sent successfully");
            }}
            className="mt-3 lg:mt-6 flex flex-col gap-3"
          >
            <input
              required
              name="senderEmail"
              type="email"
              maxLength={500}
              placeholder="Your email"
              className="rounded-md h-14 px-4 bg-black/20 backdrop-blur-md text-white border-solid border-[1px] border-stone-500/60 transition-all placeholder-white"
            />
            <input
              required
              name="senderSubject"
              maxLength={500}
              placeholder="Your Subject"
              className="rounded-md h-14 px-4 bg-black/20 backdrop-blur-md text-white border-solid border-[1px] border-stone-500/60 transition-all placeholder-white"
            />
            <textarea
              required
              name="message"
              maxLength={5000}
              placeholder="Your message"
              className="rounded-md h-52 p-4 bg-black/20 backdrop-blur-md text-white border-solid border-[1px] border-stone-500/60 transition-all placeholder-white"
            />
            <SubmitButton />
          </form>
        </div>
      </div>
    </section>
  );
}

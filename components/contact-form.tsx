"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import { configs } from "@/lib/data";
import SubmitButton from "./submit-button";
import { sendEmail } from "@/actions/send-email";
import SectionHeaderText from "./section-header-text";
import {
  RiMailLine,
  RiPhoneLine,
  RiMapPinLine,
  RiGlobalLine,
} from "react-icons/ri";

export default function ContactForm() {
  return (
    <section className="section_margin">
      <div className="section_container">
        {/* Header with warm welcome */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <SectionHeaderText>Let&apos;s Connect</SectionHeaderText>
          <p className="text-base lg:text-lg mt-4 text-stone-200">
            We&apos;d love to hear from you. Whether you have a question about
            our conferences, registration, or anything else, our team is ready
            to answer all your questions.
          </p>
        </div>

        {/* Two-column layout: Contact info + Form */}
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Left Column - Contact Information */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image with Business Card Overlay */}
            <div className="relative rounded-lg overflow-hidden h-80 lg:h-96">
              <Image
                src="/assets/images/contact-us.webp"
                alt="Contact us ICS"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 40vw, 33vw"
                className="object-cover"
              />
              {/* Business Name Card Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent backdrop-blur-sm p-6">
                <h3 className="text-xl font-semibold mb-2 text-white">
                  {configs.contact.businessName.split(" trading as ")[1] ||
                    configs.contact.businessName}
                </h3>
                <p className="text-sm text-stone-200">
                  {configs.contact.businessName.split(" trading as ")[0]}
                </p>
              </div>
            </div>

            {/* Contact Methods */}
            <div className="space-y-6">
              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-black/30 backdrop-blur-md rounded-lg flex items-center justify-center border border-stone-500/30">
                  <RiPhoneLine className="text-2xl text-stone-200" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold mb-1">Phone</h4>
                  <div className="space-y-1 text-sm lg:text-base">
                    <p>
                      <Link
                        href={`tel:${configs.contact.phone.replace(/\s/g, "")}`}
                        className="text-stone-300 hover:text-white transition-colors"
                      >
                        {configs.contact.phone}
                      </Link>
                    </p>
                    <p>
                      <Link
                        href={`tel:${configs.contact.phoneSecondary}`}
                        className="text-stone-300 hover:text-white transition-colors"
                      >
                        {configs.contact.phoneSecondary}
                      </Link>
                    </p>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-black/30 backdrop-blur-md rounded-lg flex items-center justify-center border border-stone-500/30">
                  <RiMailLine className="text-2xl text-stone-200" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold mb-1">Email</h4>
                  <p className="text-sm lg:text-base">
                    <Link
                      href={`mailto:${configs.contact.email}`}
                      className="text-stone-300 hover:text-white transition-colors break-all"
                    >
                      {configs.contact.email}
                    </Link>
                  </p>
                  <p className="text-xs text-stone-400 mt-1">
                    We typically respond within 24-48 hours
                  </p>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-black/30 backdrop-blur-md rounded-lg flex items-center justify-center border border-stone-500/30">
                  <RiMapPinLine className="text-2xl text-stone-200" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold mb-1">Mailing Address</h4>
                  <p className="text-sm lg:text-base text-stone-300">
                    {configs.contact.address}
                  </p>
                </div>
              </div>

              {/* Website */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-black/30 backdrop-blur-md rounded-lg flex items-center justify-center border border-stone-500/30">
                  <RiGlobalLine className="text-2xl text-stone-200" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold mb-1">Website</h4>
                  <p className="text-sm lg:text-base">
                    <Link
                      href={`https://${configs.contact.website}`}
                      className="text-stone-300 hover:text-white transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {configs.contact.website}
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="lg:col-span-3 my-auto">
            <div className="bg-black/20 backdrop-blur-md rounded-lg p-6 lg:p-8 border border-stone-500/30 flex flex-col">
              <h3 className="text-2xl font-semibold mb-2">Send us a message</h3>
              <p className="text-sm lg:text-base text-stone-300 mb-6">
                Fill out the form below and we&apos;ll get back to you as soon
                as possible.
              </p>

              <form
                action={async (formData) => {
                  const { error } = await sendEmail(formData);

                  if (error) {
                    toast.error(error);
                    return;
                  }
                  toast.success(
                    "Message sent successfully! We'll be in touch soon."
                  );
                }}
                className="flex-1 flex flex-col space-y-4"
              >
                <div>
                  <label
                    htmlFor="senderEmail"
                    className="block text-sm font-medium mb-2"
                  >
                    Your Email <span className="text-red-400">*</span>
                  </label>
                  <input
                    required
                    id="senderEmail"
                    name="senderEmail"
                    type="email"
                    maxLength={500}
                    placeholder="you@example.com"
                    className="w-full rounded-lg h-12 px-4 bg-black/30 backdrop-blur-md text-white border border-stone-500/50 transition-all placeholder:text-stone-400 focus:border-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-500/20"
                  />
                </div>

                <div>
                  <label
                    htmlFor="senderSubject"
                    className="block text-sm font-medium mb-2"
                  >
                    Subject <span className="text-red-400">*</span>
                  </label>
                  <input
                    required
                    id="senderSubject"
                    name="senderSubject"
                    maxLength={500}
                    placeholder="How can we help you?"
                    className="w-full rounded-lg h-12 px-4 bg-black/30 backdrop-blur-md text-white border border-stone-500/50 transition-all placeholder:text-stone-400 focus:border-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-500/20"
                  />
                </div>

                <div className="flex-1 flex flex-col">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-2"
                  >
                    Message <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    required
                    id="message"
                    name="message"
                    maxLength={5000}
                    placeholder="Tell us more about your inquiry..."
                    className="flex-1 w-full rounded-lg p-4 bg-black/30 backdrop-blur-md text-white border border-stone-500/50 transition-all placeholder:text-stone-400 focus:border-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-500/20 min-h-[200px]"
                  />
                  <p className="text-xs text-stone-400 mt-1">
                    Maximum 5000 characters
                  </p>
                </div>

                <SubmitButton />
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

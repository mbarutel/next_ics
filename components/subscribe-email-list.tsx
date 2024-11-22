"use client";

import Image from "next/image";
import toast from "react-hot-toast";
import { FaPaperPlane } from "react-icons/fa";
import React, { FormEvent, useState } from "react";

export default function SubscribeEmailList() {
  return (
    <section>
      <div className="container relative h-[20rem] rounded-sm overflow-hidden">
        <Image
          src="/assets/images/email-subscribe-bg.webp"
          alt="Australian Conference by Indigenous Organizers"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover blur-sm object-top grayscale"
        />
        <EmailForm />
      </div>
    </section>
  );
}

function EmailForm() {
  const [pending, setPending] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPending(true);

    const form = {
      email,
      date: new Date(),
    };

    const rawResponse = await fetch("/api/submit", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const response = await rawResponse.json();

    if ("error" in response) {
      toast.error(response.error);
    } else {
      toast.success(response.message);
    }

    setPending(false);
    setEmail("");
  };

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center container">
      <h2 className="section_title">Join Our Conference</h2>
      <p className="text-center font-medium mb-4">
        Subscribe to our mailing list and stay informed about the latest
        developments in the world of ICS conferences.
      </p>
      <form
        onSubmit={handleSubmit}
        className="flex w-[min(90%,40rem)] rounded-sm overflow-hidden"
      >
        <input
          required
          value={email}
          type="email"
          maxLength={500}
          placeholder="Email"
          onChange={(event) => setEmail(event.target.value)}
          className="h-12 px-4 bg-black border-solid border-[1px] border-stone-500/60 transition-all w-20 text-white flex-grow"
        />
        <button
          type="submit"
          disabled={pending}
          className="space_mono group flex flex-shrink items-center justify-center gap-2 bg-gradient-to-r gradient px-4 transition-all hover:bg-stone-900 disabled:scale-100 disabled:bg-opacity-65"
        >
          {pending ? (
            <span className="h-5 w-5 animate-spin rounded-full border-b-2 border-stone-400" />
          ) : (
            <span className="flex items-center gap-2 text-black font-medium">
              Submit{" "}
              <FaPaperPlane className="text-xs opacity-70 transition-all group-hover:translate-x-1 group-hover:-translate-y-1" />{" "}
            </span>
          )}
        </button>
      </form>
    </div>
  );
}

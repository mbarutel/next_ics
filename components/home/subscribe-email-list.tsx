"use client";

import Image from "next/image";
import React from "react";
import { experimental_useFormStatus as useFormStatus } from "react-dom";

export default function SubscribeEmailList() {
  return (
    <section>
      <div className="mx-auto max-w-[90rem] relative h-[30rem]">
        <Image
          src="/assets/images/email-subscribe-bg.jpg"
          alt="Subscribe to our email list"
          fill
          className="object-cover"
        />
        <EmailForm />
      </div>
    </section>
  );
}

function EmailForm() {
  const { pending } = useFormStatus();

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
      <form className="flex">
        <input
          required
          name="senderEmail"
          type="email"
          maxLength={500}
          placeholder="Your email"
          className="h-14 px-4 border-solid border-[1px] border-stone-500/60 transition-all"
        />
        <button
          type="submit"
          disabled={pending}
          className="group flex items-center justify-center gap-2 bg-red-500 hover:bg-stone-900 disabled:scale-100 disabled:bg-opacity-65"
        >
          {pending
            ? (
              <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-stone-400">
              </div>
            )
            : (
              <>
                Submit
              </>
            )}
        </button>
      </form>
    </div>
  );
}

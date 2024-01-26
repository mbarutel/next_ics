"use server";

import React from "react";
import { Resend } from "resend";
import { configs } from "@/lib/data";
import { validateString } from "@/lib/utils";
import { getErrorMessage } from "@/lib/utils";
import ContactFormEmail from "@/email/contact-form-email";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (formData: FormData) => {
  "use server";

  const senderEmail = formData.get("senderEmail");
  const senderSubject = formData.get("senderSubject");
  const message = formData.get("message");

  if (!validateString(senderEmail, 500)) {
    return {
      error: "Invalid sender email",
    };
  }
  if (!validateString(senderSubject, 500)) {
    return {
      error: "Invalid sender subject",
    };
  }
  if (!validateString(message, 5000)) {
    return {
      error: "Invalid sender message",
    };
  }

  let data;

  try {
    data = await resend.emails.send({
      from: "ICS Contact Form<onboarding@resend.dev>",
      to: configs.contact.email,
      subject: senderSubject as string,
      reply_to: senderEmail as string,
      react: React.createElement(ContactFormEmail, {
        message: message as string,
        senderEmail: senderEmail as string,
      }),
    });
  } catch (error: unknown) {
    return {
      error: getErrorMessage(error),
    };
  }

  return {
    data,
  };
};

"use client";

import React, { useEffect, useState } from "react";

const ACKNOWLEDGEMENT_KEY = "ics-acknowledgement-last-shown";
const ONE_HOUR_MS = 60 * 60 * 1000; // 1 hour in milliseconds

export default function HomeAcknowledgement() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if we should show the acknowledgement
    const lastShown = localStorage.getItem(ACKNOWLEDGEMENT_KEY);
    const now = Date.now();

    if (!lastShown || now - parseInt(lastShown) > ONE_HOUR_MS) {
      // Show the acknowledgement if it hasn't been shown or if it's been over an hour
      setIsOpen(true);
      localStorage.setItem(ACKNOWLEDGEMENT_KEY, now.toString());

      // Auto-close after 4 seconds
      const timeoutId = setTimeout(() => {
        setIsOpen(false);
      }, 4000);

      return () => clearTimeout(timeoutId);
    }
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-60 overflow-y-auto h-full w-full flex justify-center items-center z-[9999]">
      <div className="bg-yellow-400 p-8 rounded-md shadow-xl w-11/12 md:w-3/4 flex_col justify-center items-center space-y-6">
        <p className="text-stone-800 text-xl lg:text-2xl font-semibold text-center">
          Aboriginal and Torres Strait Islander people should be aware that this
          website may contain images, voices or names of deceased persons in
          photographs, film, audio recordings or printed material which may
          cause sadness or distress.
        </p>
        <button
          onClick={() => setIsOpen(false)}
          className="underline text-black text-xl font-bold"
        >
          Close
        </button>
      </div>
    </div>
  );
}

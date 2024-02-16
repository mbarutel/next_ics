"use client";

import React, { useState } from "react";

export default function IntroModal() {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-60 overflow-y-auto h-full w-full flex justify-center items-center z-[9999]">
      <div className="bg-white/30 backdrop-blur-lg p-8 rounded-xl shadow-xl w-11/12 md:w-3/4 border border-gray-300 flex flex-col justify-center items-center space-y-6">
        <p className="text-gray-800/80 text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-bold text-center">
          Aboriginal and Torres Strait Islander people should be aware that this
          website may contain images, voices or names of deceased persons in
          photographs, film, audio recordings or printed material which may
          cause sadness or distress.
        </p>
        <button
          onClick={() => setIsOpen(false)}
          className="text-gray-800 bg-yellow-400 hover:bg-yellow-500 font-bold py-2 px-6 rounded-lg transition_config"
        >
          Close
        </button>
      </div>
    </div>
  );
}

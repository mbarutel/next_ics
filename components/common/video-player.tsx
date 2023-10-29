"use client";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player/lazy";

export default function VideoPlayer({ url }: { url: string }) {
  const [hasWindow, setHasWindow] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHasWindow(true);
    }
  }, []);

  if (!hasWindow) {
    return null;
  }

  return (
    <div className="py-6 hidden md:block">
      <ReactPlayer url={url} controls={true} className="mx-auto w-full" />
    </div>
  );
}

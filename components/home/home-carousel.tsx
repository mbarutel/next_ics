import "./home.css";
import React from "react";
import { CarouselImages } from "@/contentful/services/carousel-images";
import { parserCarouselImagesEntry } from "@/contentful/utils";
import SharedCarousel from "../shared/shared-carousel";
import { draftMode } from "next/headers";

export async function generateStaticParams() {
  const conferenceInstance = new CarouselImages({
    preview: false,
    parser: parserCarouselImagesEntry,
  });

  return await conferenceInstance.getCarouselImages();
}

export default async function HomeCarousel() {
  const { isEnabled } = await draftMode();

  const carouselImages = new CarouselImages({
    preview: isEnabled,
    parser: parserCarouselImagesEntry,
  });

  const carousel = await carouselImages.getCarouselImages();

  if (!carousel || carousel.images.length === 0) {
    return null;
  }

  return (
    <section>
      <div className="container xl:px-20">
        <SharedCarousel {...carousel} />
      </div>
    </section>
  );
}

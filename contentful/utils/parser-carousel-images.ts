import { CarouselImagesEntry, CarouselImagesType } from "@/lib/types";
import parserAsset from "./parser-asset";

export default function parserCarouselImagesEntry(
  carouselImagesEntry: CarouselImagesEntry,
): CarouselImagesType {
  if (!carouselImagesEntry.fields.images) {
    return {
      images: [],
    };
  }

  const images = carouselImagesEntry.fields.images.map((image) =>
    parserAsset({ asset: image }),
  );

  return {
    images,
  };
}

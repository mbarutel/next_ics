import contentfulClient from "../client/client";
import { ContentfulClientApi } from "contentful";
import { CarouselImagesType } from "@/lib/types";
import { TypeCarouselImagesSkeleton } from "../types/contentful/types";

export class CarouselImages {
  private client: ContentfulClientApi<undefined>;
  private parser: Function;

  constructor({ preview, parser }: { preview: boolean; parser: Function }) {
    this.client = contentfulClient({ preview });
    this.parser = parser;
  }

  public async getCarouselImages(): Promise<CarouselImagesType | null> {
    const carouselImagesResult =
      await this.client.getEntries<TypeCarouselImagesSkeleton>({
        content_type: "carouselImages",
      });

    if (carouselImagesResult.items.length === 0) {
      return null;
    }
    return this.parser(carouselImagesResult.items[0]);
  }
}

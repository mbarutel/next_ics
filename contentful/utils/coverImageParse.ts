import { Asset, AssetLink } from "contentful";
import { ContentImage } from "../types/types";
import { configs } from "@/lib/data";

export function coverImageParse(
  asset: Asset<undefined, string> | { sys: AssetLink },
): ContentImage {
  if (!asset || !("fields" in asset)) {
    return configs.defaultCoverImage;
  }

  return {
    src: `https:${asset.fields.file?.url}` || "",
    alt: asset.fields.title || "",
    width: asset.fields.file?.details.image?.width || 0,
    height: asset.fields.file?.details.image?.height || 0,
  };
}

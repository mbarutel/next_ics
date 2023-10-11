import { Asset, AssetLink, UnresolvedLink } from "contentful";
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

export function coverImageParseX(
  { coverImage }: {
    coverImage: UnresolvedLink<"Asset"> | Asset<undefined, string> | undefined;
  },
): ContentImage | undefined {
  if (!coverImage || !("fields" in coverImage)) {
    return undefined;
  }

  return {
    src: `https:${coverImage.fields.file?.url}` || "",
    alt: coverImage.fields.title || "",
    width: coverImage.fields.file?.details.image?.width || 0,
    height: coverImage.fields.file?.details.image?.height || 0,
  };
}

import { Asset, AssetLink } from "contentful";
import { ContentImage } from "../types/types";

export function coverImageParse(
  asset: Asset<undefined, string> | { sys: AssetLink },
): ContentImage | null {
  if (!asset || !("fields" in asset)) {
    return null;
  }

  return {
    src: `https:${asset.fields.file?.url}` || "",
    alt: asset.fields.title || "",
    width: asset.fields.file?.details.image?.width || 0,
    height: asset.fields.file?.details.image?.height || 0,
  };
}

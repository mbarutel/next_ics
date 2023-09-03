import { Asset } from "contentful";
import { Media } from "../types/types";

export function coverImageParse(
  asset: Asset<undefined, string>,
): Media {
  return {
    src: `https:${asset.fields.file?.url}` || "",
    alt: asset.fields.title || "",
    width: asset.fields.file?.details.image?.width || 0,
    height: asset.fields.file?.details.image?.height || 0,
  };
}

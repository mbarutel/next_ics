import { Asset, UnresolvedLink } from "contentful";
import { ImageType } from "../types/types";

export default function coverImageParse(
  { coverImage }: {
    coverImage: UnresolvedLink<"Asset"> | Asset<undefined, string> | undefined;
  },
): ImageType | undefined {
  console.log(coverImage);
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

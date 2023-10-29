import { Asset, UnresolvedLink } from "contentful";
import { AssetType } from "../types/types";

export default function parseAsset(
  { asset }: {
    asset: UnresolvedLink<"Asset"> | Asset<undefined, string> | undefined;
  },
): AssetType | undefined {
  if (!asset || !("fields" in asset)) {
    return undefined;
  }

  return {
    src: `https:${asset.fields.file?.url}` || "",
    alt: asset.fields.file?.fileName || "",
  };
}

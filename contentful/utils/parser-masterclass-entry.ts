import { MasterclassEntry, MasterclassType } from "@/lib/types";
import parserAsset from "./parser-asset";

export default function parserMasterclassEntry(
  masterclassEntry: MasterclassEntry,
): MasterclassType {
  const asset = parserAsset({ asset: masterclassEntry.fields.asset });

  return {
    title: masterclassEntry.fields.title,
    slug: masterclassEntry.fields.slug,
    description: masterclassEntry.fields.description,
    asset: asset,
  };
}

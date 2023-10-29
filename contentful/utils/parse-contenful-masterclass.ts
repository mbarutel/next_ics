import { MasterclassEntry, MasterclassType } from "../types/types";
import parseAsset from "./parse-asset";

export default function parseContentfulMasterClass(
  masterclassEntry: MasterclassEntry,
): MasterclassType {
  const asset = parseAsset({ asset: masterclassEntry.fields.asset });

  return {
    title: masterclassEntry.fields.title,
    slug: masterclassEntry.fields.slug,
    description: masterclassEntry.fields.description,
    asset: asset,
  };
}

import {
  MasterclassEntry, MasterclassType,
} from "../types/types";

export default function parseContentfulMasterClass(
  masterclassEntry: MasterclassEntry,
): MasterclassType {
  return {
    title: masterclassEntry.fields.title,
    slug: masterclassEntry.fields.slug,
    description: masterclassEntry.fields.description,
    video: masterclassEntry.fields.video === undefined ? undefined : masterclassEntry.fields.video,
  };
}

import { Entry, UnresolvedLink } from "contentful";
import { MasterclassEntry, MasterclassType } from "@/lib/types";
import { TypeMasterclassSkeleton } from "../types/contentful/types";
import parserMasterclassEntry from "./parser-masterclass-entry";

export default function parserMasterclassesInConference(
  masterclasses:
    | (
      | UnresolvedLink<"Entry">
      | Entry<TypeMasterclassSkeleton, undefined, string>
    )[]
    | undefined,
): MasterclassType[] {
  if (masterclasses) {
    return masterclasses.filter((masterclass) =>
      masterclass.sys.type === "Entry"
    )
      .map((masterclass) =>
        parserMasterclassEntry(masterclass as MasterclassEntry)
      );
  } else {
    return [];
  }
}

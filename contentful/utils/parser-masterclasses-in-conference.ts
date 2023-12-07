import { Entry, UnresolvedLink } from "contentful";
import { TypeMasterclassSkeleton } from "../types/contentful/types";
import { MasterclassEntry, MasterclassType } from "../types/types";
import parseContentfulMasterClass from "./parse-contenful-masterclass";

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
        parseContentfulMasterClass(masterclass as MasterclassEntry)
      );
  } else {
    return [];
  }
}

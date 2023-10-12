import { UnresolvedLink } from "contentful";
import { EventEntry } from "../types/types";

export default function resolveEventAsset(
  { event }: { event: UnresolvedLink<"Entry"> | EventEntry },
) {
//   const events = conferenceResult[0].fields.events.filter((event) =>
//     event.sys.type === "Entry"
//   ).map((event) => event as EventEntry);
}

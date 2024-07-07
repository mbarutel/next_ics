import { SponsorEntry, SponsorType } from "@/lib/types";
import parserAsset from "./parser-asset";

export default function parserSponsorEntry(
  sponsorEntry: SponsorEntry,
): SponsorType {
  return {
    name: sponsorEntry.fields.name,
    logo: parserAsset({ asset: sponsorEntry.fields.logo }),
    link: sponsorEntry.fields.link,
  };
}

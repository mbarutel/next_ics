// import { Asset, UnresolvedLink } from "contentful";
// import { AssetType } from "../types/types";
//
// export default function imageParse(
//   { asset }: {
//     asset: UnresolvedLink<"Asset"> | Asset<undefined, string> | undefined;
//   },
// ): AssetType {
//   if (!asset || !("fields" in asset)) {
//     return {
//       src:"https://images.unsplash.com/photo-1701551883632-f2821db546d7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//       alt:"default image",
//     }
//
//   }
//
//   return {
//     src: `https:${asset.fields.file?.url}` || "",
//     alt: asset.fields.title || "",
//   };
// }

// import React, { ReactNode } from "react";
// import { Block, BLOCKS, Inline, MARKS } from "@contentful/rich-text-types";
// import { Document as RichTextDocument } from "@contentful/rich-text-types";
// import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
// import { ListItem, Quote } from "../rich-text";
//
// export default function RichText(
//   { document }: { document: RichTextDocument | null },
// ) {
//   if (!document) {
//     return null;
//   }
//
//   const options = {
//     renderMark: {
//       [MARKS.BOLD]: (children: ReactNode) => {
//         return <span className="font-semibold">{children}</span>;
//       },
//       [MARKS.ITALIC]: (children: ReactNode) => {
//         return <span className="italic">{children}</span>;
//       },
//       [MARKS.UNDERLINE]: (children: ReactNode) => {
//         return <span className="underline">{children}</span>;
//       },
//     },
//     renderNode: {
//       [BLOCKS.DOCUMENT]: (_node: Block | Inline, children: ReactNode) => (
//         <article className="text-slate-800">
//           {children}
//         </article>
//       ),
//       [BLOCKS.HEADING_1]: (_node: Block | Inline, children: ReactNode) => (
//         <h1 className="text-lg sm:text-xl lg:text-2xl mb-1">
//           {children}
//         </h1>
//       ),
//       [BLOCKS.HEADING_2]: (_node: Block | Inline, children: ReactNode) => (
//         <h2
//           style={{ fontFamily: "Gabarito" }}
//           className="text-lg sm:text-xl lg:text-2xl mb-1 text-slate-800/80"
//         >
//           {children}
//         </h2>
//       ),
//       [BLOCKS.HEADING_3]: (_node: Block | Inline, children: ReactNode) => (
//         <h3
//           style={{ fontFamily: "Gabarito" }}
//           className="text-lg sm:text-xl lg:text-2xl mb-1 text-slate-800/80"
//         >
//           {children}
//         </h3>
//       ),
//       [BLOCKS.HEADING_4]: (_node: Block | Inline, children: ReactNode) => (
//         <h4
//           style={{ fontFamily: "Gabarito" }}
//           className="text-lg sm:text-xl lg:text-2xl mb-1 text-slate-800/80"
//         >
//           {children}
//         </h4>
//       ),
//       [BLOCKS.HEADING_5]: (_node: Block | Inline, children: ReactNode) => (
//         <h5
//           style={{ fontFamily: "Gabarito" }}
//           className="text-lg sm:text-xl lg:text-2xl mb-1 text-slate-800/80"
//         >
//           {children}
//         </h5>
//       ),
//       [BLOCKS.HEADING_6]: (_node: Block | Inline, children: ReactNode) => (
//         <h6
//           style={{ fontFamily: "Gabarito" }}
//           className="text-lg sm:text-xl lg:text-2xl mb-1 text-slate-800/80"
//         >
//           {children}
//         </h6>
//       ),
//       [BLOCKS.PARAGRAPH]: (_node: Block | Inline, children: ReactNode) => (
//         <p className="text-justify text-sm sm:text-base mb-6 last:mb-0">
//           {children}
//         </p>
//       ),
//       [BLOCKS.QUOTE]: (_node: Block | Inline, children: ReactNode) => (
//         <Quote>
//           {children}
//         </Quote>
//       ),
//       [BLOCKS.UL_LIST]: (_node: Block | Inline, children: ReactNode) => (
//         <ul className="mb-6">
//           {children}
//         </ul>
//       ),
//       [BLOCKS.LIST_ITEM]: (_node: Block | Inline, children: ReactNode) => (
//         <ListItem>
//           {children}
//         </ListItem>
//       ),
//     },
//   };
//
//   return (
//     <>
//       {documentToReactComponents(document, options)}
//     </>
//   );
// }

import React, { ReactNode } from "react";
import { Block, BLOCKS, Inline, MARKS } from "@contentful/rich-text-types";
import { Document as RichTextDocument } from "@contentful/rich-text-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { ListItem, Quote } from "./rich-text-elements";

export default function RichText(
  { document }: { document: RichTextDocument | null },
) {
  if (!document) {
    return null;
  }

  const options = {
    renderMark: {
      [MARKS.BOLD]: (children: ReactNode) => {
        return <span className="font-semibold">{children}</span>;
      },
      [MARKS.ITALIC]: (children: ReactNode) => {
        return <span className="italic">{children}</span>;
      },
      [MARKS.UNDERLINE]: (children: ReactNode) => {
        return <span className="underline">{children}</span>;
      },
    },
    renderNode: {
      [BLOCKS.DOCUMENT]: (_node: Block | Inline, children: ReactNode) => (
        <div className="flex_col gap-4">
          {children}
        </div>
      ),
      [BLOCKS.HEADING_1]: (_node: Block | Inline, children: ReactNode) => (
        <h1 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-semibold -mb-2">
          {children}
        </h1>
      ),
      [BLOCKS.HEADING_2]: (_node: Block | Inline, children: ReactNode) => (
        <h2 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-semibold -mb-2">
          {children}
        </h2>
      ),
      [BLOCKS.HEADING_3]: (_node: Block | Inline, children: ReactNode) => (
        <h3 className="sm:text-lg lg:text-xl xl:text-2xl font-semibold -mb-2">
          {children}
        </h3>
      ),
      [BLOCKS.HEADING_4]: (_node: Block | Inline, children: ReactNode) => (
        <h4 className="sm:text-lg lg:text-xl xl:text-2xl font-semibold -mb-2">
          {children}
        </h4>
      ),
      [BLOCKS.HEADING_5]: (_node: Block | Inline, children: ReactNode) => (
        <h5 className="sm:text-lg lg:text-xl xl:text-2xl font-semibold -mb-2">
          {children}
        </h5>
      ),
      [BLOCKS.HEADING_6]: (_node: Block | Inline, children: ReactNode) => (
        <h6 className="sm:text-lg lg:text-xl xl:text-2xl font-semibold -mb-2">
          {children}
        </h6>
      ),
      [BLOCKS.PARAGRAPH]: (_node: Block | Inline, children: ReactNode) => (
        <p className="text-justify">
          {children}
        </p>
      ),
      // [BLOCKS.QUOTE]: (_node: Block | Inline, children: ReactNode) => (
      //   <Quote>
      //     {children}
      //   </Quote>
      // ),
      // [BLOCKS.UL_LIST]: (_node: Block | Inline, children: ReactNode) => (
      //   <ul className="mb-6">
      //     {children}
      //   </ul>
      // ),
      [BLOCKS.LIST_ITEM]: (_node: Block | Inline, children: ReactNode) => (
        <ListItem>
          {children}
        </ListItem>
      ),
    },
  };

  return (
    <div>
      {documentToReactComponents(document, options)}
    </div>
  );
}

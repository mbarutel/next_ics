import "../event/event.css";

import React, { ReactNode } from "react";
import { Block, BLOCKS, Inline, MARKS } from "@contentful/rich-text-types";
import { Document as RichTextDocument } from "@contentful/rich-text-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import HeaderUnderline from "./header-underline";

export default function RichText({
  document,
}: {
  document: RichTextDocument | null;
}) {
  if (!document) {
    return null;
  }

  const options = {
    renderMark: {
      [MARKS.BOLD]: (children: ReactNode) => {
        return <span className="bold">{children}</span>;
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
        <div className="px-3">{children}</div>
      ),
      [BLOCKS.HEADING_1]: (_node: Block | Inline, children: ReactNode) => (
        <HeaderUnderline>
          <h1 className="primary_title">{children}</h1>
        </HeaderUnderline>
      ),
      [BLOCKS.HEADING_2]: (_node: Block | Inline, children: ReactNode) => (
        <HeaderUnderline>
          <h2 className="primary_title">{children}</h2>
        </HeaderUnderline>
      ),
      [BLOCKS.HEADING_3]: (_node: Block | Inline, children: ReactNode) => (
        <h3 className="secondary_title">{children}</h3>
      ),
      [BLOCKS.HEADING_4]: (_node: Block | Inline, children: ReactNode) => (
        <h4 className="secondary_title">{children}</h4>
      ),
      [BLOCKS.HEADING_5]: (_node: Block | Inline, children: ReactNode) => (
        <h5 className="third_title">{children}</h5>
      ),
      [BLOCKS.HEADING_6]: (_node: Block | Inline, children: ReactNode) => (
        <h6 className="third_title">{children}</h6>
      ),
      [BLOCKS.PARAGRAPH]: (_node: Block | Inline, children: ReactNode) => (
        <p className="rich_text_p">{children}</p>
      ),
      [BLOCKS.UL_LIST]: (_node: Block | Inline, children: ReactNode) => (
        <ul className="ul">{children}</ul>
      ),
      [BLOCKS.LIST_ITEM]: (_node: Block | Inline, children: ReactNode) => (
        <li className="-mt-0.5 md:-mt-2 first:mt-0 leading-tight">
          {children}
        </li>
      ),
    },
  };

  return <div>{documentToReactComponents(document, options)}</div>;
}

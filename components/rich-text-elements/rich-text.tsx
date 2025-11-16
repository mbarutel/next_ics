import "../event/event.css";

import React, { ReactNode } from "react";
import { Block, BLOCKS, Inline, MARKS } from "@contentful/rich-text-types";
import { Document as RichTextDocument } from "@contentful/rich-text-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import ArticleContent from "../event/article-content";

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
        return <strong>{children}</strong>;
      },
      [MARKS.ITALIC]: (children: ReactNode) => {
        return <em>{children}</em>;
      },
      [MARKS.UNDERLINE]: (children: ReactNode) => {
        return <span className="underline">{children}</span>;
      },
    },
    renderNode: {
      [BLOCKS.HEADING_1]: (_node: Block | Inline, children: ReactNode) => (
        <h1 className="primary_title">{children}</h1>
      ),
      [BLOCKS.HEADING_2]: (_node: Block | Inline, children: ReactNode) => (
        <h2 className="primary_title">{children}</h2>
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
      // [BLOCKS.UL_LIST]: (_node: Block | Inline, children: ReactNode) => (
      //   <ul className="list-disc list-inside">{children}</ul>
      // ),
      // [BLOCKS.OL_LIST]: (_node: Block | Inline, children: ReactNode) => (
      //   <ol className="list-decimal list-inside">{children}</ol>
      // ),
      [BLOCKS.LIST_ITEM]: (_node: Block | Inline, children: ReactNode) => (
        <li className="leading-relaxed">{children}</li>
      ),
      [BLOCKS.QUOTE]: (_node: Block | Inline, children: ReactNode) => (
        <blockquote>{children}</blockquote>
      ),
      [BLOCKS.HR]: () => <hr />,
    },
  };

  return (
    <ArticleContent>
      {documentToReactComponents(document, options)}
    </ArticleContent>
  );
}

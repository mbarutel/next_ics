import React, { ReactNode } from "react";
import { Block, BLOCKS, Inline, MARKS } from "@contentful/rich-text-types";
import { Document as RichTextDocument } from "@contentful/rich-text-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

export default function SpeakerRichText(
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
      [BLOCKS.PARAGRAPH]: (_node: Block | Inline, children: ReactNode) => (
        <p className="text-slate-800/80 text-justify">{children}</p>
      ),
    },
  };

  return (
    <>
      {documentToReactComponents(document, options)}
    </>
  );
}

import React, { ReactNode } from "react";
import { Block, BLOCKS, Inline, MARKS } from "@contentful/rich-text-types";
import { Document as RichTextDocument } from "@contentful/rich-text-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { ListItem, Quote } from "../rich-text";

export default function RichText(
  { document }: { document: RichTextDocument | null },
) {
  if (!document) {
    return null;
  }

  const options = {
    renderMark: {
      [MARKS.BOLD]: (children: ReactNode) => {
        return <span className="font-bold">{children}</span>;
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
        <article className="text-slate-700 px-4 lg:px-12 py-7">
          {children}
        </article>
      ),
      [BLOCKS.HEADING_1]: (_node: Block | Inline, children: ReactNode) => (
        <h1 className="text-4xl mb-2 mt-8">{children}</h1>
      ),
      [BLOCKS.HEADING_2]: (_node: Block | Inline, children: ReactNode) => (
        <h2 className="text-3xl mb-2 mt-8">{children}</h2>
      ),
      [BLOCKS.HEADING_3]: (_node: Block | Inline, children: ReactNode) => (
        <h3 className="text-2xl mb-2 mt-8">{children}</h3>
      ),
      [BLOCKS.HEADING_4]: (_node: Block | Inline, children: ReactNode) => (
        <h4 className="text-xl mb-2 mt-8">{children}</h4>
      ),
      [BLOCKS.HEADING_5]: (_node: Block | Inline, children: ReactNode) => (
        <h5 className="text-xl mb-2 mt-8">{children}</h5>
      ),
      [BLOCKS.HEADING_6]: (_node: Block | Inline, children: ReactNode) => (
        <h6 className="text-xl mb-2 mt-8">{children}</h6>
      ),
      [BLOCKS.PARAGRAPH]: (_node: Block | Inline, children: ReactNode) => (
        <p className="text-justify">{children}</p>
      ),
      [BLOCKS.QUOTE]: (_node: Block | Inline, children: ReactNode) => (
        <Quote>
          {children}
        </Quote>
      ),
      [BLOCKS.LIST_ITEM]: (_node: Block | Inline, children: ReactNode) => (
        <ListItem>
          {children}
        </ListItem>
      ),
      [BLOCKS.TABLE]: (_node: Block | Inline, children: ReactNode) => (
        <table className="w-[60%] mx-auto bg-slate-300 my-4 rounded-lg flex flex-col px-5 py-6">
          <tbody className="flex flex-col gap-2">
            {children}
          </tbody>
        </table>
      ),
      [BLOCKS.TABLE_HEADER_CELL]: (
        _node: Block | Inline,
        children: ReactNode,
      ) => (
        <th
          style={{ fontFamily: "Gabarito" }}
          className="text-slate-800/80 text-2xl uppercase text-left"
        >
          {children}
        </th>
      ),
      [BLOCKS.TABLE_ROW]: (_node: Block | Inline, children: ReactNode) => (
        <tr className="grid grid-cols-2 rounded-lg text-slate-800">
          {children}
        </tr>
      ),
      [BLOCKS.TABLE_CELL]: (_node: Block | Inline, children: ReactNode) => (
        <td className="even:text-right flex flex-row group">
          <span className="w-auto h-full group-odd:order-1 group-odd:ml-3 group-even:mr-3 grow border-dashed border-b-2 border-slate-800/50" />
          <span className="grow-0">
            {children}
          </span>
        </td>
      ),
    },
  };

  return (
    <>
      {documentToReactComponents(document, options)}
    </>
  );
}

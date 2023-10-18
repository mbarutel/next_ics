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
        <article className="text-slate-700 md:px-16 lg:px-28 xl:px-36">
          {children}
          <div className="h-1 w-full bg-slate-600 mt-6"/>
        </article>
      ),
      [BLOCKS.HEADING_1]: (_node: Block | Inline, children: ReactNode) => (
        <h1 className="text-4xl mb-2 mt-8">{children}</h1>
      ),
      [BLOCKS.HEADING_2]: (_node: Block | Inline, children: ReactNode) => (
        <h2 className="text-xl sm:text-2xl lg:text-3xl mb-2 mt-5 lg:mt-8">{children}</h2>
      ),
      [BLOCKS.HEADING_3]: (_node: Block | Inline, children: ReactNode) => (
        <h3 className="text-lg sm:text-xl lg:text-2xl mb-2 mt-5 lg:mt-8">{children}</h3>
      ),
      [BLOCKS.HEADING_4]: (_node: Block | Inline, children: ReactNode) => (
        <h4 className="text-lg sm:text-xl lg:text-2xl mb-2 mt-5 lg:mt-8">{children}</h4>
      ),
      [BLOCKS.HEADING_5]: (_node: Block | Inline, children: ReactNode) => (
        <h5 className="text-lg sm:text-xl lg:text-2xl mb-2 mt-5 lg:mt-8">{children}</h5>
      ),
      [BLOCKS.HEADING_6]: (_node: Block | Inline, children: ReactNode) => (
        <h6 className="text-center text-lg sm:text-xl lg:text-2xl mb-2 mt-5 lg:mt-8">{children}</h6>
      ),
      [BLOCKS.PARAGRAPH]: (_node: Block | Inline, children: ReactNode) => (
        <p className="text-slate-800 text-justify">{children}</p>
      ),
      [BLOCKS.QUOTE]: (_node: Block | Inline, children: ReactNode) => (
        <Quote>
          {children}
        </Quote>
      ),
      [BLOCKS.UL_LIST]: (_node: Block | Inline, children: ReactNode) => (
        <ul className="py-2">
          {children}
        </ul>
      ),
      [BLOCKS.LIST_ITEM]: (_node: Block | Inline, children: ReactNode) => (
        <ListItem>
          {children}
        </ListItem>
      ),
      // [BLOCKS.TABLE]: (_node: Block | Inline, children: ReactNode) => (
      //   <div className="paper px-4 lg:px-20 py-6 lg:py-12 my-6 lg:my-16">
      //     <span className="tape-section" />
      //     <table className="w-full">
      //       <tbody>
      //         {children}
      //       </tbody>
      //     </table>
      //   </div>
      // ),
      // [BLOCKS.TABLE_HEADER_CELL]: (
      //   _node: Block | Inline,
      //   children: ReactNode,
      // ) => (
      //   <th className="text-xl lg:text-2xl uppercase text-slate-800/90 mb-1 lg:mb-3">
      //     {children}
      //   </th>
      // ),
      // [BLOCKS.TABLE_ROW]: (_node: Block | Inline, children: ReactNode) => (
      //   <tr className="grid grid-cols-2 rounded-lg text-slate-800/80 mb-1 sm:mb-2 last:mb-0 text-sm sm:text-base">
      //     {children}
      //   </tr>
      // ),
      // [BLOCKS.TABLE_CELL]: (_node: Block | Inline, children: ReactNode) => (
      //   <td className="even:text-right flex flex-row group">
      //     <span className="w-auto h-1 my-auto group-odd:order-1 group-odd:ml-3 group-even:mr-3 grow border-dotted border-b-2 border-slate-800/30" />
      //     <span className="grow-0">
      //       {children}
      //     </span>
      //   </td>
      // ),
    },
  };

  // const table = document.content.filter((item) =>
  //   item.nodeType === BLOCKS.TABLE
  // );
  //
  // console.log(table[0].content[0])
  //

  return (
    <>
      {documentToReactComponents(document, options)}
    </>
  );
}

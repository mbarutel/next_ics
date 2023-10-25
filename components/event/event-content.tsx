import React, { ReactNode } from "react";
import { Block, BLOCKS, Inline, MARKS } from "@contentful/rich-text-types";
import { Document as RichTextDocument } from "@contentful/rich-text-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { ListItem, Quote } from "../rich-text";

export default function EventContent(
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
        <article className="text-slate-700 px-4 py-4 sm:py-6 xl:px-8 xl:py-10 max-w-4xl mx-auto bg-paper_gradient bg-[length:5px_5px] mt-6 shadow-lg rounded-md">
          {children}
        </article>
      ),
      // [BLOCKS.HEADING_1]: (_node: Block | Inline, children: ReactNode) => (
      //   <h1 className="text-4xl mb-2 mt-8">{children}</h1>
      // ),
      [BLOCKS.HEADING_2]: (_node: Block | Inline, children: ReactNode) => (
        <h2 className="text-base sm:text-xl lg:text-2xl mb-2 font-semibold text-center">
          {children}
        </h2>
      ),
      // [BLOCKS.HEADING_3]: (_node: Block | Inline, children: ReactNode) => (
      //   <h3 className="text-base sm:text-lg lg:text-xl sm:mb-2 drop-shadow-md">
      //     {children}
      //   </h3>
      // ),
      // [BLOCKS.HEADING_4]: (_node: Block | Inline, children: ReactNode) => (
      //   <h4 className="text-base sm:text-lg lg:text-xl sm:mb-2 drop-shadow-md">
      //     {children}
      //   </h4>
      // ),
      // [BLOCKS.HEADING_5]: (_node: Block | Inline, children: ReactNode) => (
      //   <h5 className="text-base sm:text-lg lg:text-xl sm:mb-2 drop-shadow-md">
      //     {children}
      //   </h5>
      // ),
      // [BLOCKS.HEADING_6]: (_node: Block | Inline, children: ReactNode) => (
      //   <h6 className="text-center text-base sm:text-lg lg:text-xl sm:mb-2 drop-shadow-md">
      //     {children}
      //   </h6>
      // ),
      [BLOCKS.PARAGRAPH]: (_node: Block | Inline, children: ReactNode) => (
        <p className="text-slate-800 text-justify text-sm sm:text-base mb-6 last:mb-0">
          {children}
        </p>
      ),
      [BLOCKS.QUOTE]: (_node: Block | Inline, children: ReactNode) => (
        <Quote>
          {children}
        </Quote>
      ),
      [BLOCKS.UL_LIST]: (_node: Block | Inline, children: ReactNode) => (
        <ul className="mb-6 last:mb-0">
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

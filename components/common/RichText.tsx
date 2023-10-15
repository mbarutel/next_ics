import { Document as RichTextDocument } from "@contentful/rich-text-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

export default function RichText(
  { document }: { document: RichTextDocument | null },
) {
  if (!document) {
    return null;
  }

  return (
    <div>
      {documentToReactComponents(document)}
    </div>
  );
}

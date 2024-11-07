import { ReactNode } from "react";

type QuestionTitleProps = {
  title: string;
  subtitle?: string;
  asterisk?: ReactNode;
};
export default function QuestionTitle({
  title,
  subtitle,
  asterisk,
}: QuestionTitleProps) {
  return (
    <div className="mb-4 flex flex-wrap">
      <h2 className="form_section_title w-fit">{title}</h2>
      {asterisk}
      {subtitle && <p className="w-full">{subtitle}</p>}
    </div>
  );
}

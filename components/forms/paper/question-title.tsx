type QuestionTitleProps = {
  title: string;
  subtitle?: string;
};
export default function QuestionTitle({ title, subtitle }: QuestionTitleProps) {
  return (
    <div className="mb-4">
      <h2 className="form_section_title">{title}</h2>
      {subtitle && <p>{subtitle}</p>}
    </div>
  );
}

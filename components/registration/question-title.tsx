type QuestionTitleProps = {
  children: React.ReactNode;
};

export default function QuestionTitle({ children }: QuestionTitleProps) {
  return (
    <h3 className="text-3xl font-semibold capitalize mb-2">
      {children}
    </h3>
  );
}

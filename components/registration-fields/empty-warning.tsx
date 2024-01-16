export default function EmptyWarning({ text, error, touched }: {
  text: string;
  error: string | string[] | undefined;
  touched: boolean | never[] | undefined;
}) {
  if (!error && !touched) {
    return null;
  }

  return (
    <div className="validation_text">
      {text}
    </div>
  );
}

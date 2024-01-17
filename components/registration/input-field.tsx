import { Field } from "formik";
import EmptyWarning from "./empty-warning";

export function InputField(
  { name, type, label, error, touched }: {
    name: string;
    type: string;
    label: string;
    error: string | undefined;
    touched: boolean | undefined;
  },
) {
  return (
    <div className="flex_col">
      <span className="flex gap-0.5">
        <EmptyWarning text={error as string} error={error} touched={touched} />
        <label>{label}</label>
      </span>
      <Field
        name={name}
        type={type}
        className="field_input"
      />
    </div>
  );
}

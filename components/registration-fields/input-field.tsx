import { Field } from "formik";
import EmptyWarning from "./empty-warning";

export function InputField(
  { name, type, placeholder, error, touched }: {
    name: string;
    placeholder: string;
    type: string;
    error: string | undefined;
    touched: boolean | undefined;
  },
) {
  return (
    <div className="flex_col">
      <EmptyWarning text={error as string} error={error} touched={touched} />
      <Field
        name={name}
        type={type}
        placeholder={placeholder}
        className="field_input"
      />
    </div>
  );
}

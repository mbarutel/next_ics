import { Field } from "formik";
import { RiErrorWarningFill } from "react-icons/ri";

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
      {touched && error && (
        <div className="flex items-center gap-1 text-red-600 font-medium">
          <span className="text-xl">
            <RiErrorWarningFill />
          </span>
          {error}
        </div>
      )}
      <Field
        name={name}
        type={type}
        placeholder={placeholder}
        className="field_input"
      />
    </div>
  );
}

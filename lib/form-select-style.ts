export const formSelectStyle = {
  control: (provided: Record<string, unknown>) => ({
    ...provided,
    borderRadius: 0,
    padding: "6px 0",
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderBottom: "1px solid white",
    color: "rgb(156 163 175)" /* gray-400 */,
  }),
  singleValue: (provided: any) => ({
    ...provided,
    color: "rgb(156 163 175)", // Ensure the selected value text color is also set
  }),
  option: (styles: any, state: any) => ({
    ...styles,
    color: "#000",
    backgroundColor: state.isSelected ? "#facc15" : styles.color,
    borderBottom: "1px solid rgba(0, 0, 0, 0.125)",
    "&:hover": {
      backgroundColor: "#facc15",
    },
  }),
  input: (base: any) => ({
    ...base,
    color: "rgb(156 163 175)" /* gray-400 */,
  }),
};

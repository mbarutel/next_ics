export const formSelectStyle = {
  control: (provided: Record<string, unknown>, state: any) => ({
    ...provided,
    padding: "6px 0",
    color: "red",
    backgroundColor: "#1b1917",
    borderColor: "transparent",
    borderBottom: "1px solid white",
    borderRadius: 0
  }),
  option: (styles: any, state: any) => ({
    ...styles,
    color: "#000",
    backgroundColor: state.isSelected ? "#60B3D1" : styles.color,
    borderBottom: "1px solid rgba(0, 0, 0, 0.125)",
    "&:hover": {
      backgroundColor: "#60B3D1",
    },
  }),
  input: (base: any) => ({
    ...base,
    "input:focus": {
      boxShadow: "none",
      border: "1px solid #60B3D1",
    },
  }),
  menuPortal: (base: any) => ({ ...base, zIndex: 9999 }),
};

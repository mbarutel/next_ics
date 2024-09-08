export const formSelectStyle = {
  control: (provided: Record<string, unknown>) => ({
    ...provided,
    borderRadius: 0,
    padding: "6px 0",
    backgroundColor: "#1b1917",
    borderColor: "transparent",
    borderBottom: "1px solid white",
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
    // color: "#fff",
    // "input:focus": {
    //   boxShadow: "none",
    //   border: "1px solid #facc15",
    // },
  }),
  // menuPortal: (base: any) => ({ ...base, zIndex: 9999 }),
};

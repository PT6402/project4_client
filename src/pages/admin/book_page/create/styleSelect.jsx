/* eslint-disable no-unused-vars */
const styleSelect = {
  option: (baseStyles, { isSelected }) => ({
    ...baseStyles,
    backgroundColor: isSelected ? "#3c3c3c !important" : "transparent",
    cursor: "pointer",
    fontWeight: isSelected ? "bold" : "normal",
    letterSpacing: "-0.05rem",
    fontSize: "1.3rem",
    width: "97%",
    borderRadius: ".7rem",
    margin: ".5rem auto",
    outlined: "none",

    "&:hover": { backgroundColor: "#787878", color: "white" },
  }),

  singleValue: (baseStyles) => ({
    ...baseStyles,
    fontWeight: "bold",
    // letterSpacing: "-0.05rem",
    fontSize: "1.6rem",
  }),

  menu: (baseStyles) => ({
    ...baseStyles,
    borderRadius: ".5rem",
  }),

  indicatorSeparator: (baseStyles) => ({
    ...baseStyles,
    backgroundColor: "#616161",
    "&:hover": {
      backgroundColor: "#616161",
    },
  }),

  dropdownIndicator: (baseStyles, { isFocused }) => ({
    ...baseStyles,
    color: isFocused ? "white" : "#616161",
    "&:hover": {
      color: "white",
    },
    display: "none",
  }),

  control: (baseStyle, state) => ({
    ...baseStyle,
    width: "300px",
    fontSize: "1.2rem",
    borderRadius: ".5rem",
    textAlign: "center",
  }),
  clearIndicator: (baseStyle, state) => ({
    ...baseStyle,
    borderRadius: ".4rem",
    border: ".1rem solid black",
    marginRight: ".1rem",
  }),
  noOptionsMessage: (baseStyle, state) => ({
    ...baseStyle,
    fontSize: "1.5rem",
  }),
};
export default styleSelect;

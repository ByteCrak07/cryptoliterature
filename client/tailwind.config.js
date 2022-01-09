module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    borderWidth: {
      DEFAULT: "1px",
      0: "0",
      2: "2px",
      3: "3px",
      4: "4px",
      6: "6px",
      7: "7px",
      8: "8px",
    },
    extend: {
      colors: {
        "lit-dark": "#0B1D25",
        "lit-light-dark": "#828282",
        "lit-gray": "#828282",
        "lit-light-gray": "#FAFAFA",
        "lit-gold": "#AA8F00",
      },
      fontFamily: {
        Merriweather: ["Merriweather", "serif"],
        Poppins: ["Poppins", "sans-serif"],
        OpenSans: ["Open Sans", "sans-serif"],
      },
      flex: {
        2: "2 2 0%",
        3: "3 3 0%",
        4: "4 4 0%",
        5: "5 5 0%",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/line-clamp")],
};

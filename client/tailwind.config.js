const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    screens: {
      xs: "475px",
      ...defaultTheme.screens,
    },
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
        "lit-gray": "#8A8A8A",
        "lit-light-gray": "#F4F4F4",
        "lit-gold": "#AA8F00",
      },
      fontFamily: {
        Merriweather: ["Merriweather", "serif"],
        Poppins: ["Poppins", "sans-serif"],
        OpenSans: ["Open Sans", "sans-serif"],
        Roboto: ["Roboto", "sans-serif"],
      },
      flex: {
        2: "2 2 0%",
        3: "3 3 0%",
        4: "4 4 0%",
        5: "5 5 0%",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms")({
      strategy: "class",
    }),
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/typography"),
  ],
};

module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        litBlue: "#0B1D25",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

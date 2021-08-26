module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "lit-dark": "#0B1D25",
      },
      fontFamily: {
        Merriweather: ["Merriweather", "serif"],
        Poppins: ["Poppins", "sans-serif"],
      },
      flex: {
        2: "2 2 0%",
        3: "3 3 0%",
        litBlue: "#0B1D25",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "lit-dark": "#0B1D25",
        "lit-gray": "#828282",
      },
      fontFamily: {
        Merriweather: ["Merriweather", "serif"],
        Poppins: ["Poppins", "sans-serif"],
      },
      flex: {
        2: "2 2 0%",
        3: "3 3 0%",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/line-clamp")],
};

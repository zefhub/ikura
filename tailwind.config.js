module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "ikura-light": "#C6B79A",
        "ikura-dark": "#CD5129",
      },
      boxShadow: {
        reversed: "0px -3px 4px 0px rgba(0,0,0,0.25)",
      },
    },
    fontFamily: {
      plex: ["IBM Plex Sans", "sans-serif"],
    },
  },
  plugins: [require("@tailwindcss/forms")],
};

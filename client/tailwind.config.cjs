module.exports = {
  mode: "jit",
  content: [
    "./src/**/**/*.{js,ts,jsx,tsx,html,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,html,mdx}",
  ],
  darkMode: "class",
  theme: {
    screens: { md: { max: "1050px" }, sm: { max: "550px" } },
    extend: {
      colors: {
        gray: {
          50: "#f9f9f9",
          200: "#e8e8e8",
          400: "#c4c4c4",
          900: "#071625",
          "50_66": "#f7f9fb66",
          "900_33": "#1c1c1c33",
          "200_01": "#e9e9eb",
        },
        blue: { 500: "#2e9dfb", 700: "#297bca", A700: "#2a62ff" },
        blue_gray: { 400: "#8a898e" },
        light_blue: {
          A700_7f: "#0083ff7f",
          A700: "#0083ff",
          A700_33: "#0083ff33",
        },
        black: { 900: "#000000" },
        white: { A700_19: "#ffffff19", A700: "#ffffff" },
      },
      fontFamily: { poppins: "Poppins", montserrat: "Montserrat" },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
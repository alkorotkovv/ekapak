/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        manrope: ["Manrope", "sans-serif"],
      },
      fontSize: {
        h1: ["40px", { lineHeight: "130%", fontWeight: "700" }],
        h2: ["30px", { lineHeight: "130%", fontWeight: "700" }],
        h3: ["24px", { lineHeight: "140%", fontWeight: "700" }],
        "p-bold": ["18px", { lineHeight: "140%", fontWeight: "700" }],
        p: ["18px", { lineHeight: "140%", fontWeight: "400" }],
        "p-catalog": ["18px", { lineHeight: "140%", fontWeight: "400" }],
        "p-price": ["14px", { lineHeight: "140%", fontWeight: "700" }],
        "p-description": ["14px", { lineHeight: "140%", fontWeight: "400" }],
        "p-article": ["12px", { lineHeight: "140%", fontWeight: "400" }],
      },
      colors: {
        blue: "#00B0FF",
        lightblue: "#43C5FF",
        black: "#2C2C2C",
        gray: "#9A9A9A",
        lightgray: "#D4D4D4",
        green: "#2AC84D",
        background: "#F5F7FB",
      },
      maxWidth: {
        container: "1440px",
        products: "1078px",
        categories: "353px",
      },
    },
  },
  plugins: [],
}

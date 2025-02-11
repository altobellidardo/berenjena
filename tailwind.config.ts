import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          black: "#050505",
          midnight: "#105058",
          blue: "#1B9AAA",
          cyan: "#7CBBBB",
          bone: "#DDDBCB",
          white: "#F5F1E3"
        }
      },
    },
  },
  plugins: [],
} satisfies Config;

import { fontFamily } from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export const content = ["./src/**/*.{js,ts,jsx,tsx,mdx}"];
export const theme = {
  extend: {
    fontFamily: {
      "montserrat-regular": [
        "var(--font-montserrat-regular)",
        ...fontFamily.sans,
      ],
      "montserrat-medium": [
        "var(--font-montserrat-medium)",
        ...fontFamily.sans,
      ],
      "avenir-book": ["var(--font-avenir-book)", ...fontFamily.sans],
    },
  },
};
export const plugins = [];

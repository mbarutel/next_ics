import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "advantages_background": "url('/assets/images/advantages-bg.jpg')",
      },
    },
    // colors: {
    //   "rain": "#eaeff4",
    //   "elden": "#f28c09",
    //   "indian": "#f1d9c2",
    //   "regal": "#dac3b2",
    //   "chili": "#bd4a3d",
    //   "night": "#3e2926",
    //   "dove": "#bfbebd",
    //   "hibiscus": "#A4343A",
    //   "plum": "#393641",
    // },
  },
  plugins: [
    require("@tailwindcss/typography"),
  ],
};
export default config;

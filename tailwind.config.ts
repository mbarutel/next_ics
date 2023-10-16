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
        "gradient-radial":
          "background-image: radial-gradient(circle, #d16ba5, #c777b9, #ba83ca, #aa8fd8, #9a9ae1, #8aa7ec, #79b3f4, #69bff8, #52cffe, #41dfff, #46eefa, #5ffbf1);",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
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
    require("tailwind-clip-path"),
  ],
};
export default config;

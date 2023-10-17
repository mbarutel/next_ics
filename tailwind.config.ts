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
          "linear-gradient(to left top, #de8a1f, #e08525, #e17f2a, #e27a2f, #e37534, #e36f36, #e26939, #e1633b, #e05b3b, #de523c, #dc493e, #da3f3f);",
      },
    },
  },
  plugins: [
    require("tailwind-clip-path"),
  ],
};
export default config;

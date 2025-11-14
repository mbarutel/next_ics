import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./sections/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial":
          "linear-gradient(to left top, #de8a1f, #e08525, #e17f2a, #e27a2f, #e37534, #e36f36, #e26939, #e1633b, #e05b3b, #de523c, #dc493e, #da3f3f);",
        "paper_texture": "url('/assets/images/textured-paper.png')",
        "divider_bg": "url('/assets/images/abobackground5-ai.svg')",
        "paper_gradient": "linear-gradient(90deg, snow 1px, #f0f0f0 1px);",
      },
      animation: {
        fadeIn: "fadeIn 0.3s ease-in-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
    // variants: {
    //   animation: ["responsive", "motion-safe", "motion-reduce"],
    // },
  },
  plugins: [
    require("tailwind-clip-path"),
  ],
};
export default config;

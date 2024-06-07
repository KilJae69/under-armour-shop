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
      },
      colors: {
        primary: "#f35c7a",
      },
    },
  },
  plugins: [],
  safelist: [
    "bg-gradient-to-r",
    "from-yellow-50",
    "to-pink-50",
    "from-pink-50",
    "to-blue-50",
    "from-blue-50",
    "to-yellow-50",
  ],
};
export default config;

import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        trail: {
          bg: "#FAF8F2",
          ink: "#1E2A22",
          blue: "#1C3D5A",
          "blue-dark": "#12283C",
          gold: "#D9A441",
          "gold-dark": "#B4802B",
          green: "#3F6B4C",
          "green-dark": "#2C4D37",
          line: "#E4DFD2",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        trail: "1.25rem",
      },
      backgroundImage: {
        contour:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Cg fill='none' stroke='%231C3D5A' stroke-opacity='0.06' stroke-width='1.5'%3E%3Ccircle cx='100' cy='100' r='30'/%3E%3Ccircle cx='100' cy='100' r='55'/%3E%3Ccircle cx='100' cy='100' r='80'/%3E%3Ccircle cx='100' cy='100' r='105'/%3E%3C/g%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
};
export default config;

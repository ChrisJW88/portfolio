/** @type {import('tailwindcss').Config} */
/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        midnight: "#071B3A",
        abyss: "#0F254C",
        slate: "#162D5C",
        indigo: "#1F3770",
        aurora: "#40C8F4",
        signal: "#51E6C2",
        citrine: "#F4B740",
        textPrimary: "#EDF1FF",
        textSecondary: "#9BB2E1",
        textMuted: "#5C6A92",
        success: "#63FF9D",
        danger: "#FF6E6E"
      },
      fontFamily: {
        display: ["var(--font-display)", "Poppins", "sans-serif"],
        body: ["var(--font-body)", "Inter", "sans-serif"]
      },
      boxShadow: {
        glow: "0 20px 50px rgba(64, 200, 244, 0.25)",
        card: "0 30px 60px rgba(0, 0, 0, 0.35)"
      },
      borderRadius: {
        large: "1.5rem"
      },
      backgroundImage: {
        "orbit-gradient": "radial-gradient(circle at top, rgba(64,200,244,0.25), transparent 60%)"
      }
    }
  },
  plugins: []
};

export default config;


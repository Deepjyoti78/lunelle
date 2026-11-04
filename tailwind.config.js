/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lunelle: {
          bg: "#100D0B",
          dark: "#251710",
          amber: "#D88B55",
          cream: "#F5E5D2",
          muted: "#C8B8AA",
          border: "rgba(245, 229, 210, 0.16)",
          glass: "rgba(22, 16, 13, 0.45)",
          glassActive: "rgba(245, 229, 210, 0.15)",
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        romantic: ['"Playfair Display"', '"Newsreader"', '"Cormorant Garamond"', 'Georgia', 'serif'],
      },
      boxShadow: {
        subtle: "0 4px 20px -2px rgba(0, 0, 0, 0.5)",
        glassPill: "0 4px 20px -2px rgba(0, 0, 0, 0.4), inset 0 1px 1px 0 rgba(255, 255, 255, 0.08)",
        pillGlow: "0 0 25px -4px rgba(216, 139, 85, 0.18)",
        btnHover: "0 4px 24px rgba(245, 229, 210, 0.3)",
      }
    },
  },
  plugins: [],
}

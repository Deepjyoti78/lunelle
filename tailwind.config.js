/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        aevora: {
          bg: "#100D0B",
          dark: "#251710",
          amber: "#D88B55",
          cream: "#F5E5D2",
          muted: "#C8B8AA",
          border: "rgba(245, 229, 210, 0.18)",
          glass: "rgba(22, 16, 13, 0.55)",
          glassActive: "rgba(245, 229, 210, 0.16)",
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        romantic: ['"Cormorant Garamond"', '"Newsreader"', '"Playfair Display"', 'Georgia', 'serif'],
      },
      boxShadow: {
        subtle: "0 4px 20px -2px rgba(0, 0, 0, 0.5)",
        pillGlow: "0 0 25px -4px rgba(216, 139, 85, 0.15)",
        btnHover: "0 4px 20px rgba(245, 229, 210, 0.25)",
      }
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0F172A",  // Deep Dark Background (Sidebar, Navbar)
        secondary: "#1E293B", // Card & Section Background
        accent: "#3B82F6", // Primary Accent (Buttons, Highlights, Charts)
        accentSecondary: "#8B5CF6", // Secondary Accent (Interactive Elements)
        textPrimary: "#E2E8F0", // Light Text for Readability
        textSecondary: "#94A3B8", // Muted Text (Less Important Info)
        border: "#334155", // Border Color for Separation
      },
    },
  },
  plugins: [],
};
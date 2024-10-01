/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "#F8F9FA", // Light grey background for better contrast
        foreground: "#212529", // Dark foreground for text
        primary: {
          DEFAULT: "#1D4ED8", // Primary color - Blue
          foreground: "#FFFFFF", // Foreground color for primary
        },
        secondary: {
          DEFAULT: "#6C757D", // Secondary color - Grey
          foreground: "#FFFFFF", // Foreground color for secondary
        },
        destructive: {
          DEFAULT: "#E3342F", // Destructive action color - Red
          foreground: "#FFFFFF", // Foreground color for destructive
        },
        muted: {
          DEFAULT: "#ADB5BD", // Muted color - Light grey
          foreground: "#495057", // Foreground color for muted
        },
        accent: {
          DEFAULT: "#FFD700", // Accent color - Gold
          foreground: "#212529", // Foreground color for accent
        },
        popover: {
          DEFAULT: "#FFFFFF", // Popover background color - White
          foreground: "#212529", // Foreground color for popover
        },
        card: {
          DEFAULT: "#FFFFFF", // Card background color - White
          foreground: "#212529", // Foreground color for card
        },
      },
      borderRadius: {
        lg: "12px", // Large border radius for modern look
        md: "8px", // Medium border radius
        sm: "4px", // Small border radius
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

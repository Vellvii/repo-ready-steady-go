import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
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
      fontFamily: {
        baskerville: ["Libre Baskerville", "Baskerville Old Face", "serif"],
        montserrat: ["Montserrat", "sans-serif"],
        orbitron: ["Orbitron", "sans-serif"],
        rajdhani: ["Rajdhani", "sans-serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
      backgroundImage: {
        'gradient-luxury': 'linear-gradient(135deg, hsl(28, 12%, 6%) 0%, hsl(28, 16%, 11%) 50%, hsl(32, 24%, 16%) 100%)',
        'gradient-primary': 'linear-gradient(135deg, hsl(38, 40%, 67%), hsl(40, 44%, 74%))',
        'gradient-secondary': 'linear-gradient(135deg, hsl(30, 26%, 48%), hsl(38, 40%, 67%))',
        'gradient-dark': 'linear-gradient(180deg, hsl(28, 12%, 5%) 0%, hsl(30, 14%, 10%) 100%)',
        'gradient-accent': 'linear-gradient(135deg, hsl(32, 32%, 60%), hsl(38, 40%, 67%))',
      },
      boxShadow: {
        'luxury': '0 40px 110px -40px hsl(0 0% 0% / 0.6), 0 12px 40px -18px hsl(0 0% 0% / 0.4)',
        'glow': '0 0 60px hsl(38 40% 67% / 0.1)',
        'elegant': '0 28px 70px -32px hsl(0 0% 0% / 0.55)',
        'teal': '0 0 30px hsl(38 40% 67% / 0.1)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;

import type { Config } from "tailwindcss";

export default {
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
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      colors: {
        border: '#e5e5e5', // stone-200
        input: '#f5f5f5', // stone-100
        ring: '#c4b5fd',  // violet-300
        background: '#fafafa', // stone-50
        foreground: '#1c1917', // stone-950

        primary: {
          DEFAULT: '#7c3aed',         // violet-600
          foreground: '#f5f3ff',      // violet-100
          glow: '#c4b5fd',            // violet-300
        },
        secondary: {
          DEFAULT: '#f5f5f4',         // stone-400
          foreground: '#ffffff',     // white
        },
        success: {
          DEFAULT: '#22c55e',         // green-500
          foreground: '#f0fdf4',      // green-50
          glow: '#86efac',            // green-300
        },
        warning: {
          DEFAULT: '#facc15',         // yellow-400
          foreground: '#fefce8',      // yellow-50
        },
        destructive: {
          DEFAULT: '#ef4444',         // red-500
          foreground: '#fef2f2',      // red-50
        },
        muted: {
          DEFAULT: '#e7e5e4',         // stone-200
          foreground: '#78716c',      // stone-500
        },
        accent: {
          DEFAULT: '#ede9fe',         // violet-100
          foreground: '#6d28d9',      // violet-700
        },
        card: {
          DEFAULT: '#ffffff',         // white
          foreground: '#1c1917',      // stone-950
        },
        sidebar: {
          DEFAULT: '#1c1917',         // stone-950
          foreground: '#f5f5f4',      // stone-100
          primary: '#7c3aed',         // violet-600
          'primary-foreground': '#ede9fe', // violet-100
          accent: '#a8a29e',          // stone-400
          'accent-foreground': '#ffffff', // white
          border: '#3f3f46',          // stone-700
          ring: '#7c3aed',            // violet-600
        },
      },

      backgroundImage: {
        'gradient-primary': 'linear-gradient(to right, #7c3aed, #a78bfa)',
        'gradient-success': 'linear-gradient(to right, #22c55e, #86efac)',
        'gradient-chart': 'linear-gradient(to top, #ede9fe, #c4b5fd)',
      },
      boxShadow: {
        'glow': '0 0 8px 2px rgba(124, 58, 237, 0.4)',   // violet glow
        'success': '0 0 8px 2px rgba(34, 197, 94, 0.4)', // green glow
        'card': '0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'bounce': 'cubic-bezier(0.68, -0.55, 0.27, 1.55)'
      },
      borderRadius: {
        lg: '0.75rem',
        md: '0.5rem',
        sm: '0.25rem'
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        harir: {
          // Primary Deep Emerald / Forest Jade (from Harir Fashion logo)
          emerald: {
            DEFAULT: '#0A2B22',
            50: '#F2F8F5',
            100: '#DFEFEA',
            200: '#C0E0D6',
            300: '#97CCBD',
            400: '#69B09E',
            500: '#3D8F7B',
            600: '#1F7561',
            700: '#186A55',
            800: '#0A2B22',
            900: '#061E18',
            950: '#03120E',
          },
          // Silk Draping Emerald (accent highlight)
          silk: {
            DEFAULT: '#186A55',
            light: '#238E73',
            dark: '#0F4D3D',
          },
          // Warm Lotus Gold / Gold Rim (from Harir Fashion logo)
          gold: {
            DEFAULT: '#C5A059',
            50: '#FAF8F3',
            100: '#F5EFE2',
            200: '#EBDDC2',
            300: '#DEC69E',
            400: '#D0AE75',
            500: '#C5A059',
            600: '#AA853E',
            700: '#87672D',
            800: '#634A1F',
          },
          // Backward-compatible aliases mapped directly to new brand colors:
          plum: {
            DEFAULT: '#0A2B22',
            50: '#F2F8F5',
            100: '#DFEFEA',
            200: '#C0E0D6',
            300: '#97CCBD',
            400: '#69B09E',
            500: '#3D8F7B',
            600: '#1F7561',
            700: '#186A55',
            800: '#0A2B22',
            900: '#061E18',
            950: '#03120E',
          },
          burgundy: {
            DEFAULT: '#186A55',
            hover: '#135443',
            50: '#F0F9F6',
            100: '#DAF0E9',
            200: '#B6E2D5',
            300: '#8CD0BE',
            400: '#5FB9A2',
            500: '#3A9C84',
            600: '#26806B',
            700: '#186A55',
            800: '#125141',
            900: '#0B352A',
          },
          champagne: {
            DEFAULT: '#C5A059',
            light: '#EBDDC2',
            50: '#FAF8F3',
            100: '#F5EFE2',
            200: '#EBDDC2',
            300: '#DEC69E',
            400: '#D0AE75',
            500: '#C5A059',
            600: '#AA853E',
            700: '#87672D',
            800: '#634A1F',
          },
          ivory: {
            DEFAULT: '#F7F4EE',
            light: '#FAF8F4',
            dark: '#EFEAE0',
          },
          charcoal: {
            DEFAULT: '#0E221C',
            muted: '#526963',
            light: '#7A948D',
            dark: '#071511',
          },
          surface: {
            border: '#E2DCD3',
            'border-dark': '#267962',
            card: '#FFFFFF',
            'card-dark': '#1C644E',
            bg: '#F8F6F1',
            'bg-dark': '#0B2920',
          }
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        redaction: ['"Redaction"', 'serif'],
      },
      boxShadow: {
        'subtle': '0 2px 10px rgba(10, 43, 34, 0.04)',
        'card': '0 4px 20px -2px rgba(10, 43, 34, 0.08)',
        'elevated': '0 10px 30px -5px rgba(10, 43, 34, 0.14)',
        'gold': '0 0 25px rgba(197, 160, 89, 0.4)',
      }
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'integr8': {
          'blue': '#5B8DD9',
          'blue-dark': '#4A7BC7',
          'blue-light': '#7AA3E5',
          'dark': '#2D3748',
          'darker': '#1A202C',
          'light': '#F7FAFC',
          'muted': '#718096',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        marquee: 'marquee 20s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        }
      }
    },
  },
  plugins: [require('daisyui'), require('@tailwindcss/typography')],
  daisyui: {
    themes: [
      {
        integr8: {
          'primary': '#5B8DD9',
          'primary-focus': '#4A7BC7',
          'primary-content': '#ffffff',
          'secondary': '#7AA3E5',
          'secondary-focus': '#5B8DD9',
          'secondary-content': '#ffffff',
          'accent': '#38A169',
          'accent-focus': '#2F855A',
          'accent-content': '#ffffff',
          'neutral': '#2D3748',
          'neutral-focus': '#1A202C',
          'neutral-content': '#F7FAFC',
          'base-100': '#ffffff',
          'base-200': '#F7FAFC',
          'base-300': '#E2E8F0',
          'base-content': '#2D3748',
          'info': '#3182CE',
          'success': '#38A169',
          'warning': '#DD6B20',
          'error': '#E53E3E',
        },
        integr8dark: {
          'primary': '#7AA3E5',
          'primary-focus': '#5B8DD9',
          'primary-content': '#ffffff',
          'secondary': '#5B8DD9',
          'secondary-focus': '#4A7BC7',
          'secondary-content': '#ffffff',
          'accent': '#48BB78',
          'accent-focus': '#38A169',
          'accent-content': '#ffffff',
          'neutral': '#F7FAFC',
          'neutral-focus': '#E2E8F0',
          'neutral-content': '#1A202C',
          'base-100': '#1A202C',
          'base-200': '#2D3748',
          'base-300': '#4A5568',
          'base-content': '#F7FAFC',
          'info': '#63B3ED',
          'success': '#48BB78',
          'warning': '#ED8936',
          'error': '#FC8181',
        },
      },
    ],
    darkTheme: 'integr8dark',
  },
}

import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    colors: {
      'dark_gray': 'rgba(115, 115, 115, 1)',
      'light_gray': 'rgba(169, 169, 169, 1)',
      'yellow': 'rgba(255, 222, 61, 1)',
      'off_yellow': 'rgba(255, 222, 61, 0.3)',
      'pink': 'rgba(228, 163, 163, 1)',
      'off_pink': 'rgba(228, 163, 163, 0.3)',
      'blue': 'rgba(103, 191, 227, 1)',
    },
  },
  plugins: [],
}
export default config

import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold:    '#c9a84c',
        'gold-lt': '#e8c97a',
        'gold-dk': '#8a6825',
        panel:   '#111111',
        border:  '#1e1e1e',
        soft:    '#888888',
      },
      fontFamily: {
        cormorant: ['var(--font-cormorant)', 'serif'],
        mono:      ['var(--font-mono)', 'monospace'],
        sans:      ['var(--font-sans)', 'sans-serif'],
        display:   ['var(--font-display)', 'sans-serif'], 
      },
    },
  },
  plugins: [],
};
export default config;

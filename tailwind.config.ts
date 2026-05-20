import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        mono: ['Consolas', 'Courier New', 'monospace'],
        fangsong: ['FangSong', '仿宋', 'STFangsong', 'serif'],
      },
      colors: {
        bg: '#f9f9f7',
        'text-primary': '#0a0a0a',
        'text-secondary': '#888',
        'text-muted': '#999',
        'card-white': '#ffffff',
        'card-dark': '#0a0a0a',
        'card-border': '#e5e5e0',
        'border-light': '#e8e8e4',
      },
    },
  },
  plugins: [],
} satisfies Config

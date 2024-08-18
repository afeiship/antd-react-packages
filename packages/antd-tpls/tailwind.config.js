import jswPresets from '@jswork/presets-tailwind';

/** @type {import('tailwindcss').Config} */
export default {
  presets: [jswPresets()],
  content: [
    './public/index.html',
    './public/src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {}
  },
  plugins: []
};
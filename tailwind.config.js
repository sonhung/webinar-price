const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/views/**/*.{js,ts,jsx,tsx}',
    './src/hooks/**/*.{js,ts,jsx,tsx}',
    './src/layout/**/*.{js,ts,jsx,tsx}',
  ],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      fontSize: {
        tiny: ['11px', '13px'],
      },
      colors: {
        primary: 'var(--primary)',

        'medium-pink': 'var(--medium-pink)',
        'dark-pink': 'var(--dark-pink)',
        'black-pink': 'var(--black-pink)',

        'light-pink': 'var(--light-pink)',
        'dark-brown': 'var(--dark-brown)',
        'bold-brown': 'var(--bold-brown)',
        'light-brown': 'var(--light-brown)',

        gray: 'var(--gray)',
        'medium-gray': 'var(--medium-gray)',

        'main-black': 'var(--main-black)',
        'sub-brown': 'var(--sub-brown)',

        'light-gray': 'var(--light-gray)',
        'bold-green': 'var(--bold-green)',
        lime: 'var(--lime)',
        'gray-message': 'rgba(153, 144, 141, 0.5)',
        'gray-modal': 'rgba(0, 0, 0, 0.4)',

        danger: 'var(--danger)',
        warning: 'var(--warning)',
        green: 'var(--green)',
        'light-green': 'var(--light-green)',
        blue: 'var(--blue)',
        'light-blue': 'var(--light-blue)',
        orange: 'var(--orange)',
      },
      keyframes: {
        'scale-in': {
          '0%': { opacity: 0, transform: 'scale(0)' },
          '100%': { opacity: 1, transform: 'scale(1)' },
        },
        'slide-down': {
          '0%': { opacity: 0, transform: 'translateY(-10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        'slide-up': {
          '0%': { opacity: 0, transform: 'translateY(10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        'scale-in-content': {
          '0%': { transform: 'rotateX(-30deg) scale(0.9)', opacity: 0 },
          '100%': { transform: 'rotateX(0deg) scale(1)', opacity: 1 },
        },
      },
      animation: {
        'scale-in': 'scale-in 0.2s ease-in-out',
        'slide-down': 'slide-down 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-up': 'slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        'scale-in-content': 'scale-in-content 0.2s ease',
      },
      boxShadow: {
        drop: 'var(--drop-shadow)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('tailwindcss-radix')(),

    plugin(({ addVariant }) => {
      addVariant('mac', '.mac &')
      addVariant('windows', '.windows &')
      addVariant('ios', '.ios &')
    }),
  ],
}

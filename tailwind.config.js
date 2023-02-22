/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{vue,js,ts,jsx,tsx}", ],
   theme: {
     extend: {
      colors: {
         'rca-white': '#FAFAFA',
         'rca-black': '#111517'
      },

      boxShadow: {
         rca: '0px 2px 9px rgba(0, 0, 0, 0.0532439)'
      }
     },
   },
   plugins: [],
 }
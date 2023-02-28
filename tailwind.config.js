/** @type {import('tailwindcss').Config} */

module.exports = {
   content: ["./src/**/*.{vue,js,ts,jsx,tsx}", ],

   darkMode: "class",

   theme: {
     extend: {
      colors: {
         'rca-white': '#FAFAFA',
         'rca-black': '#111517',
         'rca-grey': '#2B3844',
         'rca-grey-2': '#202C36'
      },

      boxShadow: {
         rca: '0px 2px 9px rgba(0, 0, 0, 0.0532439)'
      },

      keyframes: {
         animLoader: {
            '0%, 100%': { top: '0', color: 'black' },
            '50%': { top: '30px', color: 'rgba(255, 255, 255, 0.2)' }
         },

         animLoaderDark: {
            '0%, 100%': { top: '0', color: 'white' },
            '50%': { top: '30px', color: 'rgba(255, 255, 255, 0.072)' }
         },

         animLoaderDark_D: {
            '0%, 100%': { top: '0', color: 'white' },
            '50%': { top: '30px', color: 'rgba(255, 255, 255, 0.072)' }
         }
      },

      animation: {
         animLoader: 'animLoader 2s 0.2s ease infinite',
         animLoaderDark: 'animLoaderDark 2s 0.2s ease infinite',
         animLoaderDark_D: 'animLoaderDark_D 2s 0.10s ease infinite'
      }
     },
   },

   plugins: [],
 }
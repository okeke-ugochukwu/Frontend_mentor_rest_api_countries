<template>
   <header 
         class="
            flex bg-white shadow-[0px_2px_4px_rgba(0,0,0,0.0562443)] 
            h-[80px] max-h-[80px] mb-6 
            sm:mb-12
         "
      >
         
         <!-- CENTERED BOX -->
         <div class="w-[91.46%]  m-auto flex justify-between md:w-[88.88%] 2xl:w-[83%]">
            <router-link to="/">
               <h1 class="text-sm text-rca-black font-extrabold md:text-2xl">
                  Where in the world?
               </h1>
            </router-link>

            <button class="flex justify-between items-center gap-2.5">
               <svg 
                  viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg"
                  class="[&>path]:fill-white [&>path]:stroke-rca-black w-[12px] h-[11px] md:w-[15px] md:h-[13.75px]"
               >
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M9.84257 9.052C6.73486 9.052 4.21543 6.74226 4.21543 3.89457C4.21543 2.82024 4.57343 1.82526 5.18514 1C2.75229 1.75612 1 3.86498 1 6.35045C1 9.47079 3.75943 12 7.16286 12C9.87429 12 12.1757 10.3945 13 8.16362C12.1 8.72383 11.0129 9.052 9.84257 9.052Z" />
               </svg>


               <span class="text-xs text-rca-black font-semibold md:text-base">
                  Dark Mode
               </span>
            </button>
         </div>

      </header>
</template>

<script>
   export default {
      name: 'headerBar',
      
      setup () {
         

         return {}
      }
   }
</script>


<template>
   <div class="min-h-screen bg-rca-white">
      <header 
         class="
            flex bg-white shadow-[0px_2px_4px_rgba(0,0,0,0.0562443)] 
            h-[80px] max-h-[80px] mb-6 
            sm:mb-12
         "
      >
         
         <!-- CENTERED BOX -->
         <div class="w-[91.46%]  m-auto flex justify-between md:w-[88.88%] 2xl:w-[83%]">
            <h1 class="text-sm text-rca-black font-extrabold md:text-2xl">
               Where in the world?
            </h1>

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

      <main class="mb-[65px]">

         <!-- CENTERED BOX -->
         <div class="w-[91.46%] m-auto md:w-[88.88%] 2xl:w-[83%]">

            <!-- SEARCH + fILTER -->
            <div class="w-full flex flex-col gap-[40px] md:flex-row justify-between">

               <!-- SEARCH -->
               <div 
                  class="
                     flex flex-row-reverse justify-end items-center gap-[32.2px] px-[32px] py-4 w-full 
                     bg-white min-h-[48px] rounded-[5px] shadow-rca max-w-[480px]
                     md:min-h-[56px]
                  "
               >
                  <input 
                     type="text" name="text" id="text"
                     autocomplete="off"
                     placeholder="Search for a country…"
                     class="text-xs text-[#C4C4C4] placeholder:text-[#C4C4C4] w-full focus:outline-none focus:text-[#848484] peer/search md:text-sm"
                  >

                  <svg 
                     class="[&>path]:fill-[#B2B2B2] w-4 h-4 peer-focus/search:[&>path]:fill-[#848484] md:w-[18px] md:h-[18px]" 
                     viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"
                  >
                     <path class="" fill-rule="evenodd" clip-rule="evenodd" d="M11.1111 9.77778H10.4L10.1333 9.51111C11.0222 8.53333 11.5556 7.2 
                     11.5556 5.77778C11.5556 2.57778 8.97778 0 5.77778 0C2.57778 0 0 2.57778 0 5.77778C0 8.97778 2.57778 11.5556 5.77778 11.5556C7.2 
                     11.5556 8.53333 11.0222 9.51111 10.1333L9.77778 10.4V11.1111L14.2222 15.5556L15.5556 14.2222L11.1111 9.77778ZM5.77778 9.77778C3.55556 
                     9.77778 1.77778 8 1.77778 5.77778C1.77778 3.55556 3.55556 1.77778 5.77778 1.77778C8 1.77778 9.77778 3.55556 9.77778 5.77778C9.77778 
                     8 8 9.77778 5.77778 9.77778Z"
                     />
                  </svg>

               </div>

               <!-- FILTER -->
               <div class="relative">
                  <!-- ACTUAL SELECT + OPTIONS -->
                  <select name="regions" id="regions" class="hidden">
                     <option  
                        v-for="region in regions.list" :key="region"
                        :value="region"
                     >
                        {{ region }}
                     </option>
                  </select>

                  <!-- DUMMY SELECT + OPTIONS -->
                  <button 
                     class="
                        bg-white rounded-[5px] w-[200px] flex items-center 
                        justify-between py-[14px] pl-[24px] pr-[19px] shadow-rca min-h-[48px]
                        md:min-h-[56px]
                     "
                     @click="regions.isShown? regions.isShown = false : regions.isShown = true"
                  >
                     <span class="text-xs text-rca-black md:text-sm"> Filter by Region </span>

                     <svg 
                        viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg"
                        class="[&>path]:fill-black w-[8px] h-[6px] md:h-[10px]"
                     >
                           <path fill-rule="evenodd" clip-rule="evenodd" d="M6.875 0.875L4 3.75L1.125 0.875L0.25 1.75L4 5.5L7.75 1.75L6.875 0.875Z"/>
                     </svg>
                  </button>

                  <div class="absolute bg-white rounded-[5px] w-[200px] mt-1 shadow-rca" v-show="regions.isShown">
                     <ul class="py-4">
                        <li 
                           v-for="region in regions.list" :key="region"
                           class="
                              text-xs text-rca-black pl-[24px] leading-4 py-1 
                              hover:cursor-pointer hover:opacity-75
                              md:text-sm
                           "
                        >
                           {{ region }}
                        </li>
                     </ul>
                  </div>
               </div>
            </div>

            <!-- COUNTRIES GRID  -->
            <div>

               <!-- PERLOADER -->
               <div class="w-full flex justify-center" v-if="countries.length === 0 || countries === null ">
                  <loader class="ml-[-50px]"/>
               </div>

               <!-- GRID -->
               <div
                  class="
                     grid auto-rows-auto gap-y-10 w-[76.96%] m-auto mt-8
                     sm:w-[90%] sm:grid-cols-2 gap-10 sm:mt-12
                     lg:w-full  lg:grid-cols-3
                     xl:grid-cols-4 lg:gap-[75px]
                  "
               >
                  
               <countryCard 
                  v-for="country in countries.slice(0,4)" :key="country.name"
                  :country="country"
               />

               </div>
            </div>
         </div>
         
      </main>
   </div>
</template>

<script>
   import loader from '@/components/loader.vue'
   import countryCard from '@/components/countryCard.vue'
   import { ref, onMounted } from 'vue';
   import axios from 'axios'

   export default {
      name: 'homePage',
      components: { loader, countryCard },
      
      setup () {
         const regions = ref({
            isShown: false,
            list: ['None', 'Africa', 'America', 'Asia', 'Europe', 'Oceania']
         });

         const countries = ref([]);

         //GET_COUNTRIES
         const getCountries = async () => {
            await axios.get(' http://localhost:3000/countries')
               .then(response => {
                  console.log(response.data)
                  countries.value = response.data
               })
               .catch(error => {
                  console.log(error);
                  console.log(countries)
               })
         }

         
         onMounted(() => {
            getCountries();
         })

         return { regions, countries }
      }
   }
</script>



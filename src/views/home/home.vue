<template>
   <div class="min-h-screen bg-rca-white">

      <headerBar />
      
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
                     autocomplete="off" :value="searchQuery "
                     placeholder="Search for a country…"
                     class="text-xs text-[#C4C4C4] placeholder:text-[#C4C4C4] w-full focus:outline-none focus:text-[#848484] peer/search md:text-sm" @keyup="SET_SEARCH_QUERY"
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
                  <select name="regions" id="regions" class="hidden" v-model="filterQuery">
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
                     @click="regionslistIsShown? regionslistIsShown = false : regionslistIsShown = true"
                   >
                     <span class="text-xs text-rca-black md:text-sm"> {{ filterQuery === 'None'? 'Filter by Region' : filterQuery }} </span>

                     <svg 
                        viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg"
                        class="[&>path]:fill-black w-[8px] h-[6px] md:h-[10px]"
                     >
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M6.875 0.875L4 3.75L1.125 0.875L0.25 1.75L4 5.5L7.75 1.75L6.875 0.875Z"/>
                     </svg>
                  </button>

                  <div class="absolute bg-white rounded-[5px] w-[200px] mt-1 shadow-rca" v-show="regionslistIsShown">
                     <ul class="py-4">
                        <li 
                           v-for="region in regions" :key="region"
                           class="
                              text-xs text-rca-black pl-[24px] leading-4 py-1 
                              hover:cursor-pointer hover:opacity-75
                              md:text-sm
                           "
                           @click="SET_REGION_FILTER(region)"
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
               <div 
                  class="w-full flex justify-center mt-10" 
                  v-if="countries.length === 0 || countries === null"
               >
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
                  v-for="country in filteredCountries.slice(0, countryCount)" :key="country.name"
                  :country="country"
               />

               </div>
            </div>

            <div 
               v-if="filteredCountries.length === 0 && searchQuery.length != 0"
               class="
                  bg-white py-3 w-full max-w-[400px] m-auto text-center
                  rounded-[5px] shadow-rca text-sm
                  md:text-base md:py-4
               "
            >
               Your search didn't pull up any results
            </div>


            <div 
               class="
                  mt-10 flex flex-col gap-3 sm:flex-row w-[76.96%] m-auto
                  justify-center
                  sm:w-[90%]
               "
            >
               <!-- SHOW MORE BTN -->
               <actionBtn  
                  @click="$store.commit('increaseCountryCount')"
                  v-if="filteredCountries.length != 0 && filteredCountries.length > 24"
                  class="
                     w-[60%] min-w-[200px] max-w-[300px] px-[30px] 
                     m-auto rounded-md min-h-[45px] font-bold
                  "
               > 
                  Show more countries
               </actionBtn>

               
               <actionBtn  
                  @click="SCROLL_TO_TOP"
                  v-if="filteredCountries.length != 0 && filteredCountries.length > 24"
                  class="
                     w-[60%] min-w-[200px] max-w-[300px] px-[30px] 
                     m-auto rounded-md min-h-[45px] font-bold
                  "
               > 
                  Go to top
               </actionBtn>

            </div>
         </div>
         
      </main>
   </div>
</template>

<script>
   import headerBar from '@/components/header.vue'
   import loader from '@/components/loader.vue'
   import actionBtn from '@/components/actionBtn.vue';
   import countryCard from '@/components/countryCard.vue'
   import GET_COUNTRIES from '@/composables/getCountries';
   import { ref, computed, onMounted } from 'vue';
   import { useStore } from 'vuex'

   export default {
      name: 'homePage',
      components: { headerBar, loader, actionBtn, countryCard },
      
      setup () {
         const store = useStore();

         //TO CONTROL CONTRIES DISPLAYED AT ONCE
         var countryCount = computed(() => {
            return store.state.countryCount
         });

         document.getElementById('app').addEventListener('mouseup',() => {
            regionslistIsShown.value = false
         })
        
         onMounted(() => {
            //CHECK IF THERE'S DATA IN STORE TFIRST
            countries.value.length === 0 ?
               GET_COUNTRIES(store) : console.log('Data in store')
         })

         //GENERTE LIST OF REGIONS & FILTER TOGGLE
         var regions = computed(() => {
            var temp = countries.value.map(country => country.region)
            //REMOVE DUPLICATES & SORT ALHABETICALLY
            temp = [...new Set(temp)].sort()

            return [  'None', ...temp ]
         })
         var regionslistIsShown = ref(false)
        
         //GET COUNTRIES FROM STATE
         const countries = computed(() => {
            return store.state.countries
         })      
         
         //GET & SET SEARCH QUERY
         var searchQuery = computed(() => {
            return store.state.queries.search
         });
         const SET_SEARCH_QUERY = (e) => {
            store.commit('setQuery', ['search', e.target.value])
         }

         //GET & SET FILTER QUERY
         var filterQuery = computed(() => {
            return store.state.queries.filter
         });
         const SET_REGION_FILTER = (region) => {
            store.commit('setQuery', ['filter', region])
            regionslistIsShown.value = false
         }
         const CLOSE_DROPDOWN = () => {
            regionslistIsShown.value === true?
               regionslistIsShown.value = false : console.log('Dropdown closed')
         }

         const filteredCountries = computed(() => {
           var temp = [];
           var search_query = searchQuery.value.toLowerCase();

           if(filterQuery.value === 'None') {
            temp = countries.value.filter(country => country.name.toLowerCase().includes(search_query))
           }
           else {
            temp = countries.value.filter(country => country.name.toLowerCase().includes(search_query) && country.region === filterQuery.value)
           }
           
            return temp
         }) 
         
         const SCROLL_TO_TOP = () => {
            window.scrollTo(0,0)
         }
         
         return { 
            regions, regionslistIsShown, 
            countries, filteredCountries,
            countryCount, CLOSE_DROPDOWN,
            searchQuery, SET_SEARCH_QUERY, 
            filterQuery, SET_REGION_FILTER,
            SCROLL_TO_TOP
         }
      }
   }
</script>



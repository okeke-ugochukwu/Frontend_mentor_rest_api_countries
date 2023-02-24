<template>
   <headerBar />

   <main class="mb-[60px]">

      <!-- CENTERED BOX -->
      <div class="w-[91.46%] m-auto md:w-[88.88%] 2xl:w-[83%]">
         <actionBtn @click="$router.go(-1)" class="md:min-w-[136px]"> 
            <svg 
               class="[&>path]:fill-rca-black w-[17px] h-[12px] md:w-[13.3px] md:h-[13.3px]" 
               viewBox="0 0 17 12" fill="none" xmlns="http://www.w3.org/2000/svg"
            >
               <path fill-rule="evenodd" clip-rule="evenodd" d="M5.81802 0.696699L6.87868 1.75736L3.3785 5.25754H16.7428L16.7428 6.74246H3.3785L6.87868 10.2426L5.81802 11.3033L0.514719 6L5.81802 0.696699Z" />
            </svg>

            <span> Back </span>
         </actionBtn>

         <!-- COUNTRY DETAILS -->
         <div 
            class="mt-16"
         >
            <!-- PRELOADER -->
            <div v-if="countryFiltered.length === 0" class="flex justify-center">
               <loader class="ml-[-50px]"/>
            </div>

            <!-- DETAILS -->
            <div v-else class="xl:flex xl:gap-[149.22px]">
               <!-- COUNTRY FLAG -->
               <div
                  class="
                     mb-11
                  "
               >
                  <img 
                     :src="country.flags.png" 
                     :alt="`${country.name.replaceAll(' ','_').toLowerCase()}'s_flag`"
                  >
               </div>

               <!-- COUNTRY INFO -->
               <div class="text-rca-black">
                  <h2 
                     class="
                        font-extrabold text-[22px] leading-[30.01px] mb-4 
                        md:text-[32px] md:leading-[43.65px] md:mb-[23px]
                     "
                  >
                     {{ country.name }}
                  </h2>

                  <!-- COUNTRY SUMMARY (FLEXBOX) -->
                  <div
                     class="
                        flex flex-col gap-8 mb-[34px]
                        sm:flex-row sm:gap-[117px]
                        md:mb-[68px]
                     "
                  >
                     <div>
                        <span
                           v-for="info in Object.entries(GET_COUNTRY_INFO(country)).slice(0 ,5)" :key="info"
                           class="
                              block text-sm leading-[32px]
                              md:text-base md:leading-8
                           "
                        >
                           <strong> {{ info[0] }}: </strong> {{ info[1] }}
                        </span>
                     </div>

                     <div>
                        <span
                           v-for="info in Object.entries(GET_COUNTRY_INFO(country)).slice(5)" :key="info"
                           class="
                              block text-sm leading-[32px]
                              md:text-base md:leading-8
                           "
                        >
                           <strong> {{ info[0] }}: </strong> {{ info[1] }}
                        </span>
                     </div>
                  </div>
                  
                  <!-- BORDER COUNTRIES -->
                  <div v-if="country.borders" class="max-w-[700px]">
                    <h3
                        class="text-base leading-6 font-semibold mb-4 md:inline-block"
                    >
                        Border Countries: &nbsp;
                    </h3>

                    <router-link  :to="country.code"
                        v-for="country in GET_BORDER_COUNTRIES(country.borders)" :key="country"
                        class="
                           inline-block text-xs py-[6px] px-[30px] bg-white rounded-sm mr-[10px]
                           shadow-[0px_0px_4px_1px_rgba(0,0,0,0.104931)] hover:bg-[#ffffff79] mb-[10px]
                           md:text-sm md:py-[5px]
                        "
                    >
                        {{ country.name }}
                    </router-link>
                  </div>
               </div>
            </div>
         </div>
      </div>

   </main>
   
</template>

<script>
   import headerBar from '@/components/header.vue'
   import loader from '@/components/loader.vue';
   import actionBtn from '@/components/actionBtn.vue'
   import GET_COUNTRIES from '@/composables/getCountries';
   import { computed, onMounted } from 'vue';
   import { useStore } from 'vuex'
   

   export default {
      name: 'countryDetail',
      components: { headerBar, loader, actionBtn },
      props: ['id'],

      setup (props) {
         const store = useStore();

         onMounted(() => {
            //CHECK IF THERE'S DATA IN STORE FIRST, THEN ACT ACCORDINGLY
            countries.value.length === 0 ?
               GET_COUNTRIES(store) :
               console.log('Data in store')
         })
         
         var countries = computed(() => { return store.state.countries}) 

         var countryFiltered = computed(() => {
            return countries.value.filter((country => country.alpha3Code === props.id))
         });

         var country = computed(() => {
            return countryFiltered.value[0]
         });

         const GET_COUNTRY_INFO = (country) => {
            return {
               'Native Name': country.nativeName,
               'Population': country.population.toLocaleString(),
               'Region': country.region,
               'Sub Region': country.subregion,
               'Capital': country.capital,
               'Top Level Domain': country.topLevelDomain.toString().replaceAll(',', ', '),
               'Currencies': 
                  country.currencies?
                  country.currencies.map(data => data.name).toString().replace(/(^\w|\s\w)/g, (m) => m.toUpperCase()) : ' ',
               'Languages': country.languages.map(data => data.name).toString().replaceAll(',', ', '),
            }
         }

         const GET_BORDER_COUNTRIES = (countryCodes) => {
            var borderCountries = []

            countryCodes.forEach(code => {
               countries.value.forEach(country => {
                  if (country.alpha3Code === code) {
                     borderCountries.push(
                        {
                           'name': country.name,
                           'code': country.alpha3Code
                        }
                     )
                  }
               })
            });

            return borderCountries
         }

         return { props, countryFiltered, country, countries, GET_COUNTRY_INFO, GET_BORDER_COUNTRIES }
      }
   }
</script>

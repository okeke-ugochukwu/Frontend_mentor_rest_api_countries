<template>
   <div class="min-h-screen bg-rca-white dark:bg-rca-grey-2 pb-[0.01px]">
      <headerBar />

      <main class="mb-[60px] dark:bg-rca-grey-2">

         <!-- CENTERED BOX -->
         <div class="w-[91.46%] m-auto md:w-[88.88%] dark:text-white ">
            <actionBtn @click="$router.go(-1)" class="md:min-w-[136px] dark:bg-rca-grey  dark:text-white"> 
               <svg 
                  class="[&>path]:fill-rca-black w-[17px] h-[12px] md:w-[13.3px] md:h-[13.3px] dark:[&>path]:fill-rca-white" 
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
               <div v-else class="xl:flex flex-row xl:gap-[149.22px]">
                  <!-- COUNTRY FLAG -->
                  <div
                     class="
                        mb-11 overflow-hidden w-full min-w-[320px] min-h-[229px] rounded-[10px]
                        sm:max-w-[320px]
                        xl:min-w-[560px] xl:max-w-[560px] xl:min-h-[401px] 
                     "
                     :style="{ 'background': `url(${country.flags.svg}) center/cover no-repeat` }"
                  >
                     
                  </div>

                  <!-- COUNTRY INFO -->
                  <div class="text-rca-black dark:text-white">
                     <h2 
                        class="
                           font-extrabold text-[22px] leading-[30.01px] mb-4 
                           md:text-[32px] md:leading-[43.65px] md:mb-[23px]
                        "
                     >
                        {{ country.name.official }}
                     </h2>

                     <!-- COUNTRY SUMMARY (FLEXBOX) -->
                     <div
                        class="
                           flex flex-col gap-8 mb-[34px]
                           sm:flex-row 
                           md:mb-[68px] 2xl:gap-[117px]
                        "
                     >
                        <div class="sm:max-w-[350px]">
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
                     <div 
                        v-if="country.borders" 
                        class="  "
                     >
                        <h3
                           class="text-base leading-6 font-semibold mb-4 md:inline-block"
                        >
                           Border Countries: &nbsp;
                        </h3>

                        <router-link :to="country.code"
                           v-for="country in GET_BORDER_COUNTRIES(country.borders)" :key="country"
                           class="
                              inline-block text-xs py-[6px] px-[30px] bg-white rounded-sm mr-[10px]
                              shadow-[0px_0px_4px_1px_rgba(0,0,0,0.104931)] hover:bg-[#ffffff79] mb-[10px]
                              md:text-sm md:py-[5px]
                              dark:bg-rca-grey dark:text-white
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
   </div>
   
</template>

<script>
   import headerBar from '@/components/header.vue'
   import loader from '@/components/loader.vue';
   import actionBtn from '@/components/actionBtn.vue'
   import GET_COUNTRIES from '@/composables/getCountries';
   import { computed, onMounted } from 'vue';
   import { useRouter } from 'vue-router';
   import { useStore } from 'vuex'
   

   export default {
      name: 'countryDetail',
      components: { headerBar, loader, actionBtn },
      props: ['id'],

      setup (props) {
         const store = useStore();
         const router = useRouter();

         onMounted(() => {
            //CHECK IF THERE'S DATA IN STORE FIRST, THEN ACT ACCORDINGLY
            countries.value.length === 0 ?
               GET_COUNTRIES(store) :
               console.log('Data in store');

            //GO BACK HOME IF THERE'S NO COUNTRY THAT MATCHES PROPS SEARCH 
            countryFiltered.value.length === 0 ?
               router.push('/'): '';
         })
         
         var countries = computed(() => { return store.state.countries }) 

         var countryFiltered = computed(() => {
            return countries.value.filter((country => country.cca3 === props.id))
         });

         var country = computed(() => {
            return countryFiltered.value[0]
         });

         const GET_COUNTRY_INFO = (country) => {
            return {
               'Native Name': 
                  Object.values(country.name.nativeName).length >= 2 ?
                     Object.values(country.name.nativeName)[1].official :
                     Object.values(country.name.nativeName)[0].official ,
               'Population': country.population.toLocaleString(),
               'Region': country.region,
               'Sub Region': country.subregion,
               'Capital': country.capital[0],
               'Top Level Domain': country.tld.toString().replaceAll(',', ', '),
               'Currencies': 
                  country.currencies?
                  GET_CURRENCIES(country) : ' ',
               'Languages': Object.values(country.languages).toString().replace(',', ', ')
            }
         }

         const GET_CURRENCIES = (country) => {
            return Object.values(country.currencies)
               .map(item => item.name)
                  .toString().replace(',', ', ')
                     .replace(/(^\w|\s\w)/g, m => m.toUpperCase())
         }

         const GET_BORDER_COUNTRIES = (countryCodes) => {
            var borderCountries = []

            countryCodes.forEach(code => {
               countries.value.forEach(country => {
                  if (country.cca3 === code) {
                     borderCountries.push(
                        {
                           'name': country.name.common,
                           'code': country.cca3
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

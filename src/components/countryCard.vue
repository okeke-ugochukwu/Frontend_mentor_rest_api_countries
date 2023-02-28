<template>
   <router-link :to="`countries/${country.alpha3Code}`" 
      class="
         min-h-[336px] max-h-[336px] bg-white shadow-[0px_0px_7px_2px_rgba(0,0,0,0.0294384)] 
         rounded-[5px] overflow-hidden hover:scale-[1.02]
         dark:bg-rca-grey 
      "
   >
      
      <img 
         :src="country.flags.png" 
         :alt="`${country.name.replaceAll(' ','_').toLowerCase()}'s_flag`"
         class="w-full min-h-[160px] max-h-[160px]"
      >

      <div class="px-6 p-6 text-rca-black dark:text-white">
         <h2 class="text-lg leading-[26px] font-extrabold mb-4">
            {{ country.name }}
         </h2>

         <span 
            v-for="data in Object.entries(getCounrtySummary(country))" :key="data"
            class="block text-sm leading-4 [&:not(:last-child)]:mb-2"
         >
            <strong>{{ data[0] }}:</strong> {{ data[1] }}
         </span>
      </div>

   </router-link >
</template>

<script>
   export default {
      name: 'countryCard',
      props: ['country'],

      setup () {
         const getCounrtySummary = (country) => {
            let summary = {
               'Population': country.population.toLocaleString(),
               'Region': country.region,
               'Capital': country.capital
            }

            return summary
         }


         return { getCounrtySummary }
      }
   }
</script>


<template>
   <headerBar />
   {{ country }} 
</template>

<script>
   import headerBar from '@/components/header.vue'
   import GET_COUNTRIES from '@/composables/getCountries';
   import { ref, computed, onMounted } from 'vue';
   import { useStore } from 'vuex'
   

   export default {
      name: 'countryDetail',
      components: { headerBar },
      props: ['id'],

      setup (props) {
         const store = useStore();

         onMounted(() => {
            //CHECK IF THERE'S DATA IN STORE FIRST, THEN ACT ACCORDINGLY
            countries.value.length === 0 ?
               GET_COUNTRIES_FROM_API() :
               GET_COUNTRY_FROM_STORE()
         })
         
         var countries = computed(() => { return store.state.countries}) 

         var country = ref([]);

         const GET_COUNTRIES_FROM_API = () => {
            GET_COUNTRIES(store);
            GET_COUNTRY_FROM_STORE();
         }
         
         const GET_COUNTRY_FROM_STORE = () => {
            //RECONSTRUCT THE COUNTRY NAME FROM URL ID
            var countryName = props.id.charAt(0).toUpperCase() + props.id.slice(1);

            //USE CONSTRUCT TO FIND COUNTRY
            country.value = countries.value.filter(
               (country => country.name === countryName)
            )  
         }

         return { country }
      }
   }
</script>

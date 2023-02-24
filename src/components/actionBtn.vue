<template>
   <button 
      class="
         flex items-center justify-center gap-2 text-rca-black text-sm font-light 
         px-[23px] py-[6px] bg-white rounded-sm shadow-rca hover:shadow-[0px_0px_7px_rgba(0,0,0,0.293139)] 
         md:text-base md:gap-[10px]  md:px-0 md:py-[10px] md:rounded-md
      "
   >
     <slot>
         Do somthing
      </slot>
   </button>
</template>

<script>
   export default {
      name: 'actionBtn',
      
      setup () {
         

         return {}
      }
   }
</script>


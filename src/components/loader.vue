<template>
   <span class="
      loader
      before:animate-animLoader after:animate-animLoader animate-animLoader
      
      dark:after:text-white dark:before:text-white dark:text-white   
      dark:before:animate-animLoaderDark_D dark:after:animate-animLoaderDark dark:animate-animLoaderDark
   ">

   </span>
</template>

<script>
export default {
   name: 'pageLoader'
}
</script>

<style lang="scss">
   .loader {
      width: 13px;
      height: 13px;
      box-shadow: 0 20px, 0 -20px;
      border-radius: 4px;
      background: currentColor;
      display: block;
      position: relative;
      transform: translateY(30px);
      box-sizing: border-box;
    //   animation: animloader 2s 0.2s ease infinite;
   }

   .loader::after,
   .loader::before {
      content: '';
      box-sizing: border-box;
      width: 13px;
      height: 13px;
      box-shadow: 0 20px, 0 -20px;
      border-radius: 4px;
      background: currentColor;
      position: absolute;
      left: 20px;
      top: 0;
    //   animation: animloader 2s 0.2s ease infinite;
   }

   .loader::before {
      animation-delay: 0.10s;
      left: 40px;
   }

   @keyframes animloader {
      0% {
         top: 0;
         color: black;
      }

      50% {
         top: 30px;
         color: rgba(255, 255, 255, 0.2);
      }

      100% {
         top: 0;
         color: black;
      }
   }
</style>
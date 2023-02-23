import { createRouter, createWebHistory } from 'vue-router'
import homePage from  '@/views/home/home.vue'

const routes = [
   // HOME - ALL COUNTRIES
   {
      path: '',
      redirect: { name: 'home' }
   },
   {
      path: '/home',
      redirect: { name: 'home' }
   },
   {
      path: '/',
      name: 'home',
      component: homePage
   },

   //COUNTRY DETAIL
   {
      path: '/countries',
      name: 'country',
      component: () => import(/* webpackChunkName: "countryDetail" */ '@/views/country/country.vue'),
      props: true,

      children: [
         {
            path: '',
            redirect: {name: 'home'}
         },

         {
            path: '/',
            redirect: {name: 'home'}
         },

         {
            path: ':id',
            name: 'country'
   
         }
      ]
   }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,

  scrollBehavior(to, from, savedPosition) {
      console.log(to, from, savedPosition)

      return new Promise((resolve) => {
         setTimeout(() => {
            if (savedPosition) {
               resolve(savedPosition)
            }
            else {
               resolve({ top: 0 })
            }
         }, 500)
      })
   }
})

export default router

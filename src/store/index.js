import { createStore } from 'vuex'

var store = createStore({
  state: {
   countries: [],
   theme: 'light'
  },
  getters: {
  },
  mutations: {
   setCountries(state, API_RESPONSE) {
      state.countries = API_RESPONSE
   }
  },
  actions: {
  },
  modules: {
  }
})

export default store

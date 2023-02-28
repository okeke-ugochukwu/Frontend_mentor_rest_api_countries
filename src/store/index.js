import { createStore } from 'vuex'

var store = createStore({
  state: {
      countries: [],

      countryCount: 12,

      queries: {
         search: '',
         filter: 'None'
      },

      theme: 'light'
  },
  getters: {
  },
  mutations: {
      setCountries(state, API_RESPONSE) {
         state.countries = API_RESPONSE
      },
      
      setQuery(state, payload) {
         payload[0] === 'search' ?
            state.queries.search = payload[1] : state.queries.filter = payload[1]
      },

      increaseCountryCount(state) {
         state.countryCount  = state.countryCount + 12
      }
  },
  actions: {
  },
  modules: {
  }
})

export default store

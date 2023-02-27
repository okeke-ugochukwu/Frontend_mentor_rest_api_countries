import { createStore } from 'vuex'

var store = createStore({
  state: {
      countries: [],

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
      }
  },
  actions: {
  },
  modules: {
  }
})

export default store

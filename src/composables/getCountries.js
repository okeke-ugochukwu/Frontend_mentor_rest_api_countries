import axios from 'axios'

const GET_COUNTRIES = async (store) => {
   //https://restcountries.com/v3.1/all
   await axios.get('https://restcountries.com/v3.1/all')
      .then(response => {
         store.commit('setCountries', response.data)
      })
      .catch(error => {
         console.log(error);
      })
}

export default GET_COUNTRIES;
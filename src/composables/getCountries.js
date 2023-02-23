import axios from 'axios'

const GET_COUNTRIES = async (store) => {
   await axios.get('http://localhost:3000/countries')
      .then(response => {
         store.commit('setCountries', response.data)
      })
      .catch(error => {
         console.log(error);
      })
}

export default GET_COUNTRIES;
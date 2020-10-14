// https://vuex.vuejs.org/en/actions.html
import axios from 'axios'

export default {
  //
  storeToekn: (state, token) => {
      sessionStorage.setItem('token', token) // store the token in localstorage
      state.commit('AUTH_SUCCESS', token)
  },

  destroyToken: (state) => {
    sessionStorage.setItem('token', null) // store the token in localstorage
    state.commit('DESTROY_TOKEN')
  },

  fetchUserProfile: (state, headers) => {
    return axios.get('/api/v1/json/users/profile', headers).then((res) => {
      state.commit('SETUSER_PROFILE', res.data.data[0])
    })
  },

  fetchCustomersRequests: (state, headers) => {
    return axios.get('/api/v1/json/requests', headers).then((res) => {
      state.commit('SETCUSTOMERS_REQUESTS', res.data.data)
    })
  }
}

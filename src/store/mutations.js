// https://vuex.vuejs.org/en/mutations.html

export default {
  //
  AUTH_SUCCESS: (state, token) => {
    state.session.status = 'success'
    state.session.token = token
  },
  AUTH_ERROR: (state) => {
    state.session.status = 'error'
  },

  DESTROY_TOKEN: (state) => {
    state.session.status = 'error'
    state.session.token = null
  },

  SETUSER_PROFILE: (state, payload) => {
    state.userProfile.data = payload
  },

  SETCUSTOMERS_REQUESTS: (state, payload) => {
    state.cutomersRequests.data = payload
  }

}

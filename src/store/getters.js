// https://vuex.vuejs.org/en/getters.html

export default {
  //
  isAuthenticated: state => !!state.session.token,
  authStatus: state => state.session.status,
  token: state => state.session.token,
  headers (state) {
    return {
      'token': state.session.token || null
    }
  },
  isHandyman (state) {
    return state.userProfile.data.user_type === 2
  },
  isHomeOwner (state) {
    return state.userProfile.data.user_type === 1
  }
}

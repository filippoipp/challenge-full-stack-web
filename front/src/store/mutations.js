export const state = {
  auth: undefined,
  user: {},
}

export const getters = {
  auth: state => state.auth,
  user: state => state.user,
}

export const actions = {
  setAuth(store, data) {
    store.commit('setAuth', data)
  },
  setUser(store, data) {
    store.commit('setUser', data)
  },
}

export const mutations = {
  showSnackbar() {
    // empty mutation, will be caught in App.vue from store subscribe
  },
  setAuth(store, enabled) {
    state.auth = enabled
  },
  setUser(state, data) {
    Object.assign(state.user, data)
  },
}
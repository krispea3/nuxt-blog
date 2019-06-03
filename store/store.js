const store = new Vuex.Store({
  state: {
    posts: []
  },
  getters: {
    posts (state) {
      return state.posts
    }
  },
  mutations: {
    increment (state) {
      state.count++
    }
  },
  actions: {
    
  }
})
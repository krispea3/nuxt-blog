export const state = () => ({
  posts: [],
  user: '',
  idToken: null
})

export const mutations = {
  loadPosts (state, posts) {
    state.posts = posts
  },
  addPostToPosts (state, payload) {
    state.posts.push({...payload.formData, id: payload.id})
  },
  updatePostInPosts (state, payload) {
    const index = state.posts.findIndex(i => i.id === payload.id)
    state.posts[index] = {...payload.formData, id: payload.id}
  },
  deletePostInPosts (state, id) {
    const index = state.posts.findIndex(i => i.id === id)
    state.posts.splice(index, 1)
  },
  login (state, user) {
    state.user = user.email
    state.idToken = user.idToken
  },
  logout (state) {
    state.user = ''
    state.idToken = null
  },
  loadUser (state, userData) {
    state.idToken = userData.token
    state.user = userData.user
  }
}

export const actions = {
  nuxtServerInit (vuexContext, context) {
    return (
      context.app.$axios.$get('/post.json')
        .then(data => {
          const posts = []
          for (const key in data) {
            posts.push({...data[key], id: key})
          }
          vuexContext.commit('loadPosts', posts)
        })
        .catch(err => {
          return context.error(err)
        })
    )
    // if (req.session.user) {
    //   commit('user', req.session.user)
    // }
  },
  addPost (context, formData) {
    return (
      this.$axios.$post('/post.json', formData)
        .then(data => {
          context.commit('addPostToPosts', {formData: formData, id: data.name})
        })
        .catch(err => {
          return console.log(err)
        })
    )
  },
  updatePost (context, payload) {
    return (
      this.$axios.$put('/post/' + payload.id + '.json', payload.formData)
        .then(data => {
          context.commit('updatePostInPosts', payload)
        })
        .catch(err => {
          return console.log(err)
        })
    )
  },
  deletePost (context, id) {
    return (
      this.$axios.$delete('/post/' + id + '.json')
        .then(data => {
          context.commit('deletePostInPosts', id)
        })
        .catch(err => {
           return console.log(err)
        })
    )
  },
  register ({ commit, dispatch }, formData) {
    return (
      this.$axios.$post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyC7ItGWr8uZpRAHrGC8_qztVg8QxMulzZE', {
        email: formData.email, 
        password: formData.password, 
        returnSecureToken: true
      })
        .then( data => {
          localStorage.setItem('token', data.idToken)
          localStorage.setItem('user', formData.email)
          const now = new Date()
          const expirationDate = new Date(now.getTime() + data.expiresIn * 1000)
          localStorage.setItem('expiresOn', expirationDate)
          commit('login', {email: formData.email, idToken: data.idToken})
          dispatch('setAulologout', data.expiresIn)
        })
        .catch(err => console.log(err))
    )
  },
  login ({ commit, dispatch }, formData) {
    return (
      this.$axios.$post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyC7ItGWr8uZpRAHrGC8_qztVg8QxMulzZE', {
        email: formData.email, 
        password: formData.password, 
        returnSecureToken: true
      })
        .then( data => {
          localStorage.setItem('token', data.idToken)
          localStorage.setItem('user', formData.email)
          const now = new Date()
          const expirationDate = new Date(now.getTime() + data.expiresIn * 1000)
          localStorage.setItem('expiresOn', expirationDate)
          commit('login', {email: formData.email, idToken: data.idToken})
          dispatch('setAutologout', data.expiresIn)
        })
        .catch(err => console.log(err))
    )
  },
  logout ({ commit }) {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('expiresOn')
    commit('logout')
  },
  setAutologout ({ dispatch }, duration) {
    setTimeout(()=>{
      dispatch('logout')
      alert("Your session has expired! Login again")
    }, duration)
  },
  tryAutoLogin ({ commit }) {
    // If no token abort
    if (!localStorage.token) {
      return
    }
    // If token expired abort
    const now = new Date()
    if (now > localStorage.expiresOn) {
      return
    }

    commit('loadUser', {user: localStorage.user, token: localStorage.token})
  }

}

export const getters = {
  posts (state) {
    return state.posts
  },
  post (state) {
    return state.post
  },
  user (state) {
    return state.user
  }
}

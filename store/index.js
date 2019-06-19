export const state = () => ({
  posts: [],
  user: {},
  error: '',
  isLoading: false,
  searchString: ''
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
    state.user = user
  },
  logout (state) {
    state.user = {}
    state.error = ''
    state.isLoading = false
  },
  loadUser (state, user) {
    state.user = user
  },
  updateUser (state, user) {
    state.user = user
  },
  setError (state, msg) {
    state.error = msg
  },
  isLoading (state, status) {
    state.isLoading = status
  },
  setSearchString (state, searchString) {
    state.searchString = searchString
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
  },
  addPost ({ commit, state }, formData) {
    return (
      this.$axios.$post('/post.json' + '?auth=' + state.user.idToken, formData)
        .then(data => {
          commit('setError', '')
          commit('addPostToPosts', {formData: formData, id: data.name})
        })
        .catch(err => {
          commit('setError', 'Cannot add post. Try again later')
        })
    )
  },
  updatePost ({ commit, state }, payload) {
    return (
      this.$axios.$put('/post/' + payload.id + '.json' + '?auth=' + state.user.idToken, payload.formData)
        .then(data => {
          commit('setError', '')
          commit('updatePostInPosts', payload)
        })
        .catch(err => {
          commit('setError', 'Cannot update post. Please try again later')
        })
    )
  },
  deletePost ({ commit, state }, id) {
    return (
      this.$axios.$delete('/post/' + id + '.json' + '?auth=' + state.user.idToken)
        .then(data => {
          commit('setError', '')
          commit('deletePostInPosts', id)
        })
        .catch(err => {
          commit('setError', 'Error deleting the post. Try again later')
        })
    )
  },
  register ({ commit, dispatch }, formData) {
    return (
      this.$axios.$post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' + process.env.fbAPIKey, {
        email: formData.email, 
        password: formData.password, 
        returnSecureToken: true
      })
        .then( data => {
          // Write localStorage
          localStorage.setItem('token', data.idToken)
          localStorage.setItem('user', formData.email)
          const now = new Date()
          const expirationDate = new Date(now.getTime() + data.expiresIn * 1000)
          localStorage.setItem('expiresOn', expirationDate)
          // Write cookies
          // const expirationDate = new Date(now.getTime() + data.expiresIn * 1000)
          // const now = new Date()
          this.$cookies.set('token', data.idToken, {
            path: '/',
            expires: expirationDate
          })
          this.$cookies.set('user', formData.email, {
            path: '/',
            expires: expirationDate
          })
          // Write user record to firebase database
          const userData = formData
          delete userData['password']
          this.$axios.$post('/users.json' + '?auth=' + data.idToken, userData)
            .then(data => {
            })
            .catch(err => console.log(err))
          const user = {
            firstName: formData.firstName,
            surName: formData.surName,
            email: formData.email,
            idToken: data.idToken
          }
          commit('setError', '') 
          commit('login', user)
          dispatch('setAutologout', data.expiresIn * 1000)
        })
        .catch(err => {
          commit('setError', 'Cannot login the user, try again later')
        })
    )
  },
  login ({ commit, dispatch }, formData) {
    return (
      this.$axios.$post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' + process.env.fbAPIKey, {
        email: formData.email, 
        password: formData.password, 
        returnSecureToken: true
      })
        .then( data => {
          // Set local storage
          localStorage.setItem('token', data.idToken)
          localStorage.setItem('user', formData.email)
          const now = new Date()
          const expirationDate = new Date(now.getTime() + data.expiresIn * 1000)
          localStorage.setItem('expiresOn', expirationDate)
          commit('setError', '')
          // Set cookies
          // const expirationDate = new Date(now.getTime() + data.expiresIn * 1000)
          // const now = new Date()
          const testExpiration = new Date(now.getTime() + data.expiresIn * 1000)
          this.$cookies.set('token', data.idToken, {
            path: '/',
            expires: testExpiration
          })
          this.$cookies.set('user', formData.email, {
            path: '/',
            expires: testExpiration
          })
          // commit('setError', '')
          // Read user data on firebase
          const wrkIdToken = data.idToken
          const wrkExpiresIn = data.expiresIn
          let user = {}
          this.$axios.$get('/users.json?orderBy="email"&equalTo="' + formData.email + '"')
            .then(data => {
              const id = Object.keys(data)
              user = data[id]
              user.id = id[0]
              user.idToken = wrkIdToken
              commit('login', user)
              commit('setError', '')
              dispatch('setAutologout', wrkExpiresIn * 1000)
            })
            .catch(err => console.log(err))
        })
        .catch(err => {
          commit('setError', 'Invalid email or password')
        })
    )
  },
  updateUser ({ commit }, form) {
    let user = {...form}
    delete user['id']
    delete user['idToken']
    return (
      this.$axios.$put('/users/' + form.id + '.json' + '?auth=' + form.idToken, user)
        .then(data => {
          commit('setError', '')
          commit('updateUser', form)
        })
        .catch(err => {
          commit('setError', 'Could not update the user. Please try again later')
        })
    )
  },
  logout ({ commit }) {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('expiresOn')
    // Remove cookies
    // this.$cookies.removeAll() //works only on root-path '/'
    this.$cookies.remove('token', {path: '/'})
    this.$cookies.remove('user', {path: '/'})
    commit('logout')
    this.$router.push('/')
  },
  setAutologout ({ dispatch }, duration) {
    setTimeout(()=>{
      dispatch('logout')
      alert("Your session has expired! Login again")
    }, duration)
  },
  tryAutoLogin ({ commit, dispatch }) {
    // If no token abort
    if (!localStorage.token) {
      return
    }
    // If token expired abort
    const now = new Date()
    if (now > localStorage.expiresOn) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      localStorage.removeItem('expiresOn') 
      return
    }
    // Read user data from firebase
    let user = {}
    this.$axios.$get('/users.json?orderBy="email"&equalTo="' + localStorage.user + '"')
      .then(data => {
        const id = Object.keys(data)
        user = data[id]
        user.id = id[0]
        user.idToken = localStorage.token
        commit('loadUser', user)
        commit('setError', '')
        // Setting time for autologout
        const endDate = new Date(localStorage.expiresOn)
        const expiresIn = (endDate.getTime() - now.getTime())
        dispatch('setAutologout', expiresIn)    
      })
      .catch(err => {
        commit('setError', 'Could not Autologin. Refresh the page or Login again')
        console.log(err)
      })
  },
  isLoading ({ commit }, status) {
    commit('isLoading', status)
  },
  setSearchString ({ commit }, searchValue) {
    commit('setSearchString', searchValue)
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
  },
  isLoggedIn (state) {
    if (state.user.idToken) {
      return true
    } else {
      return false
    }
  },
  error (state) {
    return state.error
  },
  isLoading (state) {
    return state.isLoading
  },
  searchString (state) {
    return state.searchString
  }

}

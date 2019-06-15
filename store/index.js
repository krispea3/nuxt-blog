export const state = () => ({
  posts: [],
  user: {},
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
  },
  loadUser (state, user) {
    state.user = user
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
          commit('addPostToPosts', {formData: formData, id: data.name})
        })
        .catch(err => {
          return console.log(err)
        })
    )
  },
  updatePost ({ commit, state }, payload) {
    return (
      this.$axios.$put('/post/' + payload.id + '.json' + '?auth=' + state.user.idToken, payload.formData)
        .then(data => {
          commit('updatePostInPosts', payload)
        })
        .catch(err => {
          return console.log(err)
        })
    )
  },
  deletePost ({ commit, state }, id) {
    return (
      this.$axios.$delete('/post/' + id + '.json' + '?auth=' + state.user.idToken)
        .then(data => {
          commit('deletePostInPosts', id)
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
          // Write localStorage
          localStorage.setItem('token', data.idToken)
          localStorage.setItem('user', formData.email)
          const now = new Date()
          const expirationDate = new Date(now.getTime() + data.expiresIn * 1000)
          localStorage.setItem('expiresOn', expirationDate)
          // Write user record to firebase database
          const userData = formData
          delete userData['password']
          this.$axios.$post('/users.json' + '?auth=' + data.idToken, userData)
            .then(data => {
              console.log(data)
            })
            .catch(err => console.log(err))
          const user = {
            firstName: formData.firstName,
            surName: formData.surName,
            email: formData.email,
            idToken: data.idToken
          }  
          commit('login', user)
          dispatch('setAutologout', data.expiresIn * 1000)
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
          // Set local storage
          localStorage.setItem('token', data.idToken)
          localStorage.setItem('user', formData.email)
          const now = new Date()
          const expirationDate = new Date(now.getTime() + data.expiresIn * 1000)
          localStorage.setItem('expiresOn', expirationDate)

          // Read user data on firebase
              // Not working, returns 400 error. Bad request. Need help
              // this.$axios.$get('/users.json?orderBy"email"&equalTo=formData.email')
          const wrkIdToken = data.idToken
          const wrkExpiresIn = data.expiresIn
          let user = {}
          this.$axios.$get('/users.json')
            .then(data => {
              for (let key in data) {
                if (data[key].email === formData.email) {
                  user = data[key]
                  user.idToken = wrkIdToken
                  user.id = key
                  break  
                }
              }
              commit('login', user)
              dispatch('setAutologout', wrkExpiresIn * 1000)
            })
            .catch(err => console.log(err))
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
    this.$axios.$get('/users.json')
      .then(data => {
        for (let key in data) {
          if (data[key].email === localStorage.user) {
            user = data[key]
            user.id = key
            break  
          }
        }
        user.idToken = localStorage.token
        commit('loadUser', user)
        // Setting time for autologout
        const endDate = new Date(localStorage.expiresOn)
        const expiresIn = (endDate.getTime() - now.getTime())
        dispatch('setAutologout', expiresIn)    
      })
      .catch(err => console.log(err))
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

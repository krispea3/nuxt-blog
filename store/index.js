export const state = () => ({
  posts: []
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
  }

}

export const getters = {
  posts (state) {
    return state.posts
  },
  post (state) {
    return state.post
  }
}

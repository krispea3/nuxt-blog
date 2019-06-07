import axios from 'axios'
// import router from '~router'

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
    const index = state.posts.findIndex(i => i.id == payload.id)
    state.posts[index] = {...payload.formData, id: payload.id}
  },
  deletePostInPosts (state, id) {
    const index = state.posts.findIndex(i => i.id == id)
    state.posts.splice(index, 1)
  },

}

export const actions = {
  nuxtServerInit (vuexContext, context) {
    return (
      axios.get('https://nuxt-blog-9be94.firebaseio.com/post.json')
        .then(res => {
          const posts = []
          for (const key in res.data) {
            posts.push({...res.data[key], id: key})
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
      axios.post('https://nuxt-blog-9be94.firebaseio.com/post.json', formData)
        .then(res => {
          context.commit('addPostToPosts', {formData: formData, id: res.data.name})
        })
        .catch(err => {
          console.log(err)
        })
    )
  },
  updatePost (context, payload) {
    return (
      axios.put('https://nuxt-blog-9be94.firebaseio.com/post/' + payload.id + '.json', payload.formData)
        .then(res => {
          context.commit('updatePostInPosts', payload)
        })
        .catch(err => {
          console.log(err)
        })
    )
  },
  deletePost (context, id) {
    return (
      axios.delete('https://nuxt-blog-9be94.firebaseio.com/post/' + id + '.json')
        .then(res => {
          context.commit('deletePostInPosts', id)
        })
        .catch(err => {
          console.log(err)
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

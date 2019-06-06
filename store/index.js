import axios from 'axios'

export const state = () => ({
  posts: []
})

export const mutations = {
  loadPosts (state, posts) {
    state.posts = posts
  }
}

export const actions = {
  nuxtServerInit (vuexContext, context) {
    return (
      axios.get('https://nuxt-blog-9be94.firebaseio.com/post.json')
        .then(res => {
          const posts = []
          for (const key in res.data) {
            let post = res.data[key]
            post.id = key
            posts.push(post)
          }
          vuexContext.commit('loadPosts', posts)
        })
        .catch(err => {
          context.error(err)
        })
    )
    // if (req.session.user) {
    //   commit('user', req.session.user)
    // }
  },
  saveForm (context, formData) {
    axios.post('https://nuxt-blog-9be94.firebaseio.com/post.json', formData)
      .then(res => {
        console.log(res)
        // context.commit('reloadBlogData', formData.id)
      })
      .catch(err => {
        console.log(err)
      })
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

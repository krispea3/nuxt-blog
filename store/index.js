import axios from 'axios'

export const state = () => ({
  posts: [
    // { id: 1, 
    //   title: 'Latest JS frameworks',
    //   content: 'Some text to the first post',
    //   imgUrl: 'https://qph.fs.quoracdn.net/main-qimg-bfa9bbf14a4f404c4d6f5c26c4fe4a99-c',
    //   imgAlt: 'frameworks'
    // },
    // { id: 2, 
    //   title: 'TensorFlow explained',
    //   content: 'Some post text for TensorFlow',
    //   imgUrl: 'https://thumbs.dreamstime.com/x/abstract-high-tech-background-vector-19785678.jpg',
    //   imgAlt: 'ai'
    // },
  ],
  post: {}
})

export const mutations = {
  loadPosts (state, posts) {
    state.posts = posts
  },
  setPost (state, post) {
    state.post = post
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
  setPost ({ commit, state }, postId) {
    const foundIndex = state.posts.findIndex(post => post.id == postId);
    const post = state.posts[foundIndex]
    commit('setPost', post)
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

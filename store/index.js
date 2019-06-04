export const state = () => ({
  posts: [
    { id: 1, 
      title: 'New Acer Laptop',
      text: 'Some post text about Acer Laptop',
      imgUrl: '~/static/laptop1.jpg',
      imgAlt: 'laptop'
    },
    { id: 2, 
      title: 'TensorFlow explained',
      text: 'Some post text for TensorFlow',
      imgUrl: '~/static/ai1.jpg',
      imgAlt: 'ai'
    },
  ],
  post: {}
})

export const mutations = {
  setPost (state, post) {
    state.post = post
  }
}

export const actions = {
  setPost ({ commit, state }, postId) {
    const foundIndex = state.posts.findIndex(post => post.id == postId);
    const post = state.posts[foundIndex]
    commit('setPost', post)
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

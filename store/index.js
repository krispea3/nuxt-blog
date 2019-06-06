export const state = () => ({
  posts: [
    { id: 1, 
      title: 'Latest JS frameworks',
      content: 'Some text to the first post',
      imgUrl: 'https://qph.fs.quoracdn.net/main-qimg-bfa9bbf14a4f404c4d6f5c26c4fe4a99-c',
      imgAlt: 'frameworks'
    },
    { id: 2, 
      title: 'TensorFlow explained',
      content: 'Some post text for TensorFlow',
      imgUrl: 'https://thumbs.dreamstime.com/x/abstract-high-tech-background-vector-19785678.jpg',
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

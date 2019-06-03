export const state = () => ({
  posts: [
    { id: 1, 
      title: 'test post1',
      text$: 'Some post text'
    },
    { id: 2, 
      title: 'test post2',
      text$: 'Some post text for id 2'
    },
  ]
})

export const mutations = {

}

export const ations = {

}

export const getters = {
  posts (state) {
    return state.posts
  }
}

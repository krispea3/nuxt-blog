<template>
  <PostDetail :post="loadedPost" />
</template>

<script>
import PostDetail from '~/components/posts/PostDetail'
import axios from 'axios'

export default {
  // created () {
  //   this.$store.dispatch('setPost', this.$route.params.id)
  // },
  asyncData (context) {
    return (
      axios.get('https://nuxt-blog-9be94.firebaseio.com/post/' + context.params.id + '.json')
        .then(res => {
          return {
            loadedPost: res.data
          }
        })
        .catch(err => {
          return context.error(err)
        })
    )
  },
  components: {
    PostDetail
  },
  // computed: {
  //   post () {
  //     return this.$store.getters.post
  //   }
  // }
}
</script>

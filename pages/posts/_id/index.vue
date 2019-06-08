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
      axios.get(process.env.baseURL + '/post/' + context.params.id + '.json')
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
  // Here we overwrite the head in nuxt.config.js. Only works in route pages
  head: {title: 'Blog Post detail'}
}
</script>

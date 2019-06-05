<template>
  <PostDetail :post="post" />
</template>

<script>
import PostDetail from '~/components/posts/PostDetail'

export default {
  created () {
    this.$store.dispatch('setPost', this.$route.params.id)
  },
  components: {
    PostDetail
  },
  computed: {
    post () {
      return this.$store.getters.post
    }
  }
}
</script>

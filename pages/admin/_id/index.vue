<template>
  <PostForm :post="post" />
</template>

<script>
import PostForm from '~/components/posts/PostForm'

export default {
  created () {
    this.$store.dispatch("setPost", this.$route.params.id)
  },
  components: {
    PostForm
  },
  computed: {
    post () {
      return this.$store.getters.post
    }
  }
}
</script>


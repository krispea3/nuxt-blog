<template>
  <b-row class="text-center" align-h="center">
    <b-col cols="8">
      <Post :post="post"/>
    </b-col>
  </b-row>
</template>

<script>
import Post from '~/components/post'

export default {
  created () {
    this.$store.dispatch('setPost', this.$route.params.id)
  },
  components: {
    Post
  },
  computed: {
    post () {
      return this.$store.getters.post
    }
  }
}
</script>

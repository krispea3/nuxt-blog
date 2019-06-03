<template>
  <b-row class="text-center" align-h="center">
    <b-col cols="8">
      <Post :postId="postId"/>
    </b-col>
  </b-row>
</template>

<script>
import Post from '~/components/post'

export default {
  components: {
    Post
  },
  computed: {
    postId () {
      return this.$route.params.id
    }
  }
}
</script>

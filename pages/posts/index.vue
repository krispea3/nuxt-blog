<template>
  <b-row>
    <b-col>
      <b-card-group deck>
        <Post v-for="post in posts" :key="post.id" :postId="post.id"></Post>
      </b-card-group>
    </b-col>
  </b-row>
</template>

<script>
import Post from "../../components/post"

export default {
  created () {
    this.posts = this.$store.getters.posts
  },
  data () {
    return {
      posts: []
    }
  },
  components: {
    Post
  },
  // computed: {
  //   posts () {
  //     return this.$store.getters.posts
  //   }
  // },
  methods: {
    loadPost () {
      this.$router.push('posts/' + '2')
    }
  }
}
</script>

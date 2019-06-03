<template>
  <b-col>
    <p>List of posts: {{ posts }}</p>
    <b-button variant="primary" @click="loadPost">Post detail</b-button>
  </b-col>
</template>

<script>
export default {
  created () {
    console.log('Created hook')
    console.log(this.$store)
    this.posts = this.$store.getters.posts
  },
  data () {
    return {
      posts: []
    }
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

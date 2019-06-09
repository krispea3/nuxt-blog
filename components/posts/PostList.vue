<template>
  <b-row no-gutters>
    
  </b-row>
</template>

<script>
export default {
  // This vue lifecycle hook executes on the client
  created () {
    this.posts = this.$store.getters.posts
  },
  data () {
    return {
      isLoading: [],
      posts: []
    }
  },
  props: {
    isAdmin: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    postDetail (id) {
      this.isLoading.push(id)
      this.$router.push('posts/' + id)
    },
    postEdit (id) {
      this.isLoading.push(id)
      this.$router.push('admin/' + id)
    }
  }
}
</script>

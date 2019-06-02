<template>
  <b-col>
    <p>List of posts</p>
    <b-button variant="primary" @click="loadPost">Post detail</b-button>
  </b-col>
</template>

<script>
export default {
  methods: {
    loadPost () {
      this.$router.push('posts/' + '2')
    }
  }
}
</script>

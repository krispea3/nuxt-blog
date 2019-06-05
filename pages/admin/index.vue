<template>
  <div>
    <h1>Admin page</h1>
    <hr>
    <b-container>
      <PostList :isAdmin="true" />
    </b-container>
    <b-button @click="addPost" class="mt-3" variant="success">Add post</b-button>
  </div>
</template>

<script>
import PostList from '~/components/posts/PostList'
export default {
  data () {
    return {
      isAdmin: true
    }
  },
  components: {
    PostList
  },
  methods: {
    addPost () {
      this.$router.push('admin/newPost')
    }
  }
}
</script>

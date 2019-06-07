<template>
  <div>
    <b-row no-gutters>
    <PostList :isAdmin="true" />
    </b-row>
    <b-row no-gutters>
    <b-button @click="addPost" class="mt-3" variant="success">Add post</b-button>
    </b-row>
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

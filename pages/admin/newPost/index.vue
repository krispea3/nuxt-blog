<template>
  <PostForm @onSave="onSave" />
</template>

<script>
import PostForm from '~/components/posts/PostForm'

export default {
  components: {
    PostForm
  },
  methods: {
    onSave (formData) {
      this.$store.dispatch('addPost', formData)
    }
  }
}
</script>

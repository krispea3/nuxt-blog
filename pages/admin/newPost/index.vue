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
      // The addPost action returns the axios promise. So we will enter .then when axios wrote the data to firebase
        .then(() => {
          this.$router.push('/admin')
        })
    }
  }
}
</script>

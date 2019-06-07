<template>
  <PostForm @onSave="onSave" :post="loadedPost" />
</template>

<script>
import PostForm from '~/components/posts/PostForm'
import axios from 'axios'

export default {
  asyncData (context) {
    return (
      axios.get('https://nuxt-blog-9be94.firebaseio.com/post/' + context.params.id + '.json')
        .then(res => {
          return {
            loadedPost: res.data
          }
        })
        .catch(err => context.error(err))
    )
  },
  components: {
    PostForm
  },
  methods: {
    onSave (formData) {
      this.$store.dispatch('updatePost', {formData: formData, id: this.$route.params.id})
    }
  }
}
</script>


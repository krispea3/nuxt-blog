<template>
  <b-row no-gutters>
    <b-card v-for="post in posts" 
            :key="post.id"
            :title="post.title"
            :sub-title="post.description"
            class="mb-2 mr-2">

      <b-button v-if="!isAdmin"
        @click="postDetail(post.id)" 
        variant="primary"
        size="sm">
          View
      </b-button>

      <b-button v-if="isAdmin"
        @click="postEdit(post.id)" 
        variant="success"
        size="sm">
          Edit
      </b-button>

      <div slot="footer">
        <small class="text-muted">Last updated on {{ post.updated }} by {{ post.author }}</small>
      </div>
    </b-card>
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
      this.isLoading = true
      this.$router.push('posts/' + id)
    },
    postEdit (id) {
      this.isLoading = true
      this.$router.push('admin/' + id)
    }
  }
}
</script>

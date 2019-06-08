<template>
  <b-row no-gutters>
    <b-card v-for="(post, index) in posts" 
            :key="post.id"
            :title="post.title"
            :sub-title="post.description"
            class="mb-2 mr-2">

      <b-button v-if="!isAdmin"
        @click="postDetail(post.id, index)" 
        variant="primary"
        size="sm">
          View
        <b-spinner v-if="isLoading.includes(post.id)" small></b-spinner>
      </b-button>

      <b-button v-if="isAdmin"
        @click="postEdit(post.id, index)" 
        variant="success"
        size="sm">
          Edit
        <b-spinner v-if="isLoading.includes(post.id)" small></b-spinner>
      </b-button>

      <div slot="footer">
        <small class="text-muted">Last updated on {{ post.updated | date }} by {{ post.author }}</small>
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

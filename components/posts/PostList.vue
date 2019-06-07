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
  // This is a nuxt lifecycle hook. It will execute on the server and serve the page only once the data is fetched
  // It only executes on the server the first time it's called. If we navigate away from the page then back, it will
  // execute on the client.
  // !!! this.whatever is not available in asyncData. We can use the context instead !!!!
  // !!! for example we can access the store with context.store or the route with context.route !!!
  // asyncData shouldn't be used with the normal data method
  // asyncData (context) {
  //   console.log(context)
  //   return {}
  // },
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
      this.$router.push('posts/' + id)
    },
    postEdit (id) {
      this.$router.push('admin/' + id)
    }
  }
}
</script>

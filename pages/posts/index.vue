<template>
  <b-row>
    <b-col>
      <b-card-group deck>
        <b-card v-for="post in posts" :key="post.id"
            :title="post.title">
          <b-button 
            @click="postDetail(post.id)" 
            variant="primary"
            size="sm">
              Details
          </b-button>
          <div slot="footer"><small class="text-muted">Last updated 3 mins ago</small></div>
        </b-card>
      </b-card-group>
    </b-col>
  </b-row>
</template>

<script>
export default {
  created () {
    this.posts = this.$store.getters.posts
  },
  data () {
    return {
      posts: []
    }
  },
  methods: {
    postDetail (id) {
      this.$router.push('posts/' + id)
    }
  }
}
</script>

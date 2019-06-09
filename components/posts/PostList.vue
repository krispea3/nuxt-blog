<template>
  <b-row no-gutters>
    <b-card-group deck>
    <div  v-for="post in posts" :key="post.id">
      <b-col>
      <PostDetail
        :isPreview="true" 
        :isAdmin="isAdmin" 
        :post="post">
      </PostDetail>
      </b-col>
    </div>
    </b-card-group>
  </b-row>
</template>

<script>
import PostDetail from './PostDetail'

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
  components: {
    PostDetail
  },
  props: {
    isAdmin: {
      type: Boolean,
      required: true
    }
  }
}
</script>

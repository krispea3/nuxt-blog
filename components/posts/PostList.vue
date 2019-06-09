<template>
  <div>
    <div v-if="displayType != 'list'">
      <b-row no-gutters align-h="center">
        <b-card-group deck>
        <div  v-for="post in posts" :key="post.id">
          <PostDetail
            :isPreview="true" 
            :isAdmin="isAdmin" 
            :post="post">
          </PostDetail>
        </div>
        </b-card-group>
      </b-row>
    </div>

    <div v-else>
        <div  v-for="post in posts" :key="post.id">
          <b-row no-gutters align-h="center">
            <b-col cols="10">
            <PostDetail
              :isPreview="true" 
              :isAdmin="isAdmin" 
              :post="post">
            </PostDetail>
            </b-col>
          </b-row>
        </div>
    </div>
  </div>
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
    },
    displayType: {
      type: String,
      required: false
    }
  }
}
</script>

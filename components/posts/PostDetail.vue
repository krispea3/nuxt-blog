<template>
  <b-row class="text-center" align-h="center">
    <b-col cols="8">
      <b-card :title="post.title"
          :img-src="post.imgUrl" 
          :img-alt="post.imgAlt" 
          img-top>
        <b-card-text>
          <p>Post ID = {{ post.id }}</p>
          <p>{{ post.content }}</p>
        </b-card-text>
        <b-button @click="goBack" variant="primary">Return</b-button>
        <div slot="footer"><small class="text-muted">Last updated 3 mins ago</small></div>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
export default {
  props: {
    post: Array
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>

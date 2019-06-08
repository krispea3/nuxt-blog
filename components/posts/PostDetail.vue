<template>
  <b-row class="text-center" align-h="center">
    <b-col cols="8">
      <b-card 
          :title="post.title"
          :sub-title="post.description"
          :img-src="post.imgUrl" 
          :img-alt="post.imgAlt"
          img-height="350px"
          img-width=300px
          img-top>
        <b-card-text>
          <p>Post ID = {{ this.$route.params.id }}</p>
          <p>{{ post.content }}</p>
        </b-card-text>
        <b-button @click="goBack" variant="primary">Return</b-button>
        <div slot="footer">
          <small class="text-muted">Last updated on {{ post.updated | date }} by {{ post.author }}</small>
        </div>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
export default {
  props: {
    post: Object
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>

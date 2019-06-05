<template>
  <b-row class="text-center" align-h="center">
    <b-col cols="8">
      <b-card :title="post.title"
          img-src="~/assets/images/ai1.jpg" 
          :img-alt="post.imgAlt" 
          img-top>
        <b-card-text>
          Post ID = {{ post.id }}
          This is a wider card with supporting text below as a natural lead-in to additional content.
          This content is a little bit longer.
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

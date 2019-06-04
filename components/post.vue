<template>
  <b-card :title="post.title"
          img-src="../assets/images/ai1.jpg" 
          :img-alt="post.imgAlt" 
          img-top>
    <b-card-text>
      Post ID = {{ post.id }}
      This is a wider card with supporting text below as a natural lead-in to additional content.
      This content is a little bit longer.
    </b-card-text>
    <b-button @click="$router.push('/posts')" variant="primary">Return</b-button>
    <div slot="footer"><small class="text-muted">Last updated 3 mins ago</small></div>
  </b-card>
</template>

<script>
export default {
  props: ['post'],
  methods: {
    getImgUrl () {
      console.log(this.post.imgUrl)
      return this.post.imgUrl
    }
  }
}
</script>

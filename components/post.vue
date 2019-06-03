<template>
  <b-card title="New Acer laptop"
                img-src="../static/laptop1_half.jpg" 
                img-alt="laptop" 
                img-top>
    <b-card-text>
      Post ID = {{ postId }}
      This is a wider card with supporting text below as a natural lead-in to additional content.
      This content is a little bit longer.
    </b-card-text>
    <div slot="footer"><small class="text-muted">Last updated 3 mins ago</small></div>
  </b-card>
</template>

<script>
export default {
  props: ['postId']
}
</script>

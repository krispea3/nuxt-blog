<template>
  <b-row class="text-center" align-h="center">
    <b-col cols="8">
      <b-card title="Card title" sub-title="Card subtitle">
        <b-card-text>
          Post-id: {{ postId }}
          Some quick example text to build on the <em>card title</em> and make up the bulk of the card's
          content.
        </b-card-text>

        <b-card-text>A second paragraph of text in the card.</b-card-text>

        <a href="#" class="card-link">Card link</a>
        <b-link to="/posts" class="card-link">Close</b-link>
      </b-card>
      </b-col>
  </b-row>
</template>

<script>
export default {
  computed: {
    postId () {
      return this.$route.params.id
    }
  }
}
</script>

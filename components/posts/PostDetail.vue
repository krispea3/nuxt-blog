<template>
      <b-card no-body>

        <b-card-img v-if="!isPreview"
          :src="post.imgUrl" 
          :alt="post.imgAlt"
          height="350px"
          width=300px>
        </b-card-img>

        <b-card-title
          :title="post.title">
        </b-card-title>

        <b-card-sub-title
          :sub-title="post.description">
        </b-card-sub-title>

        <b-card-text v-if="!isPreview">
          <p>Post ID = {{ this.$route.params.id }}</p>
          <p>{{ post.content }}</p>
        </b-card-text>

        <b-button 
          @click="goBack" 
          variant="primary">
            Return
        </b-button>

        <b-button v-if="!isAdmin"
          @click="postDetail(post.id, index)" 
          variant="primary"
          size="sm">
            View
          <b-spinner v-if="isLoading.includes(post.id)" small></b-spinner>
        </b-button>

        <b-button v-if="isAdmin"
          @click="postEdit(post.id, index)" 
          variant="success"
          size="sm">
            Edit
          <b-spinner v-if="isLoading.includes(post.id)" small></b-spinner>
        </b-button>

        
        <div slot="footer">
          <small class="text-muted">Last updated on {{ post.updated | date }} by {{ post.author }}</small>
        </div>
      </b-card>
</template>

<script>
export default {
  props: {
    post: Object,
    isAdmin: {
      type: Boolean,
      required: true
    },
    isPreview: {
      type: Boolean,
      required: false
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>

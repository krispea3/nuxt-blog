<template>
  <b-container>
      <b-card-group>
        <PostList :isAdmin="false"/>
      </b-card-group>
  </b-container>
</template>

<script>
import PostList from '~/components/posts/PostList'

export default {
  components: {
    PostList
  }
}
</script>

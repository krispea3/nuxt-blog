<template>
  <b-container>
      <b-card-group>
        <PostList :isAdmin="false"/>
      </b-card-group>
  </b-container>
</template>

<script>
// no need import anymore as it is defined in plugins
// import PostList from '~/components/posts/PostList'

export default {
  // No need to declare the component as it is defined in plugins
  // components: {
  //   PostList
  // }
}
</script>

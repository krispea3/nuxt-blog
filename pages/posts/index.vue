<template>
    <PostList :isAdmin="false" :isPreview="true" displayType="list"/>
</template>

<script>
// no need import anymore as it is defined in plugins
// import PostList from '~/components/posts/PostList'

export default {
  // Adding the middleware. Takes a string with the file-name without extension and without path
  middleware: 'log',

  // No need to declare the component as it is defined in plugins
  // components: {
  //   PostList
  // }
}
</script>

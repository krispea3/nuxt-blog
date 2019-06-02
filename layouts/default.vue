<template>
  <b-container>
    <Header />
    <nuxt />
  </b-container>
</template>

<script>
import Header from '../components/Header'
export default {
  components: {
    Header
  }
}
</script>

<style>
/* Here we apply the google font Open Sans. The embedding of it is in nuxt.config.js under the head property */
html {
  font-family: 'Open Sans', sans-serif 
}
body {
  margin: 0;
}
</style>

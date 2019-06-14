<template>
  <b-container>
    <Header />
    <nuxt />
  </b-container>
</template>

<script>
import Header from '~/components/header/Header'
export default {
  mounted () {
    this.$store.dispatch('tryAutoLogin')
  },
  components: {
    Header
  }
}
</script>

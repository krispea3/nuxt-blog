<template>
  <b-navbar toggleable="lg" type="dark" variant="dark" class="mt-3 mb-3">
    <b-navbar-brand to="/">Nuxt-Blog</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item to="/posts">Posts</b-nav-item>
        <b-nav-item to="/about">About</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown v-if="user.email"
          id="my-nav-dropdown"
          :text="'Welcome ' + user.firstName"
          toggle-class="nav-link-custom"
          right
        >
          <b-dropdown-item @click="logout">Logout</b-dropdown-item>
          <!-- <b-dropdown-divider></b-dropdown-divider> -->
      </b-nav-item-dropdown>

        <b-nav-item v-if="user.email" to="/admin">Admin</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  computed: {
    user () {
      return this.$store.getters.user
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('logout')
    }
  }
}
</script>

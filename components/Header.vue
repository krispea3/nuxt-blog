<template>
  <b-navbar toggleable="lg" type="dark" variant="info" class="mt-3 mb-3">
    <b-navbar-brand to="/">Nuxt-Blog</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item to="/posts">Posts</b-nav-item>
        <b-nav-item to="/about">About</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item to="/admin">Admin</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

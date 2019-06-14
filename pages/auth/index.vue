<template>
  <!-- <div> -->
    <b-form>
      <b-form-group
        id="input-group-1"
        label="Email address:"
        label-for="input-1"
        description="We'll never share your email with anyone else.">
        <b-form-input
          id="input-1"
          v-model="form.email"
          type="email"
          required
          placeholder="Enter email">
        </b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-2"
        label="Password:"
        label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.password"
          type="password"
          required
          placeholder="Enter password">
        </b-form-input>
      </b-form-group>
        <b-button v-if="isLogin" @click="login" variant="success">Login</b-button>
        <b-button v-else @click="register" variant="success">Register</b-button>
    </b-form>
  <!-- </div> -->
</template>

<script>
export default {
  created () {
    if (this.$route.query.isLogin === 'true') {
      this.isLogin = true
    } else {
      this.isLogin = false
    }
  },
  data () {
    return {
      form: {
        email: '',
        password: ''
      },
      isLogin: false
    }
  },
  methods: {
    login () {
      this.$store.dispatch('login', this.form)
        .then( () => {
          this.$router.go(-1)
        })
    },
    register () {
      this.$store.dispatch('register', this.form)
        .then( () => {
          this.$router.go(-1)
        })
    },
  }
}
</script>

<template>
    <b-form>
      <b-form-group v-if="!isLogin"
        id="input-group-1"
        label="Firstname:"
        label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="form.firstName"
          type="text"
          required
          placeholder="Enter firstname">
        </b-form-input>
      </b-form-group>

      <b-form-group v-if="!isLogin"
        id="input-group-2"
        label="Surname:"
        label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.surName"
          type="text"
          required
          placeholder="Enter surname">
        </b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-3"
        label="Email address:"
        label-for="input-3"
        description="We'll never share your email with anyone else.">
        <b-form-input
          id="input-3"
          v-model="form.email"
          type="email"
          required
          placeholder="Enter email">
        </b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-4"
        label="Password:"
        label-for="input-4">
        <b-form-input
          id="input-4"
          v-model="form.password"
          type="password"
          required
          placeholder="Enter password">
        </b-form-input>
      </b-form-group>

      <b-alert v-if="error" variant="danger" show>{{ error }}</b-alert>

      <b-button v-if="isLogin" @click="login" variant="success">Login</b-button>
      <b-button v-else @click="register" variant="success">Register</b-button>
    </b-form>
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
        firstName: '',
        surName: '',
        email: '',
        password: ''
      },
      isLogin: false
    }
  },
  computed: {
    error () {
      return this.$store.getters.userError
    }
  },
  methods: {
    login () {
      this.$store.dispatch('login', this.form)
        .then( () => {
          if (!this.$store.getters.userError) {
            this.$router.go(-1)
          }
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

<template>
    <b-form>
      <b-form-group
        id="input-group-1"
        label="Firstname:"
        label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="form.firstName"
          type="text"
          required
          autofocus
          placeholder="Enter firstname">
        </b-form-input>
      </b-form-group>

      <b-form-group
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
        <b-form-input :class="{invalid: $v.form.email.$error}"
          id="input-3"
          v-model="form.email"
          type="email"
          required
          placeholder="Enter email"
          @blur="$v.form.email.$touch()">
        </b-form-input>
        <div v-if="$v.form.email.$dirty">
          <span class="error" v-if="!$v.form.email.email">Invalid email</span>
          <span class="error" v-if="!$v.form.email.required">Email required</span>
        </div>
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

      <b-button 
        @click="register" 
        variant="success">
          Register
        <b-spinner v-if="isLoading" small></b-spinner>
      </b-button>
    </b-form>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'

export default {
  data () {
    return {
      form: {
        firstName: '',
        surName: '',
        email: '',
        password: ''
      },
    }
  },
  validations: {
    form: {
      email: {
        required,
        email
      }
    }
  },
  computed: {
    error () {
      return this.$store.getters.userError
    },
    isLoading () {
      return this.$store.getters.isLoading
    }
  },
  methods: {
    register () {
      this.$store.dispatch('isLoading', true)
      this.$emit('register', this.form)
    }
  }

}
</script>

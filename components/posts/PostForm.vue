<template>
  <div>
    <b-form>
      <b-form-group
        id="input-group-1"
        label="Title"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="formData.title"
          type="text"
          required
          placeholder="Enter title"
        ></b-form-input>
      </b-form-group>
      <p>{{ post }}</p>
      <b-button @click="saveForm" variant="primary">Save</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
    <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ formData }}</pre>
    </b-card>
  </div>
</template>

<script>
import axios from 'axios'

  export default {
    created () {
      if (this.post) {
        this.formData.title = this.post.title
        this.formData.text = this.post.text
        this.formData.imgUrl = this.post.imgUrl
        this.formData.imgAlt = this.post.imgAlt
      }
    },
    data() {
      return {
        formData: {
          title: '',
          text: '',
          imgUrl: '',
          imgAlt: ''
        },
      }
    },
    props: {
      post: Object,
      required: false
    },
    methods: {
      saveForm () {
        axios.post('https://nuxt-blog-9be94.firebaseio.com/post.json', this.formData)
          .then(res => {
            console.log(res)
            this.$router.go(-1)
          })
          .catch(err => {
            console.log(err)
          })
      },
      // onSubmit(evt) {
      //   evt.preventDefault()
        // alert(JSON.stringify(this.form))
      // },
      onReset(evt) {
        evt.preventDefault()
        // Reset our form values
        this.formData.text = ''
        this.formData.content = ''
        this.formData.imgUrl = ''
        this.formData.imgAlt = ''
        // Trick to reset/clear native browser form validation state
        // this.show = false
        // this.$nextTick(() => {
        //   this.show = true
        // })
      }
    }
  }
</script>

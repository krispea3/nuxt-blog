<template>
  <div>
    <b-form>
      <!-- Title -->
      <b-form-group
        id="input-group-1"
        label="Title"
        label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="formData.title"
          type="text"
          required
          placeholder="Enter title">
        </b-form-input>
      </b-form-group>
      <!-- Description -->
      <b-form-group
        id="input-group-1"
        label="Description"
        label-for="input-1">
        <b-form-textarea
          id="input-1"
          v-model="formData.description"
          type="text"
          required
          placeholder="Enter description">
        </b-form-textarea>
      </b-form-group>
      <!-- Content -->
      <b-form-group
        id="input-group-1"
        label="Content"
        label-for="input-1">
        <b-form-textarea
          id="input-1"
          v-model="formData.content"
          rows="5"
          required
          placeholder="Enter content">
        </b-form-textarea>
      </b-form-group>
      <!-- Image URL -->
      <b-form-group
        id="input-group-1"
        label="Image URL"
        label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="formData.imgUrl"
          type="text"
          required
          placeholder="Enter image URL">
        </b-form-input>
      </b-form-group>
      <!-- Image Alt -->
      <b-form-group
        id="input-group-1"
        label="Image alt-tag"
        label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="formData.imgAlt"
          type="text"
          required
          placeholder="Enter image alt-tag">
        </b-form-input>
      </b-form-group>

      <p>{{ post }}</p>
      <p>{{ formData }}</p>
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
        this.formData.description = this.post.description
        this.formData.content = this.post.content
        this.formData.imgUrl = this.post.imgUrl
        this.formData.imgAlt = this.post.imgAlt
        this.formData.author = this.post.author
        this.formData.created = this.post.created
        this.formData.updated = this.post.updated
      }
    },
    data() {
      return {
        formData: {
          title: '',
          description: '',
          content: '',
          imgUrl: '',
          imgAlt: '',
          author: '',
          created: null,
          updated: null
        },
      }
    },
    props: {
      post: Object,
      required: false
    },
    methods: {
      saveForm () {
        this.formData.updated = new Date()
        this.formData.author = 'Christian'

        if (!this.post) {
          this.formData.created = new Date()
          this.$store.dispatch('addPost', this.formData)
        } else {
          this.$store.dispatch('updatePost', {formData: this.formData, id: this.$route.params.id})
        }

        this.$router.go(-1)
      },
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
      // onSubmit(evt) {
      //   evt.preventDefault()
        // alert(JSON.stringify(this.form))
      // },
  }
</script>

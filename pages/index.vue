<template>
  <div>
    <b-row align-h="center">
      <b-col>
        <b-jumbotron 
            header="Get the latest Tech-News!" 
            lead="All about programming, frameworks and lot more" 
            align="center"
            class="bg-image">
          <p>To get all the articles, register now! Or login if you are already a member</p>
          <b-button variant="success" href="#">Login</b-button>
          <b-button class="ml-3" variant="primary" href="#">Register</b-button>
        </b-jumbotron>
      </b-col>
  </b-row>

  <b-row>
    <b-col>
      <Posts />      
    </b-col>
  </b-row>
  </div>  
</template>

<script>
import Posts from './posts/index'

export default {
  components: {
    Posts
  }
}
</script>

<style scoped>
  .bg-image {
    background-image: url('../static/jumbotron.jpg');
    color: white;
  }
</style>


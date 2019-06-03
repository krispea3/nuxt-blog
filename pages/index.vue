<template>
  <div>
    <b-row align-h="center">
      <b-col cols="10">
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
      <b-card-group deck>
        <b-card title="New Acer laptop"
                img-src="../static/laptop1_half.jpg" 
                img-alt="laptop" 
                img-top>
          <b-card-text>
            This is a wider card with supporting text below as a natural lead-in to additional content.
            This content is a little bit longer.
          </b-card-text>
          <div slot="footer"><small class="text-muted">Last updated 3 mins ago</small></div>
        </b-card>

        <b-card title="TensorFlow explained" img-src="../static/ai1.jpg" img-alt="Image" img-top>
          <b-card-text>
            This card has supporting text below as a natural lead-in to additional content.
          </b-card-text>
          <div slot="footer"><small class="text-muted">Last updated 3 mins ago</small></div>
        </b-card>

      </b-card-group>
      </b-col>
  </b-row>
  </div>  
</template>

<script>
export default {

}
</script>

<style scoped>
  .bg-image {
    background-image: url('../static/jumbotron.jpg');
    color: white;
  }
</style>


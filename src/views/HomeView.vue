<template>
  <div class="display-1 white py-5 text-xs-center">
    <v-img src="https://marketplace.canva.com/MADGxtvdTVw/4/screen/canva-black-blue-and-red-graph-illustration-MADGxtvdTVw.jpg"
      max-height="200px"
      contain
      class="my-5"
    ></v-img>
    Data Driven Delivery <br/> For <br/> {{currentProject}}
  </div>
</template>

<script>
export default {
  name: "HomeView",
  computed:{
    currentProject(){
      return this.$store.state.projectName
    }
  }
};
</script>

<style scoped>


</style>

<template>
  <v-layout>
    <v-card width="100%" class="d-flex">
      <v-img src="./mirumlogo.jpg" aspect-ratio="1" class="grey lighten-2" max-width="150px"></v-img>

      <v-flex align-center d-flex ml-3 xs6>
        <div>
          <h2>Data Driven Delivery</h2>
          <span>view/edit project files for marketing-tag-delivery-uhc</span>
        </div>
      </v-flex>
      <v-flex align-end d-flex red--text mb-3>
        <a>Link for something 1</a>
        <a>Link to do things</a>
      </v-flex>
    </v-card>
  </v-layout>
</template>

<script>
export default {
  mounted() {}
};
</script>

<style scoped>
a{
    color:#d4005f
}
</style>
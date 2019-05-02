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
      <v-flex align-end d-flex red--text mb-3 title>
        <router-link to="/">Home</router-link>
        <router-link to="/edit">Edit Tables</router-link>
        <router-link to="/config">Config</router-link>
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
    text-decoration: none;
    color:#361536;
}
</style>
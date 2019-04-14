<template>
  <v-app id="app">
    <v-container  >
      <Header />
      <router-view />
    </v-container>
  </v-app>
</template>
<script>
import Header from "@/components/header/index.vue"
export default {
  components:{
        Header
      },
  data() {
    return {
      
      urls: [
        "./",
        "/about"
      ]
    };
  },
  methods: {
    
  }
};
</script>
<style>
</style>

<template>
  <v-app id="app">
    <v-container fluid  >
      <Header />
      <v-flex grey pa-3>
      <router-view />
      </v-flex>
    </v-container>
  </v-app>
</template>
<script>
import Header from "@/components/header/Header.vue"
export default {
  components:{
        Header
      },
  data() {
    return {

    };
  },
  methods: {
    
  }
};
</script>
<style>
</style>

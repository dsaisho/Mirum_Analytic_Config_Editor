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
import Header from "@/components/headers/AppHeader.vue"
export default {
  components:{
        Header
      },
  data() {
    return {

    };
  },
  methods: {
    
  },
  created(){
    this.$store.dispatch("RETRIEVE_LINKED_DATASETS")
  }
};
</script>
<style>
</style>

<template>
<v-app id="app" >
  <v-container >
    <v-layout row wrap justify-space-around>
      <v-flex xs4 class="p-2">


          <router-link class="mr-2" v-for="(value,key) in items" :key="key" :to=urls[key] >
             <v-icon>{{icons[key]}}</v-icon>
          </router-link>

      </v-flex>

      <v-flex xs4 >
        <v-select class="ma-0 pa-0 vselect" v-on:change="onSelected" :items="items" label="Select Page"></v-select>
      </v-flex>
      <v-flex xs12>
        <router-view />
      </v-flex >
    </v-layout>
  </v-container>

</v-app>
</template>
<script>
export default {
  data() {
    return {
      items: ["Home", "About", "Table Search", "Table Details", "Tabulator Demo", "Tabulator Demo Dynamic", "Upload Multiple", "Update Dataset"],
      urls: ["./", "/about", "/table-search","/table-details","/tabulator", "tabulator-dynamic","upload-multiple","update-dataset"],
      icons: ["home", "whatshot", "airplanemode_active", "view_list","build","accessible", "done_all","star"]
    };
  },
  methods: {
    onSelected: function(e) {
      const url = this.urls[this.items.indexOf(e)];
      this.$router.push({ path: url });
    }
  }
};
</script>
<style>
</style>

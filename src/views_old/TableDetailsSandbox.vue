<template>
  <v-container  >
    <v-layout row wrap justify-center pb-2>
      <v-flex xs12 class="text-sm-center headline mb-4">Show details of the table</v-flex>
      <DescTable v-on:descItemClicked="descItemClicked" />
      <DetailsTable :descItemSelected="descItemSelected" />
    </v-layout>
</v-container>
</template>

<script>
// @ is an alias to /src
import DescTable from "@/components/TableDetailsSandbox/DescTable.vue";
import DetailsTable from "@/components/TableDetailsSandbox/DetailsTable.vue";
export default {
  name: "tableSearch",
  components: {
    DescTable,
    DetailsTable
  },
  data() {
    return {
      descItemSelected: ""
    };
  },
  mounted: function() {},
  methods: {
    descItemClicked: function(item) {
      this.descItemSelected = item;
    }
  }
};
</script>

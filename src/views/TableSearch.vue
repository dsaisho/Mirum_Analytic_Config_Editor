<template>

  <v-container  >
    <v-layout row wrap justify-center pb-2>
      <v-flex xs12 class="text-sm-center headline mb-4">Select a table from data.world</v-flex>
      <TableInput v-on:showTableRequested = showTableRequestedHandler> </TableInput>

      <Table ref="foo" :userName="userName" :dataset="dataset" :tableName="tableName"></Table>

    </v-layout>
</v-container>
</template>

<script>
// @ is an alias to /src
import Table from "@/components/tableSearch/Table.vue";
import TableInput from "@/components/tableSearch/TableInputs.vue";

export default {
  name: "tableSearch",
  components: {
    Table,
    TableInput
  },
  data() {
    return {
      userName: "",
      dataset: "",
      tableName: "",
      show: false
    };
  },
  mounted: function() {},
  methods: {
    showTableRequestedHandler: function(dataObj) {
      this.userName = dataObj.userName;
      this.dataset = dataObj.dataset;
      this.tableName = dataObj.tableName;
      this.show = true;
    }
  }
};
</script>

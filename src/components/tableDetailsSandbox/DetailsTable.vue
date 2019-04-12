

<template>
  <div>
<v-flex sm12 lg9>
  <v-flex xs6>
      <v-textarea
        box
        name="input-7-4"
        label="Query for selecting item descriptions"
        :value=query
        v-on:click="renderTable"

      ></v-textarea>
    </v-flex>

    <v-flex v-if="!this.error" >

    <v-data-table  :headers="headers" :items="tableContent" :search="search" :pagination.sync="pagination" class="elevation-1" :rows-per-page-items="rowsPerPage" >
      <template slot="items" slot-scope="props">
        <tr v-on:click="descriptionClicked(props.index)">
        <td class="text-xs-left"  v-for="(value, key) in headers" :key="key"  >{{props.item[value.text] }}</td>
      </tr>
      </template>
    </v-data-table>
    <div class="text-xs-center pt-2">
      <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
    </div>
  </v-flex>
</v-flex>
</div>
</template>

<script>
import { createTableHeaders } from "@/utils/TableFormat.js";
export default {
  components: {},
  props:{
    descItemSelected:''
  },
  watch:{
    descItemSelected: function(){

      this.query = `SELECT
attribute.attribute_id,
attribute.data_enrichment_req
FROM attribute
INNER JOIN event_attribute
INNER JOIN event
WHERE event_attribute.use_case_id = '${this.descItemSelected}'
AND event.use_case_type = 'synch'
ORDER BY event.use_case_id
`
this.renderTable()
    }
  },
  computed: {
    // this is to listen to all prop changes and have only one call back from using watch
    // returns current prop values

    pages() {
      if (
        this.pagination.rowsPerPage == null ||
        this.pagination.totalItems == null
      )
        return 0;

      return Math.ceil(this.tableContent.length / this.pagination.rowsPerPage);
    }
  },
  data() {
    return {
      rowsPerPage:[5,10,20],
      jsonData: [],
      headers: [],
      items: [],
      search: "",
      pagination: {},
      selected: [],
      tableContent: [],
      requestTableObj: {},
      error: false,
      query:''
    };
  },
  beforeDestroy() {
    this.$store.commit("tableLoadComplete", false);
  },
  created() {
  //  this.renderTable();
  },
  methods: {
    renderTable: function() {
      this.loadComplete = false;
      this.$store
        .dispatch("searchForTable", {
          _userName: "mirumagency",
          _dataset: "united-health-group",
          _query: `query=${this.query}`
        })
        .then(_tableCategories => {
          this.tableContent = _tableCategories;
          this.headers = createTableHeaders(_tableCategories);
          this.$store.commit("tableLoadComplete");
          this.error = false;
        })
        .catch(error => {
          console.log("error", error);
          this.statusMsg = `Error from searchForTable payload ${error.toString()}`;
          this.$store.commit("tableLoadComplete");
          this.error = true;
        });
    },
    descriptionClicked: function(e){
      console.log(e)
    }
  }
};
</script>

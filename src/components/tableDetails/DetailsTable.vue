

<template>
  <div>
<v-flex sm12 lg9>
  <v-flex xs6>

    </v-flex>

    <v-flex v-if="!this.error" >

    <v-data-table  :headers="headers" :items="tableContent" :search="search"  class="elevation-1" :rows-per-page-items="rowsPerPage" >
      <template slot="items" slot-scope="props">
        <tr v-on:click="descriptionClicked(props.index)">
        <td class="text-xs-left"  v-for="(value, key) in headers" :key="key"  >{{props.item[value.text] }}</td>
      </tr>
      </template>
    </v-data-table>

  </v-flex>
</v-flex>
</div>
</template>

<script>
import { createTableHeaders } from "@/utils/TableFormat.js";
export default {
  components: {},
  props:{
    activeItem:''
  },
  watch:{
    activeItem: function(){
      this.updateTable()
    }
  },
  computed: {
    // this is to listen to all prop changes and have only one call back from using watch
    // returns current prop values
    query: function(){
      return `SELECT
attribute.attribute_id,
attribute.data_enrichment_req
FROM attribute
INNER JOIN event_attribute
INNER JOIN event
WHERE event_attribute.use_case_id = '${this.activeItem}'
AND event.use_case_type = 'synch'
ORDER BY event.use_case_id
`
    }

  },
  data() {
    return {
      rowsPerPage:[5,10,20],
      jsonData: [],
      headers: [],
      items: [],
      search: "",
      selected: [],
      tableContent: [],
      requestTableObj: {},
      error: false
    };
  },
  beforeDestroy() {
    this.$store.commit("tableLoadComplete", false);
  },
  created() {

  this.updateTable()
  },
  methods: {
    updateTable: function(){
      this.activeItem ? this.renderTable() : this.tableContent = []
    },
    renderTable: function() {
      console.log('rendering table')
      this.loadComplete = false;
      this.$store
        .dispatch("searchForTable", {
          _userName: "mirumagency",
          _dataset: "marketing-tag-delivery-uhc",
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

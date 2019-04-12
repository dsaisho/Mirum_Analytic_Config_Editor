<template>
<v-flex sm12 lg9 v-if="this.$store.state.tableLoadComplete">
    <div> {{statusMsg}} </div>

    <v-flex v-if="!this.error" >

    <v-data-table  :headers="headers" :items="tableContent" :search="search" :pagination.sync="pagination" class="elevation-1" >
      <template slot="items" slot-scope="props">
        <td class="text-xs-left" v-for="(value, key) in headers" :key="key">{{props.item[value.text] }}</td>
      </template>
    </v-data-table>
    <div class="text-xs-center pt-2">
      <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
    </div>
  </v-flex>
</v-flex>
</template>

<script>
import {createTableHeaders} from "@/utils/TableFormat.js"
export default {
  components: {},
  props: {
    userName: String,
    dataset: String,
    tableName: String
  },
  computed: {
    // this is to listen to all prop changes and have only one call back from using watch
    // returns current prop values
    allProps: function() {
      return `${this.userName} ${this.dataset} ${this.tableName}`;
    },
    pages() {
      if (
        this.pagination.rowsPerPage == null ||
        this.pagination.totalItems == null
      )
        return 0;

      return Math.ceil(this.tableContent.length / this.pagination.rowsPerPage);
    }
  },
  watch: {
    //when something changes in allProps, we a function that does a re render of the table
    allProps: function() {

     this.renderTable();
    }
  },
  data() {
    return {
      statusMsg: "",
      jsonData: [],
      headers: [],
      items: [],
      search: "",
      pagination: {},
      selected: [],
      tableContent: [],
      requestTableObj: {},
      error: false
    };
  },
  beforeDestroy() {
    this.$store.commit("tableLoadComplete", false);
  },
  created() {},
  methods: {
    renderTable: function() {
      this.loadComplete = false;
      this.$store
        .dispatch("searchForTable", {
          _userName: this.$store.state.userName,
          _dataset: this.dataset,
          _query: `query=SELECT * from ${this.tableName}`
        })
        .then((_tableCategories) => {
          this.statusMsg = "";
          this.tableContent = _tableCategories;
          this.headers = createTableHeaders(_tableCategories);
          this.$store.commit("tableLoadComplete");
          this.error = false;
        })
        .catch(error => {
          console.log("error");
          this.statusMsg = `Error from searchForTable payload ${error.toString()}`;
          this.$store.commit("tableLoadComplete");
          this.error = true;
        });

      /*
      dwt(this.userName, this.dataset, this.tableName)
        .then(jsonObj => {
          console.log(jsonObj);
          this.jsonData = jsonObj;
          const categories = Object.keys(jsonObj[0]).map(category => {
            console.log(category);
            return {
              text: category,
              value: category
            };
          });
          console.log(categories);
          this.statusMsg = "";
          this.tableData = jsonObj;
          this.tableContent = jsonObj;
          this.headers = categories;
          this.loadComplete = true;
        })
        .catch(error => {
          this.statusMsg = error.toString();
        });
        */
    }
  }
};
</script>

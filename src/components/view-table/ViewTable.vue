<template>
  <v-flex  >
    <v-flex  >
      <div v-bind:id="this.uid"></div>
    </v-flex>


  </v-flex>
</template>


<script>
import Pappa from "papaparse";
import T from "tabulator-tables";
import axios from "axios";

import {
  GetFile,
  UploadFile,
  GetProjectInfo,
  GetLinkedDatasets
} from "@/utils/api/data-world-api.js";

export default {
  props: {
    fileName: String,
    dataSet: String,
    uid: String
  },
  data() {
    return {
      defaultDeleteText: "click row to delete it",
      deleteItemTitle: "click row to delete it",
      loadedTableData: {},
      tableColumns: {},
      currentLob: "*",
      table: {},
      selectedRow: null
    };
  },
  watch: {
    fileName: function() {
      this.refreshTable();
    }
  },
  mounted() {
    this.refreshTable()
  },
  methods: {
    setupTable() {
      this.table = new T(`#${this.uid}`, {
        height:1000,
        data: this.loadedTableData, //load row data from array
        layout: "fitColumns", //fit columns to width of table
       // responsiveLayout: "hide", //hide columns that dont fit on the table
        tooltips: true, //show tool tips on cells
        addRowPos: "top", //when adding a new row, add it to the top of the table
        history: true, //allow undo and redo actions on the table
        pagination: "local", //paginate the data
        paginationSize: 15, //allow 7 rows per page of data
        //movableColumns: true, //allow column order to be changed
        //resizableRows: true, //allow row order to be changed
        columns: this.tableColumns,
        rowClick: this.rowClicked,
        //autoColumns:true,
        selectable: "1",
        layoutColumnsOnNewData:true,
        dataLoaded:this.dataLoaded
      });
    },
    dataLoaded(){
      //alert("loaded")
      //this.table.redraw()
    },
    getTableData() {
      return GetFile(this.fileName, this.dataSet)
            .then(jsonData => {
              console.log(jsonData)
              this.loadedTableData = jsonData;
              this.tableColumns = this.getTableColumns(jsonData[0])
            });
    },
    getTableColumns(_tableData) {
      return Object.keys(_tableData).map(category => {
        return {
          title: category,
          field: category,
          editor: true,
          formatter: "textarea"
        };
      });
    },
    refreshTable() {
      this.getTableData().then(res => this.setupTable());
    },
    saveTableClicked() {
      this.table.redraw(true);
      UploadFile(
        Pappa.unparse(this.table.getData()),
        this.fileName,
        this.dataSet
      ).then(res => console.log("table uploaded", res));
    },
    onLobSelected(e) {
      e == "*"
        ? this.table.clearFilter()
        : this.table.setFilter("line_of_business", "=", e);
      this.currentLob = e;
    },
    addRowClicked() {
      let blankRowObject2 = {
        line_of_business: this.currentLob,
        adobe_analytics_config_key: this.adobeKey,
        adobe_analytics_config_value: this.adobeValue
      };
      let blankRowObject= {};
      this.tableColumns.map((column,i) => {
        blankRowObject[column.field] = "BLANK_ENTRY"; 
      })

      this.table.addRow(blankRowObject);
    },
    rowClicked(e, row) {      
      this.selectedRow = row;
    },
    deleteRowClicked() {
      this.selectedRow.delete()
    }
  }
};
</script>

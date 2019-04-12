<template>
  <v-layout row wrap justify-space-around>
    <v-flex xs12 ma-4>
      <div v-bind:id="this.uid"></div>
    </v-flex>
    <v-flex xs5 align-content-center>
      <v-btn v-on:click="exportTableDataClicked">log table data</v-btn>
      <v-btn color="red" v-on:click="uploadDataClicked">Upload file</v-btn>
      <v-btn color="green" v-on:click="refreshTable">Refresh Table</v-btn>
    </v-flex>

    <v-flex xs12 align-content-center>
      <p class="text-xs-center title mt-4 text-truncate deep-orange--text">{{this.deleteItemTitle}}</p>
      <v-btn
        v-if="this.deleteItemTitle != this.defaultDeleteText"
        class="d-flex mx-auto"
        color="deep-orange"
        v-on:click="deleteRowClicked"
      >Delete Row</v-btn>
    </v-flex>

    <v-flex xs4 v-if="false">
      <v-select v-on:change="onLobSelected" :items="lobItems" label="Select LOB"></v-select>
    </v-flex>

    <v-flex xs4 v-if="this.currentLob != '*' ">
      <v-text-field v-model="adobeKey" label="Adobe Key"/>
      <v-text-field v-model="adobeValue" label="Adobe Value"/>

      <v-btn class="ma-0 mp-0" color="yellow" v-on:click="addValueClicked">Add Value</v-btn>
    </v-flex>
  </v-layout>
</template>


<script>
import Pappa from "papaparse";
import T from "tabulator-tables";
import axios from "axios";
import UploadTable from "@/utils/api/data-world-table-upload.js";
import GetTable from "@/utils/api/data-world-get-file.js";

import GetProject from "@/utils/api/data-world-get-project.js";

import {
  GetFile,
  UploadFile,
  GetProjectInfo,
  GetLinkedDatasets
} from "@/utils/api/data-world-api.js";

export default {
  props: {
    fileName: String,
    projectName: String,
    uid: String
  },
  data() {
    return {
      defaultDeleteText: "click row to delete it",
      deleteItemTitle: "click row to delete it",
      loadedTableData: {},
      tableColumns: {},
      adobeKey: "",
      adobeValue: "",
      currentLob: "*",
      table: {},
      selectedRow: {},
      lobItems: [
        "*",
        "medicare and retirement (fed)",
        "community and state",
        "medicare and retirement (is)",
        "optum care",
        "employee insurance"
      ]
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
        data: this.loadedTableData, //load row data from array
        layout: "fitColumns", //fit columns to width of table
        responsiveLayout: "hide", //hide columns that dont fit on the table
        tooltips: true, //show tool tips on cells
        addRowPos: "top", //when adding a new row, add it to the top of the table
        history: true, //allow undo and redo actions on the table
        pagination: "local", //paginate the data
        paginationSize: 15, //allow 7 rows per page of data
        movableColumns: true, //allow column order to be changed
        resizableRows: true, //allow row order to be changed
        columns: this.tableColumns,
        rowClick: this.rowClicked,
        //autoColumns:true,
        selectable: "1"
      });
    },
    getTableData() {
      return GetFile(this.fileName, this.projectName)
            .then(jsonData => {
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
    exportTableDataClicked() {
      console.log(this.fileName, this.table.getData());
      console.log(Pappa.unparse(this.table.getData()));
    },
    uploadDataClicked() {
      UploadFile(
        Pappa.unparse(this.table.getData()),
        this.fileName,
        this.projectName
      ).then(res => console.log("table uploaded", res));
    },
    onLobSelected(e) {
      e == "*"
        ? this.table.clearFilter()
        : this.table.setFilter("line_of_business", "=", e);
      this.currentLob = e;
    },
    addValueClicked() {
      let newRowObject = {
        line_of_business: this.currentLob,
        adobe_analytics_config_key: this.adobeKey,
        adobe_analytics_config_value: this.adobeValue
      };
      this.table.addRow(newRowObject);
    },
    rowClicked(e, row) {
      this.deleteItemTitle = row._row.cells.map(cell => ' '+cell.value).toString()

      this.selectedRow = row;
    },
    deleteRowClicked() {
      this.selectedRow
        .delete()
        .then(() => (this.deleteItemTitle = `${this.defaultDeleteText}`));
    }
  }
};
</script>

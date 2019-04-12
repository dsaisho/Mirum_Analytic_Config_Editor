<template>

  <v-layout row wrap justify-space-around>
    <v-flex xs12 ma-4 >
      <div  id="tabulator-table-dynamic"></div>
    </v-flex>
    <v-flex xs5 align-content-center>
      <v-btn v-on:click="exportTableDataClicked">log table data </v-btn>
      <v-btn color="red" v-on:click="uploadDataClicked">Upload file </v-btn>
      <v-btn color="green" v-on:click="refreshTable">Refresh Table </v-btn>

      
    </v-flex>

    <v-flex xs12 align-content-center>
      <p class="text-xs-center title mt-4 text-truncate deep-orange--text" >{{this.deleteItemTitle}}</p>
      <v-btn v-if="this.deleteItemTitle != this.defaultDeleteText" class="d-flex mx-auto" color="deep-orange" v-on:click="deleteRowClicked">Delete Row</v-btn>
    </v-flex>



    <v-flex xs4>
      <v-select  v-on:change="onLobSelected" :items="lobItems" label="Select LOB"></v-select>
    </v-flex>

    <v-flex xs4 v-if="this.currentLob != '*' ">
      <v-text-field v-model="adobeKey" label="Adobe Key" />
      <v-text-field v-model="adobeValue" label="Adobe Value" />

      <v-btn class="ma-0 mp-0" color="yellow" v-on:click="addValueClicked">Add Value </v-btn>
    </v-flex>

  </v-layout>

</template>


<script>
  import Pappa from "papaparse"
  import T from "tabulator-tables"
  import axios from "axios";
  import UploadTable from "@/utils/api/data-world-table-upload.js"
  import GetTable from "@/utils/api/data-world-get-file.js"

  import GetProject from "@/utils/api/data-world-get-project.js"
  import {GetProjectInfo} from "@/utils/api/data-world-api.js"

  let loadedTableData, tableColumns, table;


export default {
  data(){
    return {
      defaultDeleteText: "click row to delete it",
      deleteItemTitle: "click row to delete it",
      adobeKey:"",
      adobeValue:"",
      currentLob:"*",
      selectedRow:{},
      lobItems: [
        "*",
        "medicare and retirement (fed)",
        "community and state",
        "medicare and retirement (is)",
        "optum care", "employee insurance"
      ]
    }
  },
  mounted() {
      this.getTableData()
        .then(() => this.setupTable())
  },
  methods: {
    setupTable(){

       table = new T('#tabulator-table-dynamic',{
      	data:loadedTableData,           //load row data from array
      	layout:"fitColumns",      //fit columns to width of table
      	responsiveLayout:"hide",  //hide columns that dont fit on the table
      	tooltips:true,            //show tool tips on cells
      	addRowPos:"top",          //when adding a new row, add it to the top of the table
      	history:true,             //allow undo and redo actions on the table
      	pagination:"local",       //paginate the data
      	paginationSize:15,         //allow 7 rows per page of data
      	movableColumns:true,      //allow column order to be changed
      	resizableRows:true,       //allow row order to be changed
      	columns: tableColumns,
        rowClick: this.rowClicked,
        selectable: "1"
      })

    },
    getTableData(){
      //Use GetTable class that will return a jsonObject of the requested file.
      //THEN create variables with that data, loadedTableData and tableColumns
      //return the promise, now you can load the data in the table
      return new Promise((resolve, reject) => {
        GetTable("marketing_tag_config.csv")
        .then((jsonData)=>{
          loadedTableData = jsonData;
          tableColumns = Object.keys(jsonData[0]).map(
            category => {
              return {
                title: category,
                field: category,
                editor: true,
                formatter:"textarea"
              };
            });
            resolve();
          })
        })
    },
    refreshTable(){
      table.clearData();
      this.getTableData().then(table.replaceData(loadedTableData))
    },
    exportTableDataClicked(){
      console.log(Pappa.unparse(table.getData()))
    },
    uploadDataClicked(){
      UploadTable(
        Pappa.unparse(table.getData()),
        "marketing_tag_config"
      ).then((res)=>this.refreshTable())
    //  this.refreshTable()
    },
    onLobSelected(e){
      e == "*" ?
      table.clearFilter()
      :
      table.setFilter("line_of_business", "=", e)

      this.currentLob = e
    },
    addValueClicked(){
      let newRowObject = {
        line_of_business: this.currentLob,
        adobe_analytics_config_key: this.adobeKey,
        adobe_analytics_config_value: this.adobeValue
      }
      table.addRow(newRowObject)
    },
    rowClicked(e,row){
      this.deleteItemTitle = `${row._row.cells[0].value} || ${row._row.cells[1].value} || ${row._row.cells[2].value}`
      this.selectedRow = row;
    },
    deleteRowClicked(){
      this.selectedRow.delete().then(()=> this.deleteItemTitle = `${this.defaultDeleteText}`)
    }
  }
}
</script>


/*
TODO::

x get data from data world

x convert to json

x show in table

x edit cell

x export new data to csv

x re upload to data.world


*/

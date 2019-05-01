<template>
  <v-container>
    <!-- check the v-bind="..." for how to load props based on terniery, it will only be smaller on the large screen if the table has loaded-->
    <v-layout row wrap>

      <v-flex xs12>
        <v-text-field  class="mx-3 " v-model="projectName" label="Project" :placeholder="this.projectName"/>
        <v-btn color="red" v-on:click="updateDatasetClicked">Update Dataset?</v-btn>

        <v-btn color="purple" v-on:click="getProjectInfoClicked">Get Project Info </v-btn>
      </v-flex>
      <v-flex>
        <v-flex v-for="(dataset,key) in datasets" :key="key">
          <p>{{dataset.data.id}}</p>

          <p v-for="(file,key) in dataset.data.files" :key="key" :dataset="dataset.data.id" :file-name="file.name" v-on:click="fileClicked">
            {{file.name}}
          </p>
        </v-flex>
      </v-flex>
      <v-flex v-if="this.activeFile">
        <EditTableNew :fileName="this.activeFile" :projectName="this.datasetName" uid="dataset-update" />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Pappa from "papaparse";
import {GetFile, UploadFile, GetProjectInfo,GetLinkedDatasets} from "@/utils/api/data-world-api.js"
import EditTableNew from "@/components/editTable/editTableNew.vue"

export default {
  name: "UpdateDataset",
  components: {
    EditTableNew
  },
  data() {
    return {
      projectName:"testupload",
      datasets:[],
      activeFile:"",
      datasetName:""
    };
  },
  mounted: function() {},
  methods: {
   updateDatasetClicked(){
     GetFile("marketing_tag_config.csv","testupload")
     .then(res=>{
       UploadFile(Pappa.unparse(res), "task_schedule" ,"testdataset")
       .then(res=>console.log('updateDatasetComplete from UpdateDataset.vue'))
     })
   },
   getProjectInfoClicked(){
     GetLinkedDatasets(this.projectName)
     .then(res=>{
       this.datasets = res
     })
   },
   fileClicked(e){
     this.activeFile = e.target.getAttribute("file-name")
     this.datasetName = e.target.getAttribute("dataset")
   }
  }
};
</script>

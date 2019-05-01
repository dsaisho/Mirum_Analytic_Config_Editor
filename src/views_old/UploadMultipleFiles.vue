<template>
  <v-container>
    <!-- check the v-bind="..." for how to load props based on terniery, it will only be smaller on the large screen if the table has loaded-->
    <v-layout row wrap>
      <v-flex>
        <v-text-field class="mx-3" v-model="questionId" label="question_id"/>
        <v-text-field class="mx-3" v-model="questionDesc" label="question_desc"/>
        <v-text-field class="mx-3" v-model="metricId" label="metric_id"/>
        <v-text-field class="mx-3" v-model="calculationId" label="calculation_id"/>
        <v-text-field class="mx-3" v-model="metricType" label="metric_type"/>
        <v-text-field class="mx-3" v-model="useCaseId" label="use_case_id"/>
      </v-flex>
      <v-flex xs12>
        <v-btn color="red" v-on:click="uploadMultipleFiles">Upload to Multiple Files</v-btn>
      </v-flex>
      <p>Business Questions</p>
      <EditTable fileName="business_question.csv" uid="test2"/>
      <p>calculations</p>
      <EditTable fileName="calculation.csv" uid="test"/>
    </v-layout>
  </v-container>
</template>

<script>
import Pappa from "papaparse";
import axios from "axios";
import GetFiles from "@/utils/api/data-world-get-multiple-files.js";
import UploadFiles from "@/utils/api/data-world-upload-multiple-files.js";
import EditTable from "@/components/editTable/editTable.vue";
let filesData = [];
const files = ["business_question.csv", "calculation.csv"];

export default {
  name: "uploadMultipleFiles",
  components: {
    EditTable
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
    uploadMultipleFiles: function() {
      let bqUpdate = {
        question_id: this.questionId,
        question_desc: this.questionDesc,
        metric_id: this.metricId,
        mock_visualization_url: "tbd"
      };

      let calcUpdate = {
        metric_id: this.metricId,
        calculation_id: this.calculationId,
        metric_type: this.metricType,
        use_case_id: this.useCaseId
      };

      const newData = [bqUpdate, calcUpdate];

      this.updateWithNewData(newData);
    },
    updateWithNewData(_newData) {
      //get files
      GetFiles(files)
        .then(res => {
          //update files with new data
          filesData = res.map((fileJson, index) => {
            fileJson.push(_newData[index]);
            return Pappa.unparse(fileJson);
          });
          console.log(filesData, "filesdata");
          return UploadFiles(filesData, files);
        })
        .then(res => console.log("SUCCESS I HOPE", res));
    }
  }
};
</script>

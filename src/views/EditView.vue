<template>
  <keep-alive>
    <v-layout wrap>
      <SubHeader title="Edit Tables" description="*click into any cell to start editing, click 'Save Table' to save your changes"/>
      
      <v-flex d-flex>
        <v-flex style="max-width: 290px">
          <ProjectList :datasets="editableDatasets"/>
        </v-flex>

        <v-flex ml-3 v-if="this.readyToShowTable">
          <EditTable
            :fileName="this.fileName"
            :dataSet="this.dataSet"
            uid="editTable"
          />
        </v-flex>
      </v-flex>
    </v-layout>
  </keep-alive>
</template>


<script>
import ProjectList from "@/components/project-list/ProjectList.vue";
import EditTable from "@/components/edit-table/EditTable.vue";
import SubHeader from "@/components/headers/SubHeader.vue"
export default {
  name:"EditView",
  components: {
    ProjectList,
    EditTable,
    SubHeader
  },
  computed: {
    fileName() {
      return this.$store.state.activeFile;
    },
    dataSet(){
     return this.$store.state.activeDataset
    },
    readyToShowTable(){
      return this.$store.getters.readyToShowTable;
    },
    editableDatasets(){
      return this.$store.getters.editableDatasets
    }
  },
  destroyed: function(){
   //  this.$store.commit("SET_PROJECT_LIST_LOADED", false)
  }
};

/*

This EditView contain 

the project list of files

and

the table 


*/
</script>

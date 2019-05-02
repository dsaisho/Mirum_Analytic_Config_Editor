<template>
  <keep-alive>
    <v-layout wrap>
      <v-flex class="about" xs12  mt-3 text-xs-center >
        <v-card white>
        <h1>Edit Tables</h1>
        <p class="" >*click into any cell to start editing, click 'Save Table' to save your changes</p>
      </v-card>
      </v-flex>

      <v-flex d-flex>
        <v-flex style="max-width: 290px">
          <ProjectList/>
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

export default {
  components: {
    ProjectList,
    EditTable
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
    }
  },
  data() {return { }},
  watch: {},
  mounted() {},
  methods: {}
};

/*

This EditView contain 

the project list of files

and

the table 


*/
</script>

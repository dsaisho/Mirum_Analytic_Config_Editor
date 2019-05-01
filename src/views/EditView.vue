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
            :fileName="this.$store.state.activeFile"
            :projectName="this.$store.state.projectName"
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
    fileName: function() {
      return this.$store.state.activeFile;
    },
    readyToShowTable: function(){
      return this.$store.state.activeFile && this.$store.state.projectListLoaded
    }
  },
  data() {
    return {
     
    };
  },
  watch: {

  },
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

<template>
  <v-container  >
    <v-layout row wrap justify-center pb-2>
      <v-flex  xs12 class="text-sm-center headline mb-4">Show details of the table</v-flex>
      <DescTable v-if="!this.activeItem" v-on:descItemClicked="descItemClicked" />
      <DetailsTable v-if="this.activeItem" :activeItem="activeItem" />
    </v-layout>
</v-container>
</template>

<script>
// @ is an alias to /src
import DescTable from "@/components/tableDetails/DescTable.vue";
import DetailsTable from "@/components/tableDetails/DetailsTable.vue";
export default {
  name: "tableSearch",
  components: {
    DescTable,
    DetailsTable
  },
  computed:{
    activeItem: function(){
      const queryVal = decodeURI(this.$route.query.id);
      return queryVal !== "undefined" ? queryVal : null}
  },
  data() {
    return {
      descItemSelected: "",
      rule:"",
      caseId:""

    };
  },
  created(){
    console.log(this.activeItem,'FROM CREATED')
  },
  mounted: function() {},
  methods: {
    descItemClicked: function(item,item2) {
    //  this.activeItem = item;
    console.log("CLICKED", item,item2)
    }
  }
};
</script>

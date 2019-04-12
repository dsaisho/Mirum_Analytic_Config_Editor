<template>

<!-- check the v-bind="..." for how to load props based on terniery, it will only be smaller on the large screen if the table has loaded-->
<v-flex xs8 :lg3="$store.state.tableLoadComplete" :class="{'pr-5':$vuetify.breakpoint.lgAndUp && this.$store.state.tableLoadComplete, 'mb-5':true}">
  <v-flex class="text-xs-center mb-4">{{ queryString}} </v-flex>
  <v-flex class="text-xs-center mb-4 text-no-wrap apiString">{{ apiUrlString}} </v-flex>
  <SingleInput v-model="userName" title="User Name" />
  <SingleInput v-model="dataset" title="Dataset" />
  <SingleInput v-model="tableName" title="Table Name" />
  <v-btn class="d-block mx-auto trackClick" v-on:click="showTableBtnClicked"
data-event-type="CTA_ENGAGED" data-asset-id="cta-clicked-342" data-event-name="show_table_clicked"
  > Show Table </v-btn>
</v-flex>

</template>

<script>
import SingleInput from "./TableInputSingle.vue";
export default {
  name: "tableInput",
  components: {
    SingleInput
  },
  props: {},
  data() {
    return {
      userName: "mirumagency",
      dataset: "marketing-tag-delivery-uhc",
      tableName: "event"
    };
  },
  computed: {
    apiUrlString: function() {
      return `https://api.data.world/v0/sql/${this.userName}/${this.dataset}`;
    },
    queryString: function() {
      return `query=SELECT * from ${this.tableName}`;
    }
  },
  methods: {
    showTableBtnClicked: function() {
      this.$store.state.userName = this.userName;

      this.$emit("showTableRequested", {
        dataset: this.dataset,
        tableName: this.tableName
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  color: red;
}

.apiString {
  overflow-x: auto;
}
</style>

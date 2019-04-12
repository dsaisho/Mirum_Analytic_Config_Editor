

<template>
<v-flex sm12 lg9>


  <v-flex v-if="!this.error">

    <v-data-table :headers="headers" :items="tableContent" :search="search" class="elevation-1" hide-actions>
      <template slot="items" slot-scope="props">
        <tr v-on:click="descriptionClicked(props.item)" :descItem="props.item">
          <td class="text-xs-left" v-for="(value, key) in headers" :key="key">{{props.item[value.text] }}</td>
        </tr>
      </template>
    </v-data-table>

  </v-flex>
</v-flex>
</template>

<script>
import {
  createTableHeaders
} from "@/utils/TableFormat.js";
export default {
  components: {},
  watch:{

  },
  computed: {

  },
  data() {
    return {
      jsonData: [],
      headers: [],
      items: [],
      search: "",
      selected: [],
      tableContent: [],
      requestTableObj: {},
      error: false,
      query: `SELECT event.data_enrichment_business_rule,
event_attribute.use_case_id
FROM attribute
INNER JOIN event_attribute
ON attribute.attribute_id = event_attribute.attribute_id
INNER JOIN event
ON event.use_case_id = event_attribute.use_case_id
WHERE attribute.data_type = 'data layer' OR attribute.data_type = 'data attribute'
AND event.use_case_type = 'synch'
GROUP BY event_attribute.use_case_id
ORDER BY event.data_enrichment_business_rule,
event_attribute.use_case_id`
    };
  },
  beforeDestroy() {
    this.$store.commit("tableLoadComplete", false);
  },
  created() {
    this.renderTable();
    console.log(this.activeId)
  },
  methods: {
    renderTable: function() {
      this.loadComplete = false;
      this.$store
        .dispatch("searchForTable", {
          _userName: "mirumagency",
          _dataset: "marketing-tag-delivery-uhc",
          _query: `query=${this.query}`
        })
        .then(_tableCategories => {
          this.tableContent = _tableCategories;
          this.headers = createTableHeaders(_tableCategories);
          this.$store.commit("tableLoadComplete");
          this.error = false;
        })
        .catch(error => {
          console.log("error", error);
          this.statusMsg = `Error from searchForTable payload ${error.toString()}`;
          this.$store.commit("tableLoadComplete");
          this.error = true;
        });
    },
    descriptionClicked: function(item) {
      this.$router.push({path:"table-details",query:{id:encodeURI(item.use_case_id)}})
      this.$emit("descItemClicked", {id:item.use_case_id, data:item.data_enri});
    }
  }
};
</script>

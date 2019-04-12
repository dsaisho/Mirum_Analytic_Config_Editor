<template>
  <keep-alive>
<div class="about">
  <h1 v-on:click="h1Clicked">This is an about page</h1>
  <button type ="button" class="trackClick" data-event-type="CTA_ENGAGED" data-asset-id="cta-clicked-342" data-event-name="main_cta_clicked">test btn</button>
</div >
</keep-alive>
</template>


<script>

  import axios from "axios";
  import UploadTable from "@/utils/api/data-world-table-upload.js"

export default {
  mounted() {},
  methods: {
    h1Clicked() {
    console.log('doingit')
    UploadTable()
    .then(res=>console.log(res));
  }//end h1clicked
}
}
</script>

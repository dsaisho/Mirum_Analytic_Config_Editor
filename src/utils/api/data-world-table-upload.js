import axios from "axios";

const apiToken = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJwcm9kLXVzZXItY2xpZW50OnNhaXNob21pcnVtIiwiaXNzIjoiYWdlbnQ6c2Fpc2hvbWlydW06OjU0YjJjMTYzLTcwZTEtNDE3YS1iYTlhLTk4Y2IzNDU4NTMwYiIsImlhdCI6MTU0NTE3ODk2Mywicm9sZSI6WyJ1c2VyX2FwaV9hZG1pbiIsInVzZXJfYXBpX3JlYWQiLCJ1c2VyX2FwaV93cml0ZSJdLCJnZW5lcmFsLXB1cnBvc2UiOnRydWUsInNhbWwiOnt9fQ.mlevXrCRBY-nqbEyUOtXE09eTvdAQlboUO8rp3yOpPfSgiDS-GTODeOtNkppXFtRk-vUWYava8fZRgsruIkiqw";

const config = {
  headers: {
    Authorization: `Bearer ${apiToken}`,
    "Content-Type": `application/octet-stream`
  }
};

let UploadCSV = (
  _fileData = "",
  _fileName = "",
  _owner = "mirumagency",
  _id = "testupload"
) => {

  const uploadFileUrl = `https://api.data.world/v0/uploads/${_owner}/${_id}/files/${_fileName}.csv`;
  console.log(_fileName,_fileData)
  return axios
    .put(uploadFileUrl, _fileData, config)
};
export default UploadCSV;
/*










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












*/

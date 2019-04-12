import axios from "axios";
import CSV from "csvtojson";
const apiToken = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJwcm9kLXVzZXItY2xpZW50OnNhaXNob21pcnVtIiwiaXNzIjoiYWdlbnQ6c2Fpc2hvbWlydW06OjU0YjJjMTYzLTcwZTEtNDE3YS1iYTlhLTk4Y2IzNDU4NTMwYiIsImlhdCI6MTU0NTE3ODk2Mywicm9sZSI6WyJ1c2VyX2FwaV9hZG1pbiIsInVzZXJfYXBpX3JlYWQiLCJ1c2VyX2FwaV93cml0ZSJdLCJnZW5lcmFsLXB1cnBvc2UiOnRydWUsInNhbWwiOnt9fQ.mlevXrCRBY-nqbEyUOtXE09eTvdAQlboUO8rp3yOpPfSgiDS-GTODeOtNkppXFtRk-vUWYava8fZRgsruIkiqw";

const config = {
  headers: {
    Authorization: `Bearer ${apiToken}`
  }
};

let GetProjectInfo = (
  _owner = "mirumagency",
  _id = "marketing-tag-delivery-uhc"
) => {
  let owner = _owner;
  let id = _id;

  const fileUrl = `https://api.data.world/v0/projects/${owner}/${id}`;


  return axios
    .get(fileUrl, config)
};
export default GetProjectInfo;
/*

Requests a table built from userName and dataSet then
Returns a promise for a jsonObject with data from request

GetTableFromUser("username","dataSet","tableName")

usage:
//dataObj is the table data that has been requested
import dwt from "@/utils/api/data-world-table.js"

dwt("mirumagency", "pave-inventory-full", "page_inventory_full")
  .then(dataObj => console.log(dataObj))


*/

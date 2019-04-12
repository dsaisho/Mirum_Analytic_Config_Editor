import axios from "axios";
import CSV from "csvtojson";
const apiToken =
  "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJwcm9kLXVzZXItY2xpZW50OnNhaXNob21pcnVtIiwiaXNzIjoiYWdlbnQ6c2Fpc2hvbWlydW06OjU0YjJjMTYzLTcwZTEtNDE3YS1iYTlhLTk4Y2IzNDU4NTMwYiIsImlhdCI6MTU0NTE3ODk2Mywicm9sZSI6WyJ1c2VyX2FwaV9hZG1pbiIsInVzZXJfYXBpX3JlYWQiLCJ1c2VyX2FwaV93cml0ZSJdLCJnZW5lcmFsLXB1cnBvc2UiOnRydWV9.DeqT-IRblckxTeTWzOu1J5rqbTIQphbPHyljoYOHBPdkXBI4bf_cKCLGaZsFTO1DQoEbUDLGAx73MZsMr3Gn7Q";

const config = {
  headers: {
    Authorization: `Bearer ${apiToken}`,
    Accept: "text/csv"
  }
};

let GetTableFromUser = (
  _userName = "mirumagency",
  _dataset = "united-health-group",
  _query
) => {
  let userName = _userName;
  let dataset = _dataset;
  let query = _query;
  const tableUrl = `https://api.data.world/v0/sql/${userName}/${dataset}`;

  return axios
    .post(tableUrl, query, config)
    .then(dataObj => CSV().fromString(dataObj.data));
};
export default GetTableFromUser;
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

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
  _file="marketing_tag_config.csv",
  _owner = "mirumagency",
  _id = "testupload"

) => {
  let owner = _owner;
  let id = _id;
  let file = _file;
  const fileUrl = `https://api.data.world/v0/file_download/${owner}/${id}/${file}`;

  return axios
    .get(fileUrl, config)
    .then(dataObj => {
      return CSV().fromString(dataObj.data)});
};
export default GetTableFromUser;

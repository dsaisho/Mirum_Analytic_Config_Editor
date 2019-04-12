import axios from "axios";
import CSV from "csvtojson";
import Pappa from "papaparse"

const apiToken =
  "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJwcm9kLXVzZXItY2xpZW50OnNhaXNob21pcnVtIiwiaXNzIjoiYWdlbnQ6c2Fpc2hvbWlydW06OjU0YjJjMTYzLTcwZTEtNDE3YS1iYTlhLTk4Y2IzNDU4NTMwYiIsImlhdCI6MTU0NTE3ODk2Mywicm9sZSI6WyJ1c2VyX2FwaV9hZG1pbiIsInVzZXJfYXBpX3JlYWQiLCJ1c2VyX2FwaV93cml0ZSJdLCJnZW5lcmFsLXB1cnBvc2UiOnRydWV9.DeqT-IRblckxTeTWzOu1J5rqbTIQphbPHyljoYOHBPdkXBI4bf_cKCLGaZsFTO1DQoEbUDLGAx73MZsMr3Gn7Q";

const config = {
  headers: {
    Authorization: `Bearer ${apiToken}`,
    Accept: "text/csv"
  }
};

let GetTableGetMuleipleFiles = (
  _files=["business_question.csv", "calculation.csv"],
  _owner = "mirumagency",
  _id = "testupload",
  _file="marketing_tag_config.csv"
) => {
  let owner = _owner;
  let id = _id;
  let file = _file;


  let fileContents = _files.map(_fileName => {
    const fileUrl = `https://api.data.world/v0/file_download/${owner}/${id}/${_fileName}`;
    return axios.get(fileUrl, config)
  })

  return axios
    .all(fileContents)
    .then(res => {
      //update files with new data
      let filesData = res.map(
        (dataObj, index) => CSV().fromString(dataObj.data)
      );
      return Promise.all(filesData)
    })
    //.then(res=>console.log("zomgz",res))
};
export default GetTableGetMuleipleFiles;

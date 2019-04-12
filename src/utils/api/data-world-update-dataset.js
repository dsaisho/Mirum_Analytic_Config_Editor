import axios from "axios";
import CSV from "csvtojson";
const apiToken = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJwcm9kLXVzZXItY2xpZW50OnNhaXNob21pcnVtIiwiaXNzIjoiYWdlbnQ6c2Fpc2hvbWlydW06OjU0YjJjMTYzLTcwZTEtNDE3YS1iYTlhLTk4Y2IzNDU4NTMwYiIsImlhdCI6MTU0NTE3ODk2Mywicm9sZSI6WyJ1c2VyX2FwaV9hZG1pbiIsInVzZXJfYXBpX3JlYWQiLCJ1c2VyX2FwaV93cml0ZSJdLCJnZW5lcmFsLXB1cnBvc2UiOnRydWUsInNhbWwiOnt9fQ.mlevXrCRBY-nqbEyUOtXE09eTvdAQlboUO8rp3yOpPfSgiDS-GTODeOtNkppXFtRk-vUWYava8fZRgsruIkiqw";

const config = {
  headers: {
    Authorization: `Bearer ${apiToken}`,
    "Content-Type":"application/json"
  }
};

let GetTableFromUser = (
  _file="marketing_tag_config.csv",
  _owner = "mirumagency",
  _id = "testdataset"

) => {
  let owner = _owner;
  let id = _id;
  let file = _file;
  const fileUrl = `https://api.data.world/v0/datasets/${owner}/${id}`;

  const data = {

    "files": [
      {
        "name": "task_schedule.csv",
        "source": {
          "url": "https://docs.google.com/spreadsheets/d/1UheyB6pxTCfLpRmIGITM0fKb8jHVEvPuajmuejxxRyE/pub?gid=1371600687&single=true&output=csv"
        },
        "description": "Purely fictitious performance data on our purely fictitious data.world basketball team.",
        "labels": [
          "raw data",
          "clean data"
        ]
      }
    ]
  }

  return axios
    .put(fileUrl, data, config)
    .then(dataObj => {
      console.log(dataObj)
      });
};
export default GetTableFromUser;

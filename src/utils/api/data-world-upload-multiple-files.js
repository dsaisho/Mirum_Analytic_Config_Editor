import axios from "axios";

const apiToken = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJwcm9kLXVzZXItY2xpZW50OnNhaXNob21pcnVtIiwiaXNzIjoiYWdlbnQ6c2Fpc2hvbWlydW06OjU0YjJjMTYzLTcwZTEtNDE3YS1iYTlhLTk4Y2IzNDU4NTMwYiIsImlhdCI6MTU0NTE3ODk2Mywicm9sZSI6WyJ1c2VyX2FwaV9hZG1pbiIsInVzZXJfYXBpX3JlYWQiLCJ1c2VyX2FwaV93cml0ZSJdLCJnZW5lcmFsLXB1cnBvc2UiOnRydWUsInNhbWwiOnt9fQ.mlevXrCRBY-nqbEyUOtXE09eTvdAQlboUO8rp3yOpPfSgiDS-GTODeOtNkppXFtRk-vUWYava8fZRgsruIkiqw";

const config = {
  headers: {
    Authorization: `Bearer ${apiToken}`,
    "Content-Type": `application/octet-stream`
  }
};

let UploadMultipleFiles = (
  _fileData = [],
  _fileName = [],
  _owner = "mirumagency",
  _id = "testupload"
) => {
  //combine all promises into array
  let fileInfo = _fileName.map((fname,index)=>{
    const fileUrl =  `https://api.data.world/v0/uploads/${_owner}/${_id}/files/${fname}`;
    const fileData = _fileData[index]
    return axios.put(fileUrl, fileData, config)
  })

  return axios.all(fileInfo)
};
export default UploadMultipleFiles;


import axios from "axios";
import CsvToJson from "csvtojson";
const apiToken = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJwcm9kLXVzZXItY2xpZW50OnNhaXNob21pcnVtIiwiaXNzIjoiYWdlbnQ6c2Fpc2hvbWlydW06OjU0YjJjMTYzLTcwZTEtNDE3YS1iYTlhLTk4Y2IzNDU4NTMwYiIsImlhdCI6MTU0NTE3ODk2Mywicm9sZSI6WyJ1c2VyX2FwaV9hZG1pbiIsInVzZXJfYXBpX3JlYWQiLCJ1c2VyX2FwaV93cml0ZSJdLCJnZW5lcmFsLXB1cnBvc2UiOnRydWUsInNhbWwiOnt9fQ.mlevXrCRBY-nqbEyUOtXE09eTvdAQlboUO8rp3yOpPfSgiDS-GTODeOtNkppXFtRk-vUWYava8fZRgsruIkiqw";

const basicConfig = (_header) => {
    let headers = {
        Authorization: `Bearer ${apiToken}`,
    }
    _header ? headers[_header[0]] = _header[1] : null

    return {
        headers: headers
    }
};

const defaultOwner = "mirumagency"

export const UploadFile = (_fileData = "", _fileName = "", _id = "", _owner = defaultOwner) => {
    const uploadFileUrl = `https://api.data.world/v0/uploads/${_owner}/${_id}/files/${_fileName}`;

    return axios.put(uploadFileUrl, _fileData, basicConfig(["Content-type", "application/octet-stream"]))
}

export const GetFile = (_fileName = "", _id = "", _owner = defaultOwner) => {
    const fileUrl = `https://api.data.world/v0/file_download/${_owner}/${_id}/${_fileName}`;

    return axios.get(fileUrl, basicConfig())
            .then(dataObj => {
                return CsvToJson().fromString(dataObj.data)
            })
            .catch(error=>console.log("GET ERROR",error));
}

export const GetProjectInfo = (_id = "", _owner = defaultOwner) => {
    const fileUrl = `https://api.data.world/v0/projects/${_owner}/${_id}`;
    
    return axios.get(fileUrl, basicConfig())
}

export const GetDataset = (_id = "", _owner = defaultOwner)=>{
    const fileUrl = `https://api.data.world/v0/datasets/${_owner}/${_id}`;

    return axios.get(fileUrl, basicConfig())
}

export const GetLinkedDatasets = (_id, _owner) => {

    return GetProjectInfo(_id, _owner)
        .then(res => {         
            const datasets = res.data.linkedDatasets.map((dataset,index) => GetDataset(dataset.id))    

            return axios.all(datasets)
        })
}


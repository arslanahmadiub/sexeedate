import axios from "axios";
import { apiEndPoint } from "../config.json";


const multiFileUploadUrl = apiEndPoint + "/multiUpload";


export async function multiFileUpload(fd) {


    return await axios.post(multiFileUploadUrl, fd);
  }
  
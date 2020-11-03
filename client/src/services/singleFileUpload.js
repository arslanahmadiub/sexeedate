import axios from "axios";
import { apiEndPoint } from "../config.json";


const singleFileUpload = apiEndPoint + "/singleUpload";


export async function fileUpload(fd) {


    return await axios.post(singleFileUpload, fd);
  }
  
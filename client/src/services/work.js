import axios from "axios";
import { apiEndPoint } from "../config.json";

const workPostUrl = apiEndPoint + "/workPost";
const workGetUrl = apiEndPoint + "/workGet";


export async function workPost(data) {


    return await axios.post(workPostUrl, data);
  }
export async function workGet(data) {

   

    return await axios.post(workGetUrl, data);
  }
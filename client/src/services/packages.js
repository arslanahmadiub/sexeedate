
import axios from "axios";
import { apiEndPoint } from "../config.json";


const packagePostUrl = apiEndPoint + "/packagePost";
const packageGetUrl = apiEndPoint + "/packageGet";
const packageDeleteUrl = apiEndPoint + "/packageDelete";

export async function packagePost(data) {


    return await axios.post(packagePostUrl, data);
  }
export async function packageGet() {


    return await axios.get(packageGetUrl);
  }
  export async function packageDelete(data) {


    return await axios.post(packageDeleteUrl, data);
  }

import axios from "axios";
import { apiEndPoint } from "../config.json";

const covidPostUrl = apiEndPoint + "/covidPost";
const covidGetUrl = apiEndPoint + "/covidGet";

export async function covidPost(data) {


    return await axios.post(covidPostUrl, data);
  }
  
export async function covidGet(data) {


    return await axios.post(covidGetUrl, data);
  }
  
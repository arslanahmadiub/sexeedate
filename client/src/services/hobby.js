
import axios from "axios";
import { apiEndPoint } from "../config.json";

const hobbyPostUrl = apiEndPoint + "/hobbyPost";
const hobbyGetUrl = apiEndPoint + "/hobbyGet";

export async function hobbyPost(data) {


    return await axios.post(hobbyPostUrl, data);
  }
  
export async function hobbyGet(data) {


    return await axios.post(hobbyGetUrl, data);
  }
  
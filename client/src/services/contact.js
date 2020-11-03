
import axios from "axios";
import { apiEndPoint } from "../config.json";

const contactPostUrl = apiEndPoint + "/contactPost";
const contactGetUrl = apiEndPoint + "/contactGet";

export async function contactPost(data) {


    return await axios.post(contactPostUrl, data);
  }
  
export async function contactGet(data) {


    return await axios.post(contactGetUrl, data);
  }
  
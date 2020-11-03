
import axios from "axios";
import { apiEndPoint } from "../config.json";


const basicUrl = apiEndPoint + "/bacicInfo";
const basicUrlGet = apiEndPoint + "/basicInfoGet";


export async function basicInfo(data) {


    return await axios.post(basicUrl, data);
  }
  
export async function basicInfoGet(userId) {


    return await axios.post(basicUrlGet, userId);
  }
  

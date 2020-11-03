
import axios from "axios";
import { apiEndPoint } from "../config.json";

const matchingGetUrl = apiEndPoint + "/matchGet";



export async function matchGet(data) {


    return await axios.post(matchingGetUrl, data);
  }
  



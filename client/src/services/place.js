import axios from "axios";
import { apiEndPoint } from "../config.json";

const placePostUrl = apiEndPoint + "/placePost";
const placeGetUrl = apiEndPoint + "/placeGet";


export async function placePost(data) {


    return await axios.post(placePostUrl, data);
  }
export async function placeGet(data) {

   

    return await axios.post(placeGetUrl, data);
  }
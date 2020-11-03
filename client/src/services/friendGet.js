
import axios from "axios";
import { apiEndPoint } from "../config.json";

const friendGetUrl = apiEndPoint + "/friendGet";
const friendImageGetUrl = apiEndPoint + "/basicInfoGet";


export async function friendGet(data) {


    return await axios.post(friendGetUrl, data);
  }
  



export async function userImageGet(data) {

    return await axios.post(friendImageGetUrl, data);
   
  }
   
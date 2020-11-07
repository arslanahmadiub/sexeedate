
import axios from "axios";
import { apiEndPoint } from "../config.json";

const friendGetUrl = apiEndPoint + "/friendGet";
const friendImageGetUrl = apiEndPoint + "/basicInfoGet";
const friendRequestSendUrl = apiEndPoint + "/sendFriendRequest";


export async function friendGet(data) {


    return await axios.post(friendGetUrl, data);
  }
  



export async function userImageGet(data) {

    return await axios.post(friendImageGetUrl, data);
   
  }
   
export async function sendFriendRequest(data) {

    return await axios.post(friendRequestSendUrl, data);
   
  }
   
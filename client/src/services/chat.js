
import axios from "axios";
import { apiEndPoint } from "../config.json";

const chatPostUrl = apiEndPoint + "/chatPost";
const chatGetUrl = apiEndPoint + "/chatGet";
const friendWithChat = apiEndPoint + "/getFriendChat";

export async function chatPost(data) {


    return await axios.post(chatPostUrl, data);
  }
  
export async function chatGet(data) {


    return await axios.post(chatGetUrl, data);
  }
  
export async function getFriendWithChat(data) {


    return await axios.post(friendWithChat, data);
  }
  
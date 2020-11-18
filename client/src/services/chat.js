
import axios from "axios";
import { apiEndPoint } from "../config.json";

const chatPostUrl = apiEndPoint + "/chatPost";
const chatGetUrl = apiEndPoint + "/chatGet";
const friendWithChat = apiEndPoint + "/getFriendChat";
const readLastChat = apiEndPoint + "/limitedChat";
const chatNumberUrl = apiEndPoint + "/chatMessageNumberGet";

export async function chatPost(data) {


    return await axios.post(chatPostUrl, data);
  }
  
export async function chatGet(data) {


    return await axios.post(chatGetUrl, data);
  }
  
export async function getFriendWithChat(data) {


    return await axios.post(friendWithChat, data);
  }
  
export async function readLastMessage(data) {


    return await axios.post(readLastChat, data);
  }

export async function chatNumberGet(data) {


    return await axios.post(chatNumberUrl, data);
  }




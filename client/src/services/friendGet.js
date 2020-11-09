import axios from "axios";
import { apiEndPoint } from "../config.json";

const friendGetUrl = apiEndPoint + "/friendGet";
const friendImageGetUrl = apiEndPoint + "/basicInfoGet";
const friendRequestSendUrl = apiEndPoint + "/sendFriendRequest";
const findFriendRequestUrl = apiEndPoint + "/findFriendRequest";
const deleteFriendRequestUrl = apiEndPoint + "/deleteFriendRequest";
const addFriendUrl = apiEndPoint + "/addFriend";

export async function friendGet(data) {
  return await axios.post(friendGetUrl, data);
}

export async function userImageGet(data) {
  return await axios.post(friendImageGetUrl, data);
}

export async function sendFriendRequest(data) {
  return await axios.post(friendRequestSendUrl, data);
}

export async function findFriendRequest(data) {
  return await axios.post(findFriendRequestUrl, data);
}
export async function deleteFriendRequest(data) {
  return await axios.post(deleteFriendRequestUrl, data);
}
export async function addFriendInList(data) {
  return await axios.post(addFriendUrl, data);
}

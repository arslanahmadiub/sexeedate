import axios from "axios";
import { apiEndPoint } from "../config.json";
import { deCodeId } from "./userId";

const profileGetUrl = apiEndPoint + "/profileGet";
const fullProfileGetUrl = apiEndPoint + "/allProfileGet";
const updateProfileStatusUrl = apiEndPoint + "/updateProfileStatus";
const updateProfileDeleteUrl = apiEndPoint + "/profileDelete";
const userRoleCheck = apiEndPoint + "/getUserRole";
const currentUserUrl = apiEndPoint + "/getCurrentUser";
const userGenderUrl = apiEndPoint + "/getUserGender";
const fullUserDetailUrl = apiEndPoint + "/getFullUserDetail";
const userImageGetUrl = apiEndPoint + "/getUserImage";
const updatePasswordUrl = apiEndPoint + "/updatePass";
const forgetPassUrl = apiEndPoint + "/forgetPass";
const proUserUrl = apiEndPoint + "/proUser";
const currentPassUrl = apiEndPoint + "/currentPass";

export async function profileGetFunction() {
  return await axios.get(profileGetUrl);
}

export async function fullUserDetailGet() {
  return await axios.get(fullProfileGetUrl);
}

export async function updateProfileStatus(data) {
  return await axios.post(updateProfileStatusUrl, data);
}

export async function deleteProfile(data) {
  return await axios.post(updateProfileDeleteUrl, data);
}

export async function checkUserRole(data) {
  return await axios.post(userRoleCheck, data);
}
export async function getUserGender(data) {
  return await axios.post(userGenderUrl, data);
}
export async function getFullUserDetail(data) {
  return await axios.post(fullUserDetailUrl, data);
}
export async function getUserImage(data) {
  return await axios.post(userImageGetUrl, data);
}
export async function updateUserPassword(data) {
  return await axios.post(updatePasswordUrl, data);
}

export async function sendEmailForUpdate(data) {
  return await axios.post(forgetPassUrl, data);
}

export async function proUser(data) {
  return await axios.post(proUserUrl, data);
}
export async function currentPass(data) {
  return await axios.post(currentPassUrl, data);
}

export async function currentUser() {
  let id = await deCodeId();
  let userId = {
    userId: id,
  };
  let { data } = await axios.post(fullUserDetailUrl, userId);

  return data;
}

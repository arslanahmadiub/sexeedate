import axios from "axios";
import { apiEndPoint } from "../config.json";

const authGet = apiEndPoint + "/auth";
const profileGet = apiEndPoint + "/profileGet";

export async function login(email, password) {


  return await axios.post(authGet, { email, password });
}

export async function getUser() {
  let data = await axios.get(profileGet);
  return data.data;
}

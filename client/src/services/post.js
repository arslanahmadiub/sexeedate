
import axios from "axios";
import { apiEndPoint } from "../config.json";

const postPostUrl = apiEndPoint + "/postPost";
const postGetUrl = apiEndPoint + "/postGet";
const allPostGetUrl = apiEndPoint + "/allPostGet";
const postDeleteUrl = apiEndPoint + "/postDelete";


export async function postPost(data) {


    return await axios.post(postPostUrl, data);
  }
export async function postGet() {


    return await axios.post(postGetUrl);
  }

export async function allPost() {


    return await axios.get(allPostGetUrl);
  }

export async function postDelete(data) {


    return await axios.post(postDeleteUrl,data);
  }

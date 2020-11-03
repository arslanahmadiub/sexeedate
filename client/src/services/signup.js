import axios from "axios";
import { apiEndPoint } from "../config.json";

const userInsert = apiEndPoint + "/profile";

export async function saveUser(user) {

 return axios.post(userInsert,{
    firstName:user.firstName,
      lastName:user.lastName,
      email:user.email,
      password:user.password,
      dob:user.dob,
      mobile:user.mobile,
      gender:user.gender
  })
}

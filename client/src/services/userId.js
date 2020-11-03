const jwt = require('jsonwebtoken');


export async function deCodeId (){
    let token = localStorage.getItem("token")
   
   if(token){
    const header =await jwt.decode(token);
    return header._id
   }
    else{
        return null
    }
  }
import React,{useState} from "react";
import logo from "../images/logo2.svg";

import girl from "../images/girl.jpeg";
import men from "../images/men.jpeg";
import { useHistory } from "react-router-dom";

function GenderSelection() {
  const history = useHistory();
  let [gender, setGender]=  useState();


  const handelGenderClick = ()=>{
    if(gender){
      localStorage.setItem('gender', gender);
      
      history.push("/register");

    }
   
  }
const handelGender = async(e)=>{
 await setGender(e.target.value)
}

  return (
    <React.Fragment>
    <div id="genderSelection">
      <input type="radio" name="emotion" id="sad" value="Male" className="input-hidden" onChange={handelGender} />
      <label htmlFor="sad">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "120px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img src={men} alt="I'm sad" />

          <h6
            className="mt-3"
            style={{
              textAlign: "center",
              color: "#B71C1C",
            }}
          >
            I would like a sexee date
          </h6>
        </div>
      </label>
      <img src={logo} style={{ width: "300px" }} />

      <input type="radio" name="emotion" id="happy" value="Female" className="input-hidden" onChange={handelGender}/>
      <label htmlFor="happy">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "120px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img src={girl} alt="I'm happy"  />
          <h6
            className="mt-3"
            style={{
              textAlign: "center",
              color: "#B71C1C",
            }}
          >
            I am a sexee date
          </h6>
        </div>
      </label>
    </div>
    <div style={{display:"flex", width:"100vw", position:"absolute", top:"75vh", justifyContent:"center"}}>   <button className="btn-hover color-11 " onClick={handelGenderClick}>Submit</button></div>
   
    </React.Fragment>
  );
}

export default GenderSelection;

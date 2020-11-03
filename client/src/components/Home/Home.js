import React ,{useState} from 'react'
import Login from "../Login";
import { useHistory } from "react-router-dom";
import logo from "../../images/logo2.svg";

import Forgotmodel from '../Forgotmodel';
import video from '../../videos/background.mp4'
function Home() {
  const [signInShow, setSignInShow] = useState(false);
  const [forGotShow, setForGotShow] = useState(false);


  const history = useHistory();
  const handleSignInScreen =()=>{
    setSignInShow(true)
  }
  const handleRegisterScreen =()=>{
    history.push("/dob");
  }

  const handelHide = ()=>{
    setSignInShow(false)
  } 
  const handelForgotHide = ()=>{
    setForGotShow(false)
  } 
  let showForget = ()=>{
    setForGotShow(true);
    setSignInShow(false);
   
  }

  return (
    <React.Fragment >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            width:"100vw",
            flexDirection: "column",
            zIndex:"10"
          }}
         
          
        >
          <div>
          <img src={logo}   width="250rem"/>
          </div>
          <div >
          <h1
            className="lead mb-0 mt-3"
           id="slog"
            style={{ fontSize: "2.2rem", textAlign: "center",marginLeft:"0px" }}
          >
            Find A Sexy Date or Possibly Your Soul Mate
          </h1>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100vw",
            }}
          >
            <button className="btn-hover color-10 mt-5"  onClick={handleRegisterScreen} >
              Become a Member
            </button>
            <button
              className="btn-hover color-10 mt-5"
              onClick={handleSignInScreen}
            >
              Login
            </button>
          </div>
        </div>

  

        <div
         
          style={{display:"flex",position:"absolute", top:"0",left:"0" , width:"100vw", zIndex:"-3"}}
       id="videoContainer"
       >
         <div className="overlay" />
                   <video
            playsInline="playsinline"
            autoPlay="autoplay"
            muted="muted"
            loop="loop"
            id="video"
            
          >
            <source src={video} type="video/mp4" />
          </video>

          </div>
       
        <Login showLog={signInShow} handel={handelHide} forgot={showForget} />
    <Forgotmodel showForget={forGotShow} handelForgotHide={handelForgotHide}/>
      
      </React.Fragment>
  )
}

export default Home

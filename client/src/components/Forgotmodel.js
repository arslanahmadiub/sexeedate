import React, { useState, useEffect } from "react";
import { Button, Modal,Alert } from "react-bootstrap";
import {sendEmailForUpdate} from '../services/profile'

function Forgotmodel(props) {
  const [forgetShow, setForgetshow] = useState(props.showForget);
  const [email, setEmail] = useState("")
  const [errors, setErrors] = useState("")

  useEffect(() => {
    setForgetshow(props.showForget);
  }, [props.showForget]);

let handelForgetChange =(e)=>{

  setEmail(e.target.value)
}

let sendEmail = async()=>{

  try {
    let {data}= await sendEmailForUpdate({email})
    setErrors("An Email send to your email address click on link and reset your password...")
    setTimeout(() => {
      setErrors("")
      setForgetshow(false)
    }, 3000);
  } catch (ex) {
    if (ex.response && ex.response.status === 400) {
        
      setErrors(ex.response.data)
    }
  }
 
  
  
}


  return (
    <Modal show={forgetShow} onHide={props.handelForgotHide}>
      <Modal.Body>
  <Alert variant="warning" style={errors.length>0 ?{display:"flex"}:{display:"none"}}>{errors}</Alert>
        <div className="row">
          <div className="col">
            <h5>Enter your Email address for recover password</h5>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col">
            <label htmlFor="signInEmail">Email</label>
            <input
              type="email"
              className="form-control mt-1"
              value={email}
              onChange={handelForgetChange}
              
              placeholder="Enter Your Email..."
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button className="btn btn-danger" style={{ background: "#B71C1C" }} onClick={sendEmail}>
          Send Email
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Forgotmodel;

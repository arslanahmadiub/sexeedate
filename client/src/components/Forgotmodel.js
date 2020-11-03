import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";

function Forgotmodel(props) {
  const [forgetShow, setForgetshow] = useState(props.showForget);

  useEffect(() => {
    setForgetshow(props.showForget);
  }, [props.showForget]);




  return (
    <Modal show={forgetShow} onHide={props.handelForgotHide}>
      <Modal.Body>
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
              // value={signInEmail}
              // onChange={this.handleSignInChange}
              id="signInEmail"
              name="signInEmail"
              placeholder="Enter Your Email..."
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button className="btn btn-danger" style={{ background: "#B71C1C" }}>
          Send Email
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Forgotmodel;

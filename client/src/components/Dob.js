import React, { useState } from "react";
import { Button, Modal, Alert } from "react-bootstrap";
import backImage from "../images/dobbackground.jpg";
import { useHistory } from "react-router-dom";
let { AgeFromDateString, AgeFromDate } = require("age-calculator");

function Dob() {
  const history = useHistory();
  let [dob, setDob] = useState();
  let [message, setMessage] = useState();
  let [showAlert, setShowALert] = useState(false);

  let handelLoginClick = () => {
    history.push("/");
  };

  const handelSubmit = () => {
    let ageFromDate = new AgeFromDate(new Date(dob)).age;

    if (ageFromDate == 0) {
      setMessage("Please select choose your Date of Birth");
      setShowALert(true);
    } else if (ageFromDate < 18) {
      setMessage("Your Age is less then 18...");

      setShowALert(true);
    } else {
      localStorage.setItem("dob", dob);
      history.push("/gender");
    }
  };
  const handelDob = async (e) => {
    const dateOfBirth = e.target.value;
    await setDob(dateOfBirth);
  };
  const hadelModel = () => {
    setShowALert(false);
  };

  return (
    <React.Fragment>
      <div id="dobBack">
        <div>
          <h3 style={{ marginTop: "20vh" }}>
            Our App is intended for adult's only. So Please Provide your date of
            birth...
          </h3>
          <br />

          <input
            placeholder="Choose Date of Birth"
            className="form-control mt-3"
            type="text"
            onFocus={(e) => (e.target.type = "date")}
            id="dateOfBirth"
            onChange={handelDob}
          />
          <button className="btn-hover color-11 mt-5" onClick={handelSubmit}>
            Submit
          </button>
          <h6
            style={{
              color: "white",
              textAlign: "center",
              marginTop: "15px",
              fontSize: "12px",
            }}
          >
            By entering this site you are agreeing with our term of use and
            privicy policy.
          </h6>
          <h5
            style={{
              color: "#B71C1C",
              textAlign: "center",
              marginTop: "15px",
              fontSize: "12px",
              cursor: "pointer",
            }}
            onClick={handelLoginClick}
          >
            For Login Click Here...
          </h5>
        </div>
      </div>

      <Modal show={showAlert} onHide={hadelModel}>
        <Modal.Body>
          <h4>{message}</h4>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn btn-danger"
            style={{ background: "#B71C1C" }}
            onClick={hadelModel}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
}

export default Dob;

import React, { useState, useEffect } from "react";
import { Modal, Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { Button } from "@material-ui/core";
import { saveUser } from "../services/signup";

function Register() {
  let [message, setMessage] = useState();
  let [showAlert, setShowALert] = useState(false);
  let [checked, setChecked] = useState(false);
  let [errors, setErrors] = useState("");
  const history = useHistory();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    dob: "",
  });

  const [loading, setloading] = useState(false);
  const {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    gender,
    dob,
  } = formData;
  const handelInputChange = async (e) => {
    const gender = localStorage.getItem("gender");
    const dob = localStorage.getItem("dob");
    await setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      gender: gender,
      dob: dob,
    });
  };

  const emailToast =()=>{
    toast("An Verification Email send to your email address. Verify your account...",{
      className:"error-toast",
      draggable:false
    })
  }

  const handleRegister = async () => {
    if (
      firstName.length < 1 ||
      lastName.length < 1 ||
      email.length < 1 ||
      password.length < 1 ||
      gender.length < 1 ||
      dob.length < 1
    ) {
      setMessage("please fill full form");
      setShowALert(true);
    } else if (password !== confirmPassword) {
      setMessage("password dont't match");
      setShowALert(true);
    } else if (!checked) {
      setMessage("Checked term check box...");
      setShowALert(true);
    }
    if (checked) {
      try {
        let user = { ...formData };
        setloading(true)
        let result = await saveUser(user);
        setloading(false)
         emailToast()


        let data = {
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
          gender: "",
          dob: "",
        };

        setFormData(data);
        localStorage.removeItem("gender");
        localStorage.removeItem("dob");
        setTimeout(() => {
          
          history.push("/");
        }, 5000);
      } catch (ex) {
        if (ex.response && ex.response.status === 400) {
        setloading(false)

          setErrors(ex.response.data);
        }
      }
    }
  };
  const hadelModel = () => {
    setShowALert(false);
  };
  const showError = () => {
    if (errors.length > 0) {
      return (
        <Alert variant="warning" style={{ background: "red" }}>
          {errors}
        </Alert>
      );
    }
  };

  const handelChecked = (e) => {
    setChecked(!checked);
  };

  useEffect(() => {}, [formData]);


  const loadingStyle = {
    zIndex: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "rgba(67.8, 84.7, 90.2, 0.8)",
    width: "100vw",
    height: "100vh",
    position: "absolute",
    top: "0",
    left: "0",
  };
  
  const unLoadingStyle = {
    zIndex: -50,
    display: "none",
    justifyContent: "center",
    alignItems: "center",
    background: "rgba(67.8, 84.7, 90.2, 0.8)",
    width: "100vw",
    height: "100vh",
    position: "absolute",
    top: "0",
    left: "0",
  };
  

  return (
    <React.Fragment>
      <div
        style={{
          display: "flex",
          width: "100vw",
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        <div style={loading ? loadingStyle : unLoadingStyle}>
          <CircularProgress color="inherit" />
        </div>
        <ToastContainer />
        <div style={{ padding: "30vw" }}>
          <div className="row" style={{ marginTop: "5vh" }}>
            {showError()}
            <div className="col-6">
              <label
                htmlFor="firstName"
                className="form-label"
                style={{ color: "white" }}
              >
                First Name
              </label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                name="firstName"
                value={firstName}
                placeholder="Enter First Name"
                onChange={handelInputChange}
              />
            </div>
            <div className="col-6">
              <label
                htmlFor="lastName"
                className="form-label"
                style={{ color: "white" }}
              >
                Last Name
              </label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                value={lastName}
                name="lastName"
                placeholder="Enter Last Name"
                onChange={handelInputChange}
              />
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-12">
              <label
                htmlFor="email"
                className="form-label"
                style={{ color: "white" }}
              >
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                name="email"
                placeholder="Enter Email Here"
                onChange={handelInputChange}
              />
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-12">
              <label
                htmlFor="password"
                className="form-label"
                style={{ color: "white" }}
              >
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                name="password"
                placeholder="Password"
                onChange={handelInputChange}
              />
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-12">
              <label
                htmlFor="confirmPassword"
                className="form-label"
                style={{ color: "white" }}
              >
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                value={confirmPassword}
                name="confirmPassword"
                placeholder="Confirm Password"
                onChange={handelInputChange}
              />
            </div>
          </div>

          <div className="row mt-3">
            <div
              className="col-12"
              style={{
                display: "flex",

                alignItems: "center",
              }}
            >
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value={checked}
                  id="flexCheckChecked"
                  onChange={handelChecked}
                />
                <label
                  className="form-check-label"
                  htmlFor="flexCheckChecked"
                  style={{ color: "white" }}
                >
                  I agree with <a href="#/term">term and condition</a>
                </label>
              </div>
            </div>
          </div>

          <div className="row mt-3">
            <div
              className="col-12"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                variant="contained"
                color="secondary"
                style={{ width: "30vw", background: "#B71C1C" }}
                onClick={handleRegister}
              >
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Modal show={showAlert} onHide={hadelModel}>
        <Modal.Body>
          <h4>{message}</h4>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="contained"
            color="secondary"
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

export default Register;

import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Button } from "@material-ui/core";
import { Alert } from "react-bootstrap";
import { updateUserPassword } from "../services/profile";
const jwt = require("jsonwebtoken");

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
function Forgot(props) {
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [userId, setUserId] = useState("");
  const [errors, setErrors] = useState("");
  const history = useHistory();

  let query = useQuery();

  useEffect(() => {
    getId();
  });

  let getId = async () => {
    const header = await jwt.decode(query.get("token"));

    await setUserId(header._id);
  };

  let handelConfirmPassword = (e) => {
    setConfirmPass(e.target.value);
  };
  let handelPassword = (e) => {
    setPass(e.target.value);
  };

  let handelReset = async () => {
    if (pass !== confirmPass) {
      setErrors("Password Not Match...");
    } else {
      setErrors("");
      let newData = {
        userId: userId,
        password: pass,
      };
      let { data } = await updateUserPassword(newData);
      history.push("/");
    }
  };

  return (
    <React.Fragment>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        <div
          className="container"
          style={{ padding: "20vw" }}
          id="forgotFormControl"
        >
          <div className="row">
            <div className="col-12">
              <Alert
                variant="warning"
                style={
                  errors.length > 0 ? { display: "flex" } : { display: "none" }
                }
              >
                {errors}
              </Alert>

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
                placeholder="Enter Your New Password"
                onChange={handelPassword}
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
                placeholder="Enter Password Again"
                onChange={handelConfirmPassword}
              />
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-12">
              <button
                className="btn-hover color-10"
                onClick={handelReset}
                style={{
                  float: "right",
                }}
              >
                Reset Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Forgot;

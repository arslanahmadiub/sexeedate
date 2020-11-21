import React, { useState, useEffect } from "react";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

import "./Profile.css";
import { Link } from "react-router-dom";
import { hobbyPost } from "../../services/hobby";
import { hobbyGet } from "../../services/hobby";
import { deCodeId } from "../../services/userId";
import SearchBar from "../Timline/SearchBar";
import Alert from "react-bootstrap/Alert";
import CircularProgress from "@material-ui/core/CircularProgress";

function Hobies() {
  let [covid, setCovid] = useState("block");
  let [covidForm, setCovidForm] = useState("none");
  let [hobby, setHobby] = useState("");
  let [hobbies, setHobbies] = useState([]);
  let [alertShow, setAlertShow] = useState(false);
  let [loading, setLoading] = useState(false);

  const loadingStyle = {
    zIndex: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "rgba(0, 0, 0, 0.8)",
    width: "100vw",
    height: "100vh",
    position: "absolute",
    top: "0",
    left: "0",
  };

  const unLoadingStyle = {
    zIndex: -50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "rgba(0, 0, 0, 0.8)",
    width: "100vw",
    height: "100vh",
    position: "absolute",
    top: "0",
    left: "0",
  };

  useEffect(() => {
    getHobby();
  }, []);
  let handelCovid = () => {
    setCovid("none");
    setCovidForm("block");
  };
  let handelCovidForm = () => {
    if (hobbies.length < 1) {
      setAlertShow(true);
    } else {
      setAlertShow(false);
      setLoading(true);
      postHobby();
      setLoading(false);
      setCovid("block");
      setCovidForm("none");
    }
  };

  let getHobby = async () => {
    let id = await deCodeId();
    let user = { userId: id };
    let { data } = await hobbyGet(user);
    if (data) {
      await setHobbies(data.hobbies);
    }
  };

  let postHobby = async () => {
    let id = await deCodeId();

    let data = {
      userId: id,
      hobbies: hobbies,
    };
    let result = await hobbyPost(data);
  };

  let covidStyle = {
    display: covid,
  };
  let covidFormStyle = {
    display: covidForm,
    paddingRight: "20vw",
  };

  let handelIcon = async (index) => {
    let hobbiesData = [...hobbies];

    hobbiesData.splice(index, 1);
    await setHobbies(hobbiesData);
  };

  let handelHobbyChange = async (e) => {
    setHobby(e.target.value);
  };
  let addHobby = async (e) => {
    if (e.key === "Enter") {
      if (hobby.length > 0) {
        hobbies.push(hobby);
        setHobby("");
      }
    }
  };
  return (
    <React.Fragment>
      <div style={{ background: "#100C08", width: "100vw", height: "100%" }}>
        {/* <SearchAppBar/> */}
        <SearchBar />
        <div
          className="container"
          style={{
            marginTop: "0",
            background: "#100C08",
            padding: "20px",
            height: "100vh",
            width: "100vw",
            overflow: "auto",
          }}
        >
          <div className="row">
            <div
              className="col-md-12 "
              style={{ display: "flex", justifyContent: "center" }}
            >
              <h1 style={{ color: "#550505" }}>About Section</h1>
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-md-3  " style={{ textAlign: "center" }}>
              <div className="sidenav">
                <Link to="/basicinfo" style={{ marginTop: "5px" }}>
                  Basic Info
                </Link>

                <Link to="/contact" style={{ marginTop: "5px" }}>
                  Contact
                </Link>

                <Link to="/place" style={{ marginTop: "5px" }}>
                  Place
                </Link>
                <Link to="/work" style={{ marginTop: "5px" }}>
                  Work and Education
                </Link>
                <Link
                  to="/hobies"
                  style={{ marginTop: "5px" }}
                  className="active"
                >
                  Hobies
                </Link>
                <Link to="/covid" style={{ marginTop: "5px" }}>
                  Covid Question
                </Link>
                <Link to="/setting" style={{ marginTop: "5px" }}>
                  Setting
                </Link>
                <Link to="/payment" style={{ marginTop: "5px" }}>
                  Payment
                </Link>
              </div>
            </div>
            <div
              className="col-md-9 profile"
              style={{ padding: "25px", color: "white" }}
            >
              {/* Work Section */}
              <Alert show={alertShow} variant="danger">
                <p>Fill All Fields</p>
              </Alert>
              <div style={loading ? loadingStyle : unLoadingStyle}>
                <CircularProgress color="inherit" />
              </div>
              <h3 style={{ textAlign: "center" }}>Add Your Hobies</h3>
              <div style={covidStyle}>
                <span style={{ fontSize: "16px" }} onClick={handelCovid}>
                  Add Hobies
                </span>
                <div className="mt-3" id="hobies">
                  <ul>
                    {hobbies.length
                      ? hobbies.map((item, index) => {
                          return <li key={index}>{item}</li>;
                        })
                      : null}
                  </ul>
                </div>
              </div>

              <div style={covidFormStyle}>
                <h5 className="mt-3">Add Hobies one by one</h5>
                {hobbies.map((item, index) => {
                  return (
                    <button
                      className="btn btn-outline-secondary ml-2 mt-2 languageButton"
                      value={index}
                      key={index}
                    >
                      {item}
                      <DeleteForeverIcon
                        className="deleteIcon"
                        value={index}
                        onClick={() => {
                          handelIcon(index);
                        }}
                      />
                    </button>
                  );
                })}
                <input
                  type="text"
                  className="form-control mt-3"
                  name="comfortLevel"
                  placeholder="Add Hobies one by one"
                  value={hobby}
                  onChange={handelHobbyChange}
                  onKeyDown={addHobby}
                />

                <button
                  className="btn-hover1 color-10"
                  onClick={handelCovidForm}
                  style={{ float: "right" }}
                >
                  Save
                </button>
              </div>

              <br />
              {/* Education Section */}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Hobies;

import React, { Component } from "react";
import "./Profile.css";
import { Link } from "react-router-dom";
import { workPost } from "../../services/work";
import { workGet } from "../../services/work";
import { deCodeId } from "../../services/userId";
import SearchBar from "../Timline/SearchBar";
import Alert from "react-bootstrap/Alert";
import CircularProgress from "@material-ui/core/CircularProgress";

class Work extends Component {
  state = {
    display: "block",
    workStyle: "none",
    collegeDisplay: "block",
    collegeForm: "none",
    alertShow: false,
    loading: false,

    workData: {
      jobTitle: "",
      jobCity: "",
      jobDesc: "",
    },
    uniData: {
      uniName: "",
      startDate: "",
      endDate: "",
      degreeDesc: "",
    },
  };

  componentDidMount() {
    this.fetchWorkData();
  }

  handelWorkChange = async (e) => {
    let { workData } = { ...this.state };
    let currentState = workData;

    const { name, value } = e.target;
    currentState[name] = value;
    await this.setState({ workData: currentState });
  };

  handelUniData = async (e) => {
    let { uniData } = { ...this.state };
    let currentState = uniData;

    const { name, value } = e.target;
    currentState[name] = value;
    await this.setState({ uniData: currentState });
  };

  fetchWorkData = async () => {
    let userId = await deCodeId();
    let id = { userId };
    let data = await workGet(id);
    let {
      jobTitle,
      jobCity,
      jobDesc,
      startDate,
      endDate,
      collegeName,
      degreeDesc,
    } = data.data;
    let uniData = {
      uniName: collegeName,
      startDate: startDate,
      endDate: endDate,
      degreeDesc: degreeDesc,
    };
    let jobData = {
      jobTitle,
      jobCity,
      jobDesc,
    };
    await this.setState({ uniData: uniData, workData: jobData });
  };

  handelWorkPlace = () => {
    this.setState({ display: "none", workStyle: "block" });
  };
  handelWorkSave = async () => {
    let { jobTitle, jobCity, jobDesc } = this.state.workData;
    if (jobTitle.length < 1 || jobCity.length < 1 || jobDesc.length < 1) {
      this.setState({ alertShow: true });
    } else {
      this.setState({ alertShow: false, loading: true });

      this.postWorkData();

      this.setState({ loading: false });
      this.setState({ display: "block", workStyle: "none" });
    }
  };

  postWorkData = async () => {
    let { uniName, startDate, endDate, degreeDesc } = this.state.uniData;
    let { jobTitle, jobCity, jobDesc } = this.state.workData;
    let userId = await deCodeId();
    let data = {
      userId,
      jobTitle,
      jobCity,
      jobDesc,
      uniName,
      startDate,
      endDate,
      degreeDesc,
    };

    let result = await workPost(data);
  };
  handelCollege = () => {
    this.setState({ collegeDisplay: "none", collegeForm: "block" });
  };
  handelCollegeSave = () => {
    let { uniName, startDate, endDate, degreeDesc } = this.state.uniData;
    if (
      uniName.length < 1 ||
      startDate.length < 1 ||
      endDate.length < 1 ||
      degreeDesc.length < 1
    ) {
      this.setState({ alertShow: true });
    } else {
      this.setState({ alertShow: false, loading: true });
      this.postWorkData();

      this.setState({ collegeDisplay: "block", collegeForm: "none" });
    }
  };

  render() {
    let { display, workStyle, collegeDisplay, collegeForm } = this.state;
    let { uniName, startDate, endDate, degreeDesc } = this.state.uniData;
    let { jobTitle, jobCity, jobDesc } = this.state.workData;

    let style = {
      display,
    };
    let workStyles = {
      display: workStyle,
    };

    let collegeShow = {
      display: collegeDisplay,
    };
    let collegeFormShow = {
      display: collegeForm,
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
                <h1 style={{ color: "#a30909" }}>About Section</h1>
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
                  <Link
                    to="/work"
                    style={{ marginTop: "5px" }}
                    className="active"
                  >
                    Work and Education
                  </Link>
                  <Link to="/hobies" style={{ marginTop: "5px" }}>
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
                <Alert show={this.state.alertShow} variant="danger">
                  <p>Fill All Fields</p>
                </Alert>
                <div style={this.state.loading ? loadingStyle : unLoadingStyle}>
                  <CircularProgress color="inherit" />
                </div>
                <h3>Work</h3>
                <div style={style}>
                  <span onClick={this.handelWorkPlace}>Add Work Place</span>
                  <h5 className="mt-2">{jobTitle}</h5>
                  <div style={{ display: "flex" }}>
                    <p className="">at {jobCity}</p>
                  </div>
                  <p style={{ marginTop: "-10px" }}>{jobDesc}</p>
                </div>
                <div className="profileForm" style={workStyles}>
                  <input
                    type="text"
                    className="form-control"
                    name="jobTitle"
                    value={jobTitle}
                    placeholder="Job Title"
                    onChange={this.handelWorkChange}
                  />
                  <input
                    type="text"
                    className="form-control mt-3"
                    name="jobCity"
                    placeholder="Job City"
                    value={jobCity}
                    onChange={this.handelWorkChange}
                  />
                  <input
                    type="text"
                    className="form-control mt-3"
                    name="jobDesc"
                    value={jobDesc}
                    placeholder="Job Description"
                    onChange={this.handelWorkChange}
                  />

                  <button
                    className="btn-hover1 color-10"
                    onClick={this.handelWorkSave}
                    style={{ float: "right" }}
                  >
                    Save
                  </button>
                </div>

                {/* Education Section */}
                <br />
                <hr />

                <h3>Universty</h3>
                <div style={collegeShow}>
                  <span onClick={this.handelCollege}>Add College</span>
                  <h5 className="mt-2">Studied at {uniName}</h5>
                  <div style={{ display: "flex" }}>
                    <p>
                      {startDate} to {endDate}
                    </p>
                  </div>
                  <p style={{ marginTop: "-10px" }}>{degreeDesc}</p>
                </div>
                <div style={collegeFormShow} className="profileForm">
                  <input
                    type="text"
                    className="form-control"
                    name="uniName"
                    value={uniName}
                    onChange={this.handelUniData}
                    placeholder="Enter College Name"
                  />
                  <h5 className="mt-3">Time Period</h5>
                  <p>Start Date</p>
                  <input
                    type="date"
                    className="form-control"
                    name="startDate"
                    value={startDate}
                    onChange={this.handelUniData}
                  />
                  <p className=" mt-3">End Date</p>
                  <input
                    type="date"
                    className="form-control "
                    name="endDate"
                    value={endDate}
                    onChange={this.handelUniData}
                  />
                  <input
                    type="text"
                    className="form-control mt-3"
                    name="degreeDesc"
                    value={degreeDesc}
                    onChange={this.handelUniData}
                    placeholder="Enter Degree Description"
                  />

                  <button
                    className="btn-hover1 color-10"
                    onClick={this.handelCollegeSave}
                    style={{ float: "right" }}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Work;

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

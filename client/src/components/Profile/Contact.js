import React, { Component } from "react";

import "./Profile.css";
import { Link } from "react-router-dom";
import { contactPost } from "../../services/contact";
import { contactGet } from "../../services/contact";
import { deCodeId } from "../../services/userId";
import SearchBar from "../Timline/SearchBar";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "react-bootstrap/Alert";
import LogoutDropdown from "../Timline/LogoutDropdown";

class Contact extends Component {
  state = {
    contact: "block",
    contactForm: "none",
    loading: false,
    data: {
      mobile: "",
      facebook: "",
      insta: "",
    },
    alertShow: false,

    getData: {
      mobile: "",
      facebook: "",
      insta: "",
    },
  };
  componentDidMount() {
    this.fetchContactData();
  }

  getContactData = async (e) => {
    let { data } = { ...this.state };
    let currentState = data;

    const { name, value } = e.target;
    currentState[name] = value;
    await this.setState({ data: currentState });
  };

  fetchContactData = async () => {
    let userId = await deCodeId();
    let id = { userId };
    let data = await contactGet(id);

    let getObject = {
      mobile: data.data.mobile,
      facebook: data.data.facebook,
      insta: data.data.instagram,
    };
    await this.setState({ getData: getObject });
  };

  handelContact = () => {
    this.setState({ contact: "none", contactForm: "block" });
  };

  handelContactForm = async () => {
    let { mobile, facebook, insta } = this.state.data;
    let userId = await deCodeId();
    let data = {
      userId: userId,
      mobile: mobile,
      facebook: facebook,
      instagram: insta,
    };
    if (mobile.length < 1 || facebook.length < 1 || insta.length < 1) {
      this.setState({ alertShow: true });
    } else {
      this.setState({ alertShow: false });

      this.setState({ loading: true });
      let result = await contactPost(data);
      let clear = {
        mobile: "",
        facebook: "",
        insta: "",
      };
      this.setState({ data: clear });
      this.setState({ loading: false });

      this.setState({ contact: "block", contactForm: "none" });
    }
  };

  render() {
    let { contact, contactForm } = this.state;
    let { mobile, facebook, insta } = this.state;
    let contactStyle = {
      display: contact,
    };
    let contactFormStyle = {
      display: contactForm,
      marginBottom: "70px",
    };

    return (
      <React.Fragment>
        <div style={{ background: "#100C08", width: "100vw", height: "100%" }}>
          {/* <SearchAppBar/> */}
          <SearchBar />
          <LogoutDropdown />

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

                  <Link
                    to="/contact"
                    style={{ marginTop: "5px" }}
                    className="active"
                  >
                    Contact
                  </Link>

                  <Link to="/place" style={{ marginTop: "5px" }}>
                    Place
                  </Link>
                  <Link to="/work" style={{ marginTop: "5px" }}>
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
                <Alert show={this.state.alertShow} variant="danger">
                  <p>Fill All Fields</p>
                </Alert>
                <div style={this.state.loading ? loadingStyle : unLoadingStyle}>
                  <CircularProgress color="inherit" />
                </div>
                {/* Work Section */}
                <h3>Contact Info</h3>
                <div style={contactStyle}>
                  <span onClick={this.handelContact} style={{ color: "blue" }}>
                    Add Contact Info
                  </span>
                  <h5 className="mt-2">{this.state.getData.mobile}</h5>
                  <h6 style={{ marginTop: "-3px", fontSize: "12px" }}>
                    Mobile
                  </h6>
                  <br />
                  <h3>Social Media Link</h3>
                  <h5 className="mt-2">{this.state.getData.facebook}</h5>
                  <h6 style={{ marginTop: "-3px", fontSize: "12px" }}>
                    Facebook
                  </h6>

                  <h5 className="mt-2">{this.state.getData.insta}</h5>
                  <h6 style={{ marginTop: "-3px", fontSize: "12px" }}>
                    Instagram
                  </h6>
                </div>

                <div style={contactFormStyle} className="profileForm">
                  <input
                    type="text"
                    className="form-control mt-3"
                    name="mobile"
                    placeholder="Add Mobile Number"
                    value={mobile}
                    onChange={this.getContactData}
                  />

                  <input
                    type="text"
                    className="form-control mt-3"
                    name="facebook"
                    placeholder="Add Facebook Link Here"
                    value={facebook}
                    onChange={this.getContactData}
                  />
                  <input
                    type="text"
                    className="form-control mt-3"
                    name="insta"
                    placeholder="Add Instagram Link Here"
                    value={insta}
                    onChange={this.getContactData}
                  />

                  <button
                    className="btn-hover1 color-10"
                    onClick={this.handelContactForm}
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

export default Contact;

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

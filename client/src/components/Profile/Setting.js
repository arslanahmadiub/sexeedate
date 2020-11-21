import React, { Component } from "react";
import "./Profile.css";
import { Link } from "react-router-dom";
import { updateUserPassword } from "../../services/profile";
import SearchBar from "../Timline/SearchBar";
import { deCodeId } from "../../services/userId";

class Setting extends Component {
  state = {
    UpdatePassword: "",
    update: false,
    alertText: "",
  };

  onChangePassword = async (e) => {
    await this.setState({ UpdatePassword: e.target.value });
  };

  handelPassword = async () => {
    let userId = await deCodeId();
    let passData = {
      userId: userId,
      password: this.state.UpdatePassword,
    };
    if (this.state.UpdatePassword.length < 1) {
      this.setState({ alertText: "Enter Password..." });
      this.setState({ update: true });
    } else {
      this.setState({ alertText: "Your Password is successfully update.." });
      await updateUserPassword(passData);
      this.setState({ update: true, UpdatePassword: "" });
      setTimeout(() => {
        this.setState({ update: false });
      }, 5000);
    }
  };

  render() {
    let { update } = this.state;
    return (
      <React.Fragment>
        <div style={{ background: "#100C08", width: "100vw", height: "100%" }}>
          {/* <SearchAppBar /> */}
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
                  <Link to="/hobies" style={{ marginTop: "5px" }}>
                    Hobies
                  </Link>
                  <Link to="/covid" style={{ marginTop: "5px" }}>
                    Covid Question
                  </Link>
                  <Link
                    to="/setting"
                    style={{ marginTop: "5px" }}
                    className="active"
                  >
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
                {/* update password */}

                <div className="profileForm">
                  <div
                    className="alert alert-primary"
                    role="alert"
                    style={update ? { display: "flex" } : { display: "none" }}
                  >
                    {this.state.alertText}
                  </div>
                  <input
                    type="text"
                    className="form-control mt-3"
                    name="UpdatePassword"
                    value={this.state.UpdatePassword}
                    placeholder="Current Password"
                    onChange={this.onChangePassword}
                  />
                  <input
                    type="text"
                    className="form-control mt-3"
                    name="UpdatePassword"
                    value={this.state.UpdatePassword}
                    placeholder="New Password"
                    onChange={this.onChangePassword}
                  />
                  <input
                    type="text"
                    className="form-control mt-3"
                    name="UpdatePassword"
                    value={this.state.UpdatePassword}
                    placeholder="Confirm New Password"
                    onChange={this.onChangePassword}
                  />

                  <button
                    className="btn-hover1 color-10"
                    onClick={this.handelPassword}
                    style={{ float: "right" }}
                  >
                    Save
                  </button>
                </div>

                {/* Education Section */}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Setting;

import React, { Component } from "react";

import "./Profile.css";
import { Link } from "react-router-dom";
import { placePost } from "../../services/place";
import { placeGet } from "../../services/place";
import { deCodeId } from "../../services/userId";
import SearchAppBar from "../Timline/SearchAppBar";

class Setting extends Component {
  state = {
    UpdatePassword: "",
    update:false
  };

  onChangePassword = async (e) => {
    await this.setState({ UpdatePassword: e.target.value });
  };

  handelPassword = () => {
    console.log(this.state.UpdatePassword);
    this.setState({update:true})
    setTimeout(() => {
    this.setState({update:false})
        
    }, 5000);
  };



  render() {
      let {update} = this.state;
    return (
      <React.Fragment>
        <div style={{ background: "#100C08", width: "100vw", height: "100%" }}>
          <SearchAppBar />
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
                <div class="sidenav">
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
                </div>
              </div>
              <div
                className="col-md-9 profile"
                style={{ padding: "25px", color: "white" }}
              >
                {/* update password */}

                <div className="profileForm">
                  <div className="alert alert-primary" role="alert" style={update ? {display:"flex"}:{display:"none"}}>
                    Your Password is successfully update..
                  </div>
                  <input
                    type="text"
                    className="form-control mt-3"
                    name="UpdatePassword"
                    placeholder="Update Password"
                    onChange={this.onChangePassword}
                  />
                  <button
                    type="button"
                    class="btn btn-success mt-3"
                    style={{ float: "right" }}
                    onClick={this.handelPassword}
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

import React, { Component } from "react";
import { Button, Modal, Alert } from "react-bootstrap";
import { login } from "../services/auth";
import CircularProgress from "@material-ui/core/CircularProgress";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signInShow: this.props.showLog,
      loginErrorShow: false,

      signInData: {
        signInEmail: "",
        signInPassword: "",
      },
      errors: "",
      loginErrors: "",
      errorShow: false,
      loading: false,
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      signInShow: nextProps.showLog,
    });
  }
  showLoginError = () => {
    if (this.state.loginErrorShow) {
      return <Alert variant="warning">{this.state.loginErrors}</Alert>;
    }
  };

  handleSignIn = async () => {
    try {
      const { signInEmail, signInPassword } = this.state.signInData;
      this.setState({ loading: true });
      let data = await login(signInEmail, signInPassword);
      localStorage.setItem("token", data.data);

      let signInData = {
        signInEmail: "",
        signInPassword: "",
      };
      this.setState({
        signInData: signInData,
        loginErrorShow: false,
        signInShow: false,
      });
      window.location = "#/timeline";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        this.setState({ loading: false });

        this.setState({ loginErrorShow: true, loginErrors: ex.response.data });
        console.log(ex.response.data);
      }
    }
  };

  onEnterKeyPress = (e) => {
    if (e.key === "Enter") {
      this.handleSignIn();
    }
  };
  handleSignInChange = async (e) => {
    const { signInData } = { ...this.state };
    const currentState = signInData;
    const { name, value } = e.target;
    currentState[name] = value;

    await this.setState({ signInData: currentState });
  };
  handelForgotPassword = () => {
    this.props.forgot();
  };
  hadelHide = () => {};
  render() {
    const { signInEmail, signInPassword } = this.state.signInData;

    return (
      <Modal
        show={this.state.signInShow}
        onHide={this.props.handel}
        id="loginModel"
      >
        <Modal.Body>
          {this.showLoginError()}
          <div style={this.state.loading ? loadingStyle : unLoadingStyle}>
            <CircularProgress color="inherit" />
          </div>
          <div className="row">
            <div className="col">
              <h4>Sign In Here</h4>
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col">
              <label htmlFor="signInEmail">Email</label>
              <input
                type="email"
                className="form-control"
                value={signInEmail}
                onChange={this.handleSignInChange}
                id="signInEmail"
                name="signInEmail"
                placeholder="Enter Your Email..."
                onKeyDown={this.onEnterKeyPress}
              />
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col">
              <label htmlFor="signInPassword">Password</label>
              <input
                type="password"
                className="form-control"
                value={signInPassword}
                onChange={this.handleSignInChange}
                id="signInPassword"
                name="signInPassword"
                placeholder="Enter Your Password..."
                onKeyDown={this.onEnterKeyPress}
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <p
                style={{ color: "blue", float: "right", cursor: "pointer" }}
                onClick={() => this.props.forgot()}
              >
                Forgot Password?
              </p>
            </div>
          </div>

          <button
            className="btn-hover1 color-10"
            onClick={() => this.handleSignIn()}
            style={{ float: "right", marginTop: "0px" }}
          >
            Login
          </button>
        </Modal.Body>
        {/* <Modal.Footer>
        
        </Modal.Footer> */}
      </Modal>
    );
  }
}

export default Login;

const loadingStyle = {
  zIndex: 50,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "rgba(67.8, 84.7, 90.2, 0.8)",
  width: "100%",
  height: "100%",
  position: "absolute",
  top: "0",
  left: "0",
};

const unLoadingStyle = {
  zIndex: -50,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "rgba(67.8, 84.7, 90.2, 0.8)",
  width: "100%",
  height: "100%",
  position: "absolute",
  top: "0",
  left: "0",
};

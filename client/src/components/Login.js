import React, { Component } from 'react'
import { Button, Modal, Alert } from "react-bootstrap";
import { login } from "../services/auth";



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
     let data= await login(signInEmail, signInPassword);
     localStorage.setItem("token", data.data)
      
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
        this.setState({ loginErrorShow: true, loginErrors: ex.response.data });
        console.log(ex.response.data);
      }
    }
  };

  handleSignInChange = async (e) => {
    const { signInData } = { ...this.state };
    const currentState = signInData;
    const { name, value } = e.target;
    currentState[name] = value;

    await this.setState({ signInData: currentState });
  };
  handelForgotPassword =()=>{
    this.props.forgot()
  }
  hadelHide=()=>{
    
  }
  render() {
    const { signInEmail, signInPassword } = this.state.signInData;

    return (
      <Modal show={this.state.signInShow} onHide={this.props.handel}>
        <Modal.Body>
          {this.showLoginError()}
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
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <p style={{color:"blue", float:"right", cursor:"pointer"}} onClick={()=>this.props.forgot()}>Forgot Password?</p>
          
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
         
          <Button
            className="btn btn-danger"
            style={{background:"#B71C1C"}}

            onClick={() => this.handleSignIn()}
          >
            Login
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default Login



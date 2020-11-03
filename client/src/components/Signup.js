import React, { Component } from 'react'
import { Button, Modal, Alert } from "react-bootstrap";

import { saveUser } from "../services/signup";


class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
        show: this.props.showSign,
        data: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            dob: "",
            gender: "",
          },
          errors: "",
          checkBox:false
    };
  }


  componentWillReceiveProps(nextProps) {
    this.setState({
        show: nextProps.showSign,
    });
  }
  
  handleChange = async (e) => {
    const { data } = { ...this.state };
    const currentState = data;
    const { name, value } = e.target;
    currentState[name] = value;

    await this.setState({ data: currentState });
  };

  handleClose = () => {
    this.setState({ show: false });
  };

  handleSubmit = async () => {
    if(this.state.checkBox){

      try {
        let user = { ...this.state.data };
        let result = await saveUser(user);
  
        let data = {
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          dob: "",
          gender: "",
        };
        this.setState({ data: data, errorShow: false, show: false });
      } catch (ex) {
        if (ex.response && ex.response.status === 400) {
          this.setState({ errorShow: true, errors: ex.response.data });
        }
      }

    }
   
   
 
  };
  showError = () => {
    if (this.state.errorShow) {
      return <Alert variant="warning">{this.state.errors}</Alert>;
    }
  };

  handleCheck = (e)=>{

this.setState({checkBox:e.target.checked})
  }
  render() {
    const { firstName, lastName, email, password, dob } = this.state.data;
 

    return (
      <Modal show={this.state.show}>
        <Modal.Body>
          {this.showError()}
          <div className="row">
            <div className="col">
              <h4>Sign Up Here</h4>
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-6">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                className="form-control"
                value={firstName}
                onChange={this.handleChange}
                id="firstName"
                name="firstName"
                placeholder="Enter First Name"
              />
            </div>
            <div className="col-6">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                className="form-control"
                value={lastName}
                onChange={this.handleChange}
                id="lastName"
                name="lastName"
                placeholder="Enter Last Name"
              />
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={this.handleChange}
                id="email"
                name="email"
                placeholder="Enter Email Here..."
              />
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={this.handleChange}
                id="password"
                name="password"
                placeholder="Enter Password Here..."
              />
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col">
              <label htmlFor="dob">Date of Births</label>
              <input
                type="date"
                className="form-control"
                value={dob}
                onChange={this.handleChange}
                id="dob"
                name="dob"
                placeholder="Enter Mobile Number Here..."
              />
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col">
              <div onChange={this.handleChange}>
                <div className="form-check-inline">
                  <label className="form-check-label">
                    <input
                      type="radio"
                      className="form-check-input"
                      value="Male"
                      name="gender"
                    />
                    Male
                  </label>
                </div>
                <div className="form-check-inline">
                  <label className="form-check-label">
                    <input
                      type="radio"
                      className="form-check-input"
                      value="Female"
                      name="gender"
                    />
                    Female
                  </label>
                </div>
              </div>
            </div>
          </div>
          <br/>
          <div className="form-group form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
              onChange={this.handleCheck}
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
              I agree to the terms and service
            </label>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn btn-danger" onClick={() => this.handleClose()}>
            Close
          </Button>
          <Button
            className="btn btn-success"
            onClick={() => this.handleSubmit()}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default Signup

import React, { Component } from "react";
import logo from "../../images/logo2.svg";
import Slider from "./Slider";
import "./Profile.css";
import {Link} from 'react-router-dom'
import {placePost} from '../../services/place'
import {placeGet} from '../../services/place'
import {deCodeId} from '../../services/userId'
import SearchAppBar from "../Timline/SearchAppBar";

class Place extends Component {
  state={
    workPlace:"block",
    workPlaceForm:"none",

    homeCity:"block",
    homeCityForm:"none",
    homeTown:"",

    currentTown:"",

    fetchHomeTown:"",
    fetchCurrentTown:""

  }
componentDidMount(){
  this.fetchPlaceData()
}

  fetchPlaceData = async( ) =>{
    let id = await deCodeId();
    
    let user ={userId:id}
      let result =await placeGet(user);
    
     await this.setState({fetchHomeTown:result.data.homeTown, fetchCurrentTown:result.data.currentCity})
  
  }

  handelWorkPlace =()=>{
    this.setState({workPlace:"none", workPlaceForm:"block"})
  }
  handelCurrentWorkPlace =async()=>{
 
    let id =await deCodeId()
    let data ={
      userId: id,
      homeTown: this.state.fetchHomeTown,
      currentCity:this.state.currentTown

    }
    let result =await placePost(data);
    this.setState({workPlace:"block", workPlaceForm:"none"})
    this.fetchPlaceData()
  }
  handelHomeTown =()=>{
    this.setState({homeCity:"none", homeCityForm:"block"})
  }
  handelHomeTownForm=async ()=>{
    
    let id =await deCodeId()
    let data ={
      userId: id,
      homeTown: this.state.homeTown,
      currentCity:this.state.fetchCurrentTown

    }
    let result =await placePost(data);
    this.setState({homeCity:"block", homeCityForm:"none"})

    this.fetchPlaceData()
  }

  postPlaceData = async( ) =>{
    
  }

  onChangeCity =async (e) =>{
   await this.setState({[e.target.name]:e.target.value});


  }

  render() {
    const {workPlace,workPlaceForm,homeCity,homeCityForm,fetchCurrentTown, fetchHomeTown} = this.state;
    let workStyle={
      display:workPlace
    }
    let wrokFormStyle ={
      display:workPlaceForm,
      marginBottom:"70px"
    }
    let homeStyle={
      display:homeCity
    }
    let homeFormStyle ={
      display:homeCityForm,
    
    }


    return (
      <React.Fragment>
        <div style={{ background: "#100C08", width: "100vw", height: "100%" }}>
          <SearchAppBar/>
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
                  
                <Link
                    to="/basicinfo"
                    style={{ marginTop: "5px" }}
                   
                  >
                    Basic Info
                  </Link>
            

                <Link
                    to="/contact"
                    style={{ marginTop: "5px" }}
                   
                  >
                    Contact
                  </Link>
                 
                  <Link to="/place" style={{ marginTop: "5px" }} className="active">
                    Place
                  </Link>
                  <Link to="/work" style={{ marginTop: "5px" }}>
                    Work and Education
                  </Link>
                  <Link to="/hobies" style={{ marginTop: "5px" }}   >
                   Hobies
                  </Link>
                  <Link
                    to="/covid"
                    style={{ marginTop: "5px" }}
                    
                  >
                    Covid Question
                  </Link>
                </div>
              </div>
              <div className="col-md-9 profile" style={{ padding: "25px", color:"white" }}>

                {/* Work Section */}
                <h3>Current Place</h3>
                <div style={workStyle}>
                  <span onClick={this.handelWorkPlace}>
                    Add Current Workplace
                  </span>
                  <h5 className="mt-2">
                    {fetchCurrentTown}
                  </h5>

                  <h6 style={{ marginTop: "-3px", fontSize: "12px" }}>
                    Current City
                  </h6>
                </div>

                <div style={wrokFormStyle} className="profileForm">
                  <input
                    type="text"
                    className="form-control mt-3"
                    name="currentTown"
                    placeholder="Add Current Work Place"
                    onChange={this.onChangeCity}
                  />
                  <button
                    type="button"
                    class="btn btn-success mt-3"
                    style={{ float: "right" }}
                    onClick={this.handelCurrentWorkPlace}
                  >
                    Save
                  </button>
                </div>

                {/* Education Section */}
                <hr />
                <br />
                <h3>Home Town</h3>
                <div style={homeStyle}>
                  <span onClick={this.handelHomeTown}>Add Home Town</span>
                  <h5 className="mt-2">
                    {fetchHomeTown}
                  </h5>

                  <h6 style={{ marginTop: "-3px", fontSize: "12px" }}>
                    Home Town
                  </h6>
                </div>
                <div style={homeFormStyle} className="profileForm">
                  <input
                    type="text"
                    className="form-control mt-3"
                    name="homeTown"
                    onChange={this.onChangeCity}

                    placeholder="Add Home Town"
                  />
                  <button
                    type="button"
                    class="btn btn-success mt-3"
                    style={{ float: "right" }}
                    onClick={this.handelHomeTownForm}
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

export default Place;

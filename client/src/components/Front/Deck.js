import React, { Component } from "react";
import Card from "./Card";
import "./Deck.css";

import Swiper from "swiper/bundle";
import "swiper/swiper-bundle.css";
import EventCard from "./EventCard";
import SearchAppBar from "../Timline/SearchAppBar";
import { deCodeId } from "../../services/userId";
import { matchGet } from "../../services/matching";
import { getUserGender } from "../../services/profile";
let { AgeFromDateString, AgeFromDate } = require("age-calculator");

class Deck extends Component {
  state = {
    userId: "",
    data:[],
    gender:""
  };

 async componentDidMount() {
  
    await this.getCurrentUser();
    await this.fetchMatchingData();
    this.Swiper = new Swiper(".swiper-container", {
      effect: "coverflow",
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: "auto",
      coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: false,
      },
      pagination: {
        el: ".swiper-pagination",
      },
    });
  }
  handelClick = (e) => {
    console.log(e);
  };


  getCurrentUser = async () => {
    let result = await deCodeId();
    let userId ={userId:result}
    let {data}=await getUserGender(userId)
    
  await  this.setState({ userId: result , gender:data});
 
  };

  fetchMatchingData = async () => {
    let id = {
      userId: this.state.userId,
      gender:this.state.gender
    };
    let { data } = await matchGet(id);
  
   await this.setState({data})
   
  };

  getAge = (data) => {
    let ageFromString = new AgeFromDateString(data).age;
  return ageFromString
  };
  render() {
    return (
      <React.Fragment>
        <div
          className="mt-4"
          style={{ width: "100vw", height: "100vh", overflow: "auto" }}
        >
          <SearchAppBar />
          <div className="swiper-container" style={{ marginTop: "12vh" }}>
            <div className="swiper-wrapper">


            {this.state.data.map((item, index) => {
                return (
                  <div className="swiper-slide " key={index}>
                    <Card id={item._id} images={item.Detail.userImages} name={item.fullName} age={this.getAge(item.dob)} video={item.Detail.video.image_url} bio ={item.Detail.bio} />
                  </div>
                );
              })}

            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Deck;

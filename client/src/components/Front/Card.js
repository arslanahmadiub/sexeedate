import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Slider from "./Slider";
import FavoriteIcon from '@material-ui/icons/Favorite';
import IconButton from '@material-ui/core/IconButton';
import MessageIcon from '@material-ui/icons/Message';
import ShowMoreText  from 'react-show-more-text';
class Card extends Component {
  render() {
    return (
      <div className="card w-100" style={{border:"3px solid #B71C1C"}}>
        <div>
          <Slider id={this.props.id} images={this.props.images}  video ={this.props.video} />
        </div>

        <div className="card-body">
        <h5 className="card-title">{this.props.name}</h5>
          <h6 className="card-title">{this.props.age} Years </h6>

          <p className="card-text" style={{ textAlign: "justify", lineHeight:"1.2em" }}>
           {this.props.bio}
          </p>
      
          <div style={{display:"flex", justifyContent:"space-around"}}>
          <IconButton  component="span" >
         <FavoriteIcon style={{color:"#BA1D1D", width:"3rem", height:"3rem", padding:"0px"}}/>
         </IconButton>
          <IconButton  component="span">
         <MessageIcon style={{color:"#BA1D1D", width:"3rem", height:"3rem", padding:"0px"}}/>
         </IconButton>
         </div>
        </div>
      </div>
    );
  }
}

export default Card;

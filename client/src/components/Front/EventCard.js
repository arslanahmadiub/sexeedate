import React, { Component } from 'react'

 class EventCard extends Component {
    render() {
        return (
            <div className="card" style={{ width: "35rem" }}>
            <div>
              
            </div>
            <div className="card-body" style={this.props.style}>
              <h5 className="card-title">Bella Hadid </h5>
              <h6 className="card-title">30 Years </h6>
              <p className="card-text" style={{ textAlign: "justify" }}>
           I am available on 15/09/20....
              </p>
              <div className="row  ">
                <div className="col-4 d-flex justify-content-center">
                  <i
                    className="material-icons"
                    style={{ color: "red", fontSize: "40px" }}
                  >
                    thumb_up
                  </i>
                </div>
                <div className="col-4 d-flex justify-content-center">
                  <i
                    className="material-icons"
                    style={{ color: "red", fontSize: "40px" }}
                  >
                    thumb_down
                  </i>
                </div>
                <div className="col-4 d-flex justify-content-center">
                  <i
                    className="material-icons"
                    style={{ color: "red", fontSize: "40px" }}
                  >
                    chat
                  </i>
                </div>
              </div>
            </div>
          </div>
        )
    }
}

export default EventCard

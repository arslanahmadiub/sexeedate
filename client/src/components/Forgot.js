import React from 'react'
import {Button   } from "@material-ui/core";

function Forgot() {
    return (
      <React.Fragment>
          <div style={{display:"flex",  alignItems:"center", width:"100vw", height:"100vh", overflow:"hidden"}}>
            <div className="container" style={{padding:"20vw"}}>
          <div className="row">
            <div className="col-12">
              <label htmlFor="password" className="form-label">
               Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter Your New Password"
              />
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-12">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                placeholder="Enter Password Again"
              />
            </div>
          </div>
       
          <div className="row mt-4">
            <div className="col-12">
            <Button variant="outlined" color="secondary" style={{float:"right"}}>
                Reset Password
              </Button>
            </div>
          </div>
          </div>
          </div>
      </React.Fragment>
    )
}

export default Forgot

import React,{useEffect} from 'react'
import {Route, Redirect} from 'react-router-dom'


const ProtectedRoute = ({path, component:Component, render, ...rest})=> {


    return (
        <Route
              exact
              path={path}
              {...rest}
              render={(props) => {
                if (localStorage.getItem("token")===null) {
                  return <Redirect to="/" />;
                }
                return Component ? <Component {...props} />:render(props);
              }}
            />
    )
}

export default ProtectedRoute

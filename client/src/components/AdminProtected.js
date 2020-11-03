import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { currentUser } from "../services/profile";
import {useSelector} from 'react-redux'

const AdminProtected = ({ path, component: Component, render, ...rest }) => {

  const users = useSelector(state => state.userId.users[0])

  
  return (
    <Route
      exact
      path={path}
      {...rest}
      render={(props) => {
        if (users && users.role!=="Admin") {
          return <Redirect to="/" />;
        }
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

export default AdminProtected;

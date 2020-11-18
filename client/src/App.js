import React from "react";

import {
  Route,
  Switch,
  BrowserRouter as Router,
  Redirect,
  HashRouter,
} from "react-router-dom";
import Home from "./components/Home/Home";
import Main from "./components/Main";
import Chat from "./components/Chat/Chat";

import Slider from "./components/Profile/Slider";
import Deck from "./components/Front/Deck";

import "./custom.scss";
import Work from "./components/Profile/Work";
import Place from "./components/Profile/Place";
import Contact from "./components/Profile/Contact";
import Covid from "./components/Profile/Covid";
import Admin from "./components/Admin/Admin";
import Post from "./components/Admin/Post";
import Verification from "./components/Admin/Verification";
import Timeline from "./components/Timline/Timeline";
import Register from "./components/Register";
import Forgot from "./components/Forgot";
import Term from "./components/Term";
import Hobies from "./components/Profile/Hobies";
import Basic from "./components/Profile/Basic";
import Dob from "./components/Dob";
import GenderSelection from "./components/GenderSelection";
import Chatbox from "./components/Timline/Chatbox";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminProtected from "./components/AdminProtected";
import {Provider} from 'react-redux'
import store from './store'
import Setting from "./components/Profile/Setting";
import ProUser from "./components/Profile/ProUser";
import Packages from "./components/Admin/Packages";





function App() {
  return (
    <Provider store={store}>
    <HashRouter>
      <Switch>

        <Route
          exact
          path="/"
          render={(props) => {
            if (localStorage.getItem("token") === null) {
              return <Home {...props}/>;
            }
            return <Timeline {...props}/>;
          }}
        />

        <Route exact path="/main" component={Main} />
        <ProtectedRoute exact path="/chat" component={Chat} />
        <ProtectedRoute exact path="/work" component={Work} />
        <ProtectedRoute exact path="/place" component={Place} />
        <ProtectedRoute exact path="/hobies" component={Hobies} />
        <ProtectedRoute exact path="/contact" component={Contact} />
        <ProtectedRoute exact path="/basicinfo" component={Basic} />
        <ProtectedRoute exact path="/payment" component={ProUser} />
        <ProtectedRoute exact path="/setting" component={Setting} />
        <ProtectedRoute exact path="/covid" component={Covid} />
        <ProtectedRoute exact path="/slider" component={Slider} />
        <ProtectedRoute exact path="/home" component={Deck} />
        <AdminProtected exact path="/admin" component={Admin} />
        <AdminProtected exact path="/admin/user" component={Admin} />
        <AdminProtected exact path="/admin/post" component={Post} />
        <AdminProtected exact path="/admin/verify" component={Verification} />
        <AdminProtected exact path="/admin/package" component={Packages} />

        <ProtectedRoute path="/timeline" component={Timeline} />

        <Route exact path="/register" component={Register} />
        <Route exact path="/forgot" component={Forgot} />
        <Route exact path="/term" component={Term} />
        <Route exact path="/dob" component={Dob} />
        <Route exact path="/gender" component={GenderSelection} />
        <Route exact path="/chatBox" component={Chatbox} />

        {/* <Route component={Home} /> */}
      </Switch>
    </HashRouter>
    </Provider>
  )
}

export default App

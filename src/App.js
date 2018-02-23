import React, { Component } from "react";
import { Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Landing from "./components/Landing/Landing";
import SignUp from "./components/SignUp/SignUp";
import Login from "./components/Login/Login";
import Profile from "./components/Profile/Profile";
import SlackKey from "./components/SlackKey/SlackKey.js";
import Dashboard from "./components/Dashboard/Dashboard";
import FlagPage from "./components/FlagPage/FlagContainer";
import Staff from "./components/Pages/Staff";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Route exact path="/" component={Landing} />
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={Login} />
        <Route path="/user/:username" component={Profile} />
        <Route path="/slack" component={SlackKey} />
        <Route path="/myaccount" component={Dashboard} />
        <Route path="/flags" component={FlagPage} />
        <Route exact path="/staff" component={Staff} />
        <Footer />
      </div>
    );
  }
}

export default App;

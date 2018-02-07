import React, { Component } from "react";
import { Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Landing from "./components/Landing/Landing";
import SignUp from "./components/SignUp/SignUp";
import Login from "./components/Login/Login";
import Profile from "./components/Profile/Profile";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Route exact path="/" component={Landing} />
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={Login} />
        <Route path="/user/:username" component={Profile} />
        <Footer />
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import {Link} from "react-router-dom";
import SubscribeForm from "./SubscribeForm";

class Footer extends Component {

  state = {
    email: ""
  }

  handleOnChange(e) {
    this.setState({
      email: e.target.value
    })
  }

  handleSubmit(e){
    e.preventDefault();
    //Do something with the state.
    document.getElementById("footerSubscribe").reset();
  }

  renderLinkBoxes(){
    return [
    <div key="1" className="footer-linkbox">
      <div className="footer-subtitle">Contact Us</div>
      {/*<div className="footer-link">+44 345 678 903</div>*/}
      <a className="footer-link" href="mailto:admin@chingu.io">admin@chingu.io</a>
    </div>,
    <div key="2" className="footer-linkbox">
      <div className="footer-subtitle">Company</div>
      <a className="footer-link" href="/">Contact Us</a>
      <Link className="footer-link" to="/staff">Staff</Link>
      <a className="footer-link" href="/">Press</a>
      <a className="footer-link" href="/privacy">Privacy Policy</a>
      <Link className="footer-link" to="/companyfaq">FAQ</Link>
    </div>,
    <div key="3" className="footer-linkbox">
      <div className="footer-subtitle">Programs</div>
      <Link className="footer-link" to="/programfaq">FAQ</Link>
      <a className="footer-link" href="/">Cohorts</a>
      <a className="footer-link" href="https://docs.google.com/forms/d/e/1FAIpQLSe7eeorRF3kWj98X9Q342VrQdriGoDoBfu6ELOEeDuxrQ2wgw/viewform">Application</a>
    </div>
    ];
  }

  renderSocialIcons(){
    return (
      <div className="footer-social">
        <a className="footer-social-icon" href="https://medium.com/chingu"><i className="fab fa-medium-m fa-2x"></i></a>
        <a className="footer-social-icon" href="https://www.patreon.com/user?u=4763160"><i className="fab fa-patreon fa-2x"></i></a>
        <a className="footer-social-icon" href="https://www.youtube.com/channel/UCS7zmJXbe7FgTC3sHlUf4jw"><i className="fab fa-youtube fa-2x"></i></a>
        <a className="footer-social-icon" href="https://github.com/Chingu-cohorts"><i className="fab fa-github fa-2x"></i></a>
        <a className="footer-social-icon" href="https://twitter.com/ChinguCollabs"><i className="fab fa-twitter fa-2x"></i></a>
      </div>
    );
  }

  renderDesktopFooter(){
    return(
      <div className="footer">
        {this.renderLinkBoxes()}
        <SubscribeForm onSubmit={(e) => this.handleSubmit(e)} onChange={e => this.handleOnChange(e)}/>
        {this.renderSocialIcons()}
      </div>
    );
  }

  renderMobileFooter(){
    return(
      <div className="footer">
        <SubscribeForm onSubmit={(e) => this.handleSubmit(e)} onChange={e => this.handleOnChange(e)}/>
        {this.renderSocialIcons()}
      </div>
    )
  }
render(){
  return (
    <div className="footer-wrapper">
      <div className="footer-desktop">{this.renderDesktopFooter()}</div>
      <div className="footer-mobile">{this.renderMobileFooter()}</div>
    </div>
  );
}
}

export default Footer;
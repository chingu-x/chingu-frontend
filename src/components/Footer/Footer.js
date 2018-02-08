import React, { Component } from 'react';
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
      <div className="footer-link">+44 345 678 903</div>
      <a className="footer-link" href="/">email@example.com</a>
    </div>,
    <div key="2" className="footer-linkbox">
      <div className="footer-subtitle">Company</div>
      <a className="footer-link" href="/">Contact Us</a>
      <a className="footer-link" href="/">Staff</a>
      <a className="footer-link" href="/">Press</a>
      <a className="footer-link" href="/">Privacy Policy</a>
      <a className="footer-link" href="/">FAQ</a>
    </div>,
    <div key="3" className="footer-linkbox">
      <div className="footer-subtitle">Programs</div>
      <a className="footer-link" href="/">FAQ</a>
      <a className="footer-link" href="/">Cohorts</a>
      <a className="footer-link" href="/">Application</a>
    </div>
    ];
  }

  renderSocialIcons(){
    return (
      <div className="footer-social">
        <a className="footer-social-icon" href="/"><i className="fab fa-facebook fa-2x"></i></a>
        <a className="footer-social-icon" href="/"><i className="fab fa-instagram fa-2x"></i></a>
        <a className="footer-social-icon" href="/"><i className="fab fa-github fa-2x"></i></a>
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
  console.log(process.env.REACT_APP_CLIENT_SECRET)
  return (
    <div className="footer-wrapper">
      <div className="footer-desktop">{this.renderDesktopFooter()}</div>
      <div className="footer-mobile">{this.renderMobileFooter()}</div>
    </div>
  );
}
}

export default Footer;
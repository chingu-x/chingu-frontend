import React, { Component } from 'react';

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
render(){
  return (
    <div className="footer">
      <div className="footer-linkbox">
        <div className="footer-subtitle">Contact Us</div>
        <div className="footer-link">+44 345 678 903</div>
        <a className="footer-link" href="">email@example.com</a>
      </div>
      <div className="footer-linkbox">
        <div className="footer-subtitle">Company</div>
        <a className="footer-link" href="">Contact Us</a>
        <a className="footer-link" href="">Staff</a>
        <a className="footer-link" href="">Press</a>
        <a className="footer-link" href="">Privacy Policy</a>
        <a className="footer-link" href="">FAQ</a>
      </div>
      <div className="footer-linkbox">
        <div className="footer-subtitle">Programs</div>
        <a className="footer-link" href="">FAQ</a>
        <a className="footer-link" href="">Cohorts</a>
        <a className="footer-link" href="">Application</a>
      </div>
        <div className="footer-subscribe">
          <div className="footer-subscribe-subtitle">Subscribe to Chingu via Email</div>
          <div className="footer-subscribe-lower">
            <form id="footerSubscribe" onSubmit={(e) => this.handleSubmit(e)}>
            <input disabled type="text" className="footer-subscribe-input" name="email" placeholder="Email Address" onChange={e => this.handleOnChange(e)}/>
            <button type="submit" className="subscribeBtn">Subscribe</button>
            </form>
          </div>
        </div>
        <div className="footer-social">
          <a className="footer-social-icon" href="/"><i className="fab fa-facebook fa-2x"></i></a>
          <a className="footer-social-icon" href="/"><i className="fab fa-instagram fa-2x"></i></a>
          <a className="footer-social-icon" href="/"><i className="fab fa-github fa-2x"></i></a>
        </div>
    </div>
  );
}
}

export default Footer;
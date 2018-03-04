import React from "react";

const Subscribe = props => {
  return (
    <div className="footer-subscribe">
      <div className="footer-subscribe-subtitle">
        Subscribe to Chingu via Email
      </div>
      <div className="footer-subscribe-lower">
        <form onSubmit={props.onSubmit}>
          <input
            disabled
            type="text"
            className="footer-subscribe-input"
            name="email"
            placeholder="Email Address"
            onChange={props.onChange}
          />
          <button disabled type="submit" className="subscribeBtn">
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default Subscribe;

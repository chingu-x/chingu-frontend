import * as React from "react";
import './Ticketbox.css';

const Ticketbox = () => {
  return (
    <div className="ticketbox-container">
      <img
        className="ticketbox-btn--main"
        alt="help"
        src={require('../../assets/icons8-help-96.png')} />
    </div>
  )
}

export default Ticketbox;
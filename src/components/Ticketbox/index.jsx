import * as React from "react";
import './Ticketbox.css';
import Modal from "../common/Modal";

const Ticketbox = () => {
  return (
    <Modal 
      open 
      persist 
      background="none"
    >
      <div className="ticketbox-container">
        <div
          className="ticketbox-btn--main"
        >?</div>
      </div>
    </Modal>
  )
}

export default Ticketbox;
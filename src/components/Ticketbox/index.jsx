import * as React from "react";
import './Ticketbox.css';
import Modal from "../common/Modal";

class Ticketbox extends React.Component {
  render() {
    return (
      <Modal
        open
        persist
        background="none"
      >
        <div className="ticketbox-container">
          <div className="ticketbox-btn--main">?</div>
          <Modal
            open
            persist
            background="none"
          >
            <div className="ticketbox-subcontainer">
              <TicketboxButtons />
            </div>
          </Modal>
        </div>
      </Modal>
    )
  }

}

const TicketboxButtons = () => {
  let assets = [
    'Artboard 2.png',
    'Artboard 3.png',
    'Artboard 4.png'
  ];
  let labels = ['Suggestion', 'Bug', 'Help'];
  return (
    <div className="ticketbox-btn-section">
      {
        labels.map((text, idx) => {
          return (
            <div key={idx} className="ticketbox-btn--container">
              <img
                className="ticketbox-btn"
                alt="ticketbox-btn"
                src={require(`../../assets/${assets[idx]}`)}
              />
              <div className="ticketbox-btn--text">{text}</div>
            </div>
          )
        })
      }
    </div>
  )
}

export default Ticketbox;
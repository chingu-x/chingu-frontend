import * as React from "react";
import PropTypes from "prop-types";
import './Ticketbox.css';
import HelpRequest from './components/HelpRequest';
import PopupMenu from "../utilities/PopupMenu"
import RequestList from './components/RequestList'
import { BugSuggestion } from './components/Feedback';

class TicketboxPopup extends React.Component {
  state = { type: null }

  switchRenderedType = (type) => this.setState({ type });

  renderTicketForm = (type) => {
    switch (type) {
      case 'suggestion':
      case 'bug':
        return <BugSuggestion switchRenderedType={this.switchRenderedType} category={type} />;
      case 'help':
        return <HelpRequest switchRenderedType={this.switchRenderedType} />;
      case 'your tickets':
        return <RequestList switchRenderedType={this.switchRenderedType} />;
      default:
        return <TicketboxButtons switchRenderedType={this.switchRenderedType} />
    }
  }

  render() {
    return (
      <div className="ticketbox-subcontainer">
        {this.renderTicketForm(this.state.type)}
      </div>
    )
  }
};

const TicketboxButtons = ({ switchRenderedType }) => {
  let assets = [
    'Artboard 2.png',
    'Artboard 3.png',
    'Artboard 4.png',
    'Tickets.png', // todo: needs icon
  ];
  let labels = [
    'suggestion', 
    'bug', 
    'help',
    'your tickets'
  ];
  return (
    <div className="ticketbox-btn-section">
      {
        labels.map((text, idx) => {
          return (
            <div key={idx} onClick={(e) => switchRenderedType(text)} className="ticketbox-btn--container">
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
};

TicketboxButtons.propTypes = {
  switchRenderedType: PropTypes.func.isRequired,
};

// Disable TicketBox on HepPage for non-auth users
export default () => localStorage.token
  ? (
      <PopupMenu className="ticketbox-container">
        <div className="ticketbox-btn--main">?</div>
        <TicketboxPopup />
      </PopupMenu>
    )
  : null; // only render if the user is logged in

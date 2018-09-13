import * as React from "react";
import { withRouter } from "react-router-dom"
import PopupMenu from "../utilities/PopupMenu"
import Help from './components/Help/';
import BugSuggestion from './components/BugSuggestion';
import './Ticketbox.css';

class TicketboxPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: ''
    }
  }

  componentDidMount() {
    !localStorage.token && this.switchRenderedType("help")
  }

  switchRenderedType = (type) => {
    this.setState({ type })
  }

  renderTicketForm = (type) => {
    switch (type) {
      case 'suggestion':
      case 'bug':
        return <BugSuggestion switchRenderedType={this.switchRenderedType} category={type} />
      case 'help':
        return <Help switchRenderedType={this.switchRenderedType} category={type} />
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
}

const TicketboxButtons = ({ switchRenderedType }) => {
  let assets = [
    'Artboard 2.png',
    'Artboard 3.png',
    'Artboard 4.png'
  ];
  let labels = ['suggestion', 'bug', 'help'];
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
}

// Disable TicketBox on HepPage for non-auth users
export default withRouter(({ location }) =>
  location.pathname !== "/help" &&
  <PopupMenu className="ticketbox-container">
    <div className="ticketbox-btn--main">?</div>
    <TicketboxPopup />
  </PopupMenu>
);

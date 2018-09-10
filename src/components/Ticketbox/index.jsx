import * as React from "react";
import './Ticketbox.css';
import Modal from "../common/Modal";
import PopupMenu from "../utilities/PopupMenu"
import BugSuggestion from './components/BugSuggestion';

class Ticketbox extends React.Component {
  constructor(props) {
    super(props);
    // this.ticketboxRef = React.createRef();
    this.state = {
      type: ''
    }
  }

  // toggleModal = (e) => {
  //   let ticketbox = this.ticketboxRef.current;
  //   ticketbox.toggle();
  //   !ticketbox.state.show && this.setState({ type: '' })
  // }

  switchRenderedType = (type) => {
    this.setState({ type })
  }

  renderTicketForm = (type) => {
    switch (type) {
      case 'suggestion':
      case 'bug':
        return <BugSuggestion switchRenderedType={this.switchRenderedType} category={type} />
      case 'help':
        break;
      default:
        return <TicketboxButtons switchRenderedType={this.switchRenderedType} />
    }
  }

  render() {
    let { type } = this.state;
    return (
      // <Modal
      //   open
      //   persist
      //   background="none"
      // >
      //   <div className="ticketbox-container">
      //     <div onClick={(e) => this.toggleModal(e)} className="ticketbox-btn--main">?</div>
      //     <Modal
      //       ref={this.ticketboxRef}
      //       background="none"
      //     >
      //       <div className="ticketbox-subcontainer">
      //         {this.renderTicketForm(type)}
      //       </div>
      //     </Modal>
      //   </div>
      // </Modal >

      <PopupMenu className="ticketbox-container">
        <div className="ticketbox-btn--main">?</div>
        <div className="ticketbox-subcontainer">
          {this.renderTicketForm(type)}
        </div>
      </PopupMenu>
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


export default Ticketbox;
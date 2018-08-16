import React from "react"
import ReactDOM from "react-dom";

// export default ({children, onModalClick}) => 
//   ReactDOM.createPortal(
//     <div className="modal" onClick={onModalClick}>{children}</div>, 
//     document.querySelector("#modal-root")
//   )

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = { show: false }
  }

  open = () => this.setState({ show: true })
  close = () => this.setState({ show: false })
  
  render() {
    console.log(this.state.show ? "opening modal" : "closing modal")
    console.log(this.props.children)
    return this.state.show &&
    ReactDOM.createPortal(
      <div className="modal" onClick={this.props.onModalClick}>
        {/* <div className="modal-child">{this.props.children}</div> */}
        { this.props.children }
      </div>, 
      document.querySelector("#modal-root")
    )
  }
}
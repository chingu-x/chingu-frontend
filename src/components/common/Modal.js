import React from "react"
import ReactDOM from "react-dom";

// -- USAGE -- //
/*
render <Modal open={BOOL} onModalClick={HANDLER} background={BACKGROUND_COLOR} ref={REF_NAME}/>
Use this.refs.REF_NAME.open or .close in parent component methods

onModalClick is optionsl. By default closes modal
background is optional. Default is transparent
open is optional. Default is false
 */

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = { show: false }
  }

  componentDidMount() {
    this.props.open && this.open()
  }

  open = () => this.setState({ show: true })
  close = () => this.setState({ show: false })
  
  render() {
    console.log(this.props)
    return this.state.show &&
    ReactDOM.createPortal(
      <div
        onClick={this.props.onModalClick || this.close}
        className={`modal ${this.props.background || ""}`} 
      >
        { this.props.children }
      </div>, 
      document.querySelector("#modal-root")
    )
  }
}
import React from "react"
import ReactDOM from "react-dom";

// -- USAGE -- //
/*
render <Modal 
  ref={REF_NAME}
  onModalClick={HANDLER} 
  open={BOOL} 
  persist={BOOL}
  background={BACKGROUND_COLOR} 
  />
Use this.refs.REF_NAME.open or .close in parent component methods

open opens modal on mount. Default false. 
persist keeps modal on background click. Default is false. Overriden by onModalClick (// TODO FIXME)
onModalClick enables aditional functionality beyond closing. Default closes modal
background is transparent by default. 

// TODO Add z-index classes to show in front of / behind header
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
        onClick={!!this.props.onModalClick || this.props.persist ? this.props.onModalClick : this.close}
        className={`modal ${this.props.background || ""}`} 
      >
        { this.props.children }
      </div>, 
      document.querySelector("#modal-root")
    )
  }
}
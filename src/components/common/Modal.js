import React from "react"
import ReactDOM from "react-dom";

// -- USAGE -- //
/*
render <Modal 
  ref={REF_NAME}
  onModalClick={HANDLER} 
  open={BOOL} 
  persist={BOOL}
  background={BACKGROUND_OPACITY} options: opaque / transparent 
  />
Use this.refs.REF_NAME.open or .close in parent component methods

open opens modal on mount. Default false. 
persist keeps modal on background click. Default is false. Overriden by onModalClick (// TODO FIXME)
onModalClick enables aditional functionality beyond closing. Default closes modal
background OPTIONS: transparent/opaque. Default is semitransparent. Use opaque for full screen content blocking and transparetn for dropdowns

// TODO: Add z-index classes to show in front of / behind header
// TODO: Make modals receive component5 props instead of children
 */

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = { show: false }
  }

  componentDidMount() {
    this.props.open && this.open()
  }

  toggle = () => this.state.show ? this.close() : this.open()
  open = () => this.setState({ show: true })
  close = () => this.setState({ show: false })
  
  render() {
    const { background = "semitransparent" } = this.props
    // TODO Listen to events
    return this.state.show &&
    ReactDOM.createPortal(
      <div
        onClick={!!this.props.onModalClick || this.props.persist ? this.props.onModalClick : this.close}
        className={`modal ${background}`}
      >
        { this.props.children }
      </div>, 
      document.querySelector("#modal-root")
    )
  }
}
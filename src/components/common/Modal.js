import React from "react"
import PropTypes from "prop-types"
import ReactDOM from "react-dom";

// -- USAGE -- //
/**
 * render <Modal 
 * ref={REF_NAME}
 * onModalClick={HANDLER} 
 * open={BOOL} 
 * persist={BOOL}
 * background={BACKGROUND} options: none / transparent 
 * />
 *
 * Use this.refs.REF_NAME.open or .close in parent component methods to open/close child modal
 * open opens modal on mount. Default false. 
 * persist keeps modal open on background click. Default is false. Overriden by onModalClick // TODO: FIXME
 * onModalClick enables parent to add functionality beyond just closing the child modal. Default closes modal
 * background OPTIONS: none/transparent. Default is solid white. 
 * 
 * // TODO: Make modals receive component prop instead of children
 */

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = { show: false }
  }

  static propTypes = {
    open: PropTypes.bool,
    persist: PropTypes.bool,
    background: PropTypes.oneOf(["white", "transparent", "none"]),
    onModalClick: PropTypes.oneOfType([PropTypes.func, PropTypes.oneOf([false])])
  }
  
  static defaultProps = {
    open: false,
    persist: false,
    background: "white",
    onModalClick: false
  }

  componentDidMount() {
    this.props.open && this.open()
  }

  toggle = () => this.state.show ? this.close() : this.open()
  open = () => this.setState({ show: true })
  close = () => !this.props.persist && this.setState({ show: false })
  handleModalClick = () => {
    delete localStorage.redirect
    if (!!this.props.onModalClick) this.props.onModalClick()
    else if (!this.props.persist) this.close()
  }
  
  render() {
    const { background } = this.props
    // TODO Listen to events
    return this.state.show &&
    ReactDOM.createPortal(
      <div
        onClick={this.handleModalClick}
        className={`modal ${background}`}
      >
        { this.props.children }
      </div>, 
      document.querySelector("#modal-root")
    )
  }
}
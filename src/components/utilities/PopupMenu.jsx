import React, { Component, Fragment } from "react"
import PropTypes from "prop-types"
import { withRouter } from "react-router-dom"

/**
 * TODO:
 * Use onFocus and onBlur synthetic events instead of eventListeners
 * Add refs to be used by the parent
 * Add optional prop to allow persistence over route changes
 */

class PopupMenu extends Component {
  static propTypes = {
    persist: PropTypes.bool, // Persist over clicks outside of dd menu
    // onMenuClick: PropTypes.func, // TODO:
    control: (props, propName, componentName) => {
      if (props.control && !props.menu) {
        return new Error(`${componentName} requires both 'control' and 'menu' props OR two child elements!`)
      }
    },
    menu: (props, propName, componentName) => {
      if (props.menu && !props.control) {
        return new Error(`${componentName} requires both 'control' and 'menu' props OR two child elements!`)
      }
    },
    children: PropTypes.arrayOf(arrayOfChildren => {
      if (this.control && this.menu && !!arrayOfChildren.length) {
        console.warn(`PopupMenu: 'control' and 'menu' props found. Children will not be used!`)
      }

      if ((!this.control || !this.menu) && arrayOfChildren.length !== 2) {
        return new Error(`PopupMenu requires two child elements - [<control/>, <menu/>]!`)
      }
    })
  }

  static defaultProps = {
    persist: false,
    children: [] // Prevent non-iterable destructure error when providing only one of 'control' and 'menu' props
  }

  state = { show: false }
  // TODO: Create refs in constructor and use with domRef in children - for use by the parent

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClick, false)
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClick, false)
  }

  componentDidUpdate(prevProps) {
    // Close on route change
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.setState({ show: false })
    }
  }

  handleClick = e => {
    const { onMenuClick, persist } = this.props

    // Open DD on control element click 
    if (!this.state.show &&
      this.controlElement.firstChild === e.target) {
      return this.setState({ show: true })
    }

    // Close DD on click outside of menu element  (unless props.persist === true)
    if (
      !persist &&
      !this.menuElement.contains(e.target)) {
      return this.setState({ show: false })
    }
  }

  render() {
    // Get control and menu elements from props or props.children
    let { control, menu } = this.props
    if (!control || !menu) ([control, menu] = this.props.children)

    return (
      <div className={this.props.className}>
        <div ref={el => this.controlElement = el}>{control}</div>
        <div ref={el => this.menuElement = el}>{this.state.show && menu}</div>
      </div>
    )
  }
}

export default withRouter(PopupMenu)
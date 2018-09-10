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
    toggle: (props, propName, componentName) => {
      if (props.toggle && !props.menu) {
        return new Error(`${componentName} requires both 'toggle' and 'menu' props OR two child elements!`)
      }
    },
    menu: (props, propName, componentName) => {
      if (props.menu && !props.toggle) {
        return new Error(`${componentName} requires both 'toggle' and 'menu' props OR two child elements!`)
      }
    },
    children: PropTypes.arrayOf(arrayOfChildren => {
      if (this.toggle && this.menu && !!arrayOfChildren.length) {
        console.warn(`PopupMenu: 'Toggle' and 'menu' props found. Children will not be used!`)
      }

      if ((!this.toggle || !this.menu) && arrayOfChildren.length !== 2) {
        return new Error(`PopupMenu requires two child elements - [<toggle/>, <menu/>]!`)
      }
    })
  }

  static defaultProps = {
    persist: false,
    children: [] // Prevent non-iterable destructure error when providing only one of 'toggle' and 'menu' props
  }

  state = { show: false }
  // TODO: Create refs in constructor and use with domRef in children - for use by the parent

  componentDidMount() {
    document.addEventListener("click", this.handleClick, false)
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClick, false)
  }

  componentDidUpdate(prevProps) {
    // Close on route change
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.setState({ show: false })
    }
  }

  handleClick = e => {
    const { onMenuClick, persist } = this.props

    // Open DD on toggle element click 
    if (!this.state.show &&
      this.toggleElement.firstChild === e.target) {
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
    // Get toggle and menu elements from props or props.children
    let { toggle, menu } = this.props
    if (!toggle || !menu) ([toggle, menu] = this.props.children)

    return (
      <div>
        <div ref={el => this.toggleElement = el}>{toggle}</div>
        <div ref={el => this.menuElement = el}>{this.state.show && menu}</div>
      </div>
    )
  }
}

export default withRouter(PopupMenu)
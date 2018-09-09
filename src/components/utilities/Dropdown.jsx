import React, { Component, Fragment } from "react"
import PropTypes from "prop-types"
import { withRouter } from "react-router-dom"

/**
 * TODO:
 * Use onFocus and onBlur synthetic events instead of global eventListeners
 * Custom error handlers for toggle and menu props
 * Enable optional props to handle parent state
 * Add refs to use by the parent
 * Add option to ersist over route changes
 */

class Dropdown extends Component {
  state = { show: false }

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
    const { onDropdownClick, persist } = this.props

    if (onDropdownClick) {
      return onDropdownClick(e)
    }

    if (!this.state.show &&
      this.dropdownToggle.firstChild === e.target) {
      return this.setState({ show: true })
    }

    if (
      !persist &&
      !this.dropdownMenu.contains(e.target)) {
      return this.setState({ show: false })
    }
  }

  render() {
    // Get toggle and menu elements from props or props.children
    let { toggle, menu } = this.props
    if (!toggle || !menu) ([toggle, menu] = this.props.children)

    return (
      <div>
        <div ref={el => this.dropdownToggle = el}>{toggle}</div>
        <div ref={el => this.dropdownMenu = el}>{this.state.show && menu}</div>
      </div>
    )
  }
}

export default withRouter(Dropdown)
import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types"
import Request from "../utilities/Request"
import Modal from "../common/Modal"
import GithubLoginModal from "../Login/components/GithubLoginModal"
import profileQuery from "../UserProfile/graphql/profileQuery"
import voyagesQuery from "../VoyagePortal/graphql/voyagesQuery"
import userBaseQuery from "./userBaseQuery"
import { client } from "../../index"

class Header extends React.Component {
  state = { showDropdown: false }

  // TODO: Refactor Header methods
  openLoginModal = e => {
    e.stopPropagation()
    this.refs.loginModal.open()
  }

  toggleDropdown = () => {
    this.refs.dropdownModal.toggle()
    this.setState({ showDropdown: !this.state.showDropdown })
  }

  logout = async e => {
    e.preventDefault();
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("store");

    /**
     * TODOS: 
     * Server logout logic
     * Fix 'Store reset while query in flight' error
     */
    this.props.history.replace("/")
    await client.resetStore()
  };

  renderAvatar = avatar => (
    <div className="header-dropdown">
      <img
        onClick={this.toggleDropdown}
        className="avatar"
        src={avatar ? avatar : require('../../assets/blank image.png')} alt="user avatar"
      />

      {
        this.state.showDropdown &&
        <Fragment>
          <div className="header-mask" />
          <div className="header-dropdown-content avatar">
            <Link
              to="/newsfeed"
            >
              Newsfeed
            </Link>

            <Link
              to="/voyage"
              onMouseOver={() => client.query({ query: voyagesQuery })}
            >
              Voyage Portal
            </Link>
            <Link
              to="/projects"
            >
              Project Showcase
            </Link>
            <hr />
            <Link
              to="/profile"
              onMouseOver={() => client.query({ query: profileQuery })}
            >
              User Profile
            </Link>
            <hr />
            <Link to="/" onClick={e => this.logout(e)}>Log out</Link>
          </div>
        </Fragment>
      }
    </div>
  )

  render() {
    this.props.location.pathname === localStorage.redirect && delete localStorage.redirect // Clears the post-login redirect path
    const { user } = this.props.data
    return (
      <Fragment>
        <Modal onModalClick={this.toggleDropdown} background="none" ref="dropdownModal" />
        <Modal ref="loginModal" background="transparent"><GithubLoginModal /></Modal>
        <div
          onClick={this.toggleDropdown}
          className={`header header-dark ${this.state.showDropdown ? "modal-peek" : ""}`}>
          <div className="header-container">
            <div className="header-left">
              <div className="nav-logo">
                <Link className="nav-light" to="/">CHINGU</Link>
              </div>
            </div>
            <div className="header-right">
              {user && this.renderAvatar(user.avatar)}
              {!localStorage.token && !user && <div onClick={this.openLoginModal} className="header-btn">LOG IN</div>}
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}

Header.defaultProps = {
  data: {}
}

export default withRouter(props => (
  !localStorage.token
    ? <Header {...props} />
    : <Request
      {...props}
      component={Header}
      query={userBaseQuery}
    />
)
)
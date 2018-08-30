import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import Request from "../utilities/Request"
import Modal from "../common/Modal"
import GithubLoginModal from "../Login/components/GithubLoginModal"
import profileQuery from "../UserProfile/graphql/profileQuery"
import voyagesQuery from "../VoyagePortal/graphql/voyagesQuery"
import userBaseQuery from "./userBaseQuery"
import { client } from "../../index"

class Header extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      showPortalDropdown: false,
      showUserDropdown: false
    }
  }

  // TODO: Refactor Header methods
  openLoginModal = () => this.refs.loginModal.open()

  closeDropdowns = () => {
    this.refs.dropdownModal.close()
    this.setState({ showPortalDropdown: false, showUserDropdown: false })
  }

  handleUserDropdown = e => {
    e.stopPropagation()
    this.state.showUserDropdown
      ? this.refs.dropdownModal.close()
      : this.refs.dropdownModal.open()

    this.setState({
      showPortalDropdown: false,
      showUserDropdown: !this.state.showUserDropdown
    })
  }

  logout = async e => {
    e.preventDefault();
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("store");

    // TODO: Server logout logic

    this.props.history.replace("/")
    await client.resetStore()
  };

  renderAvatar = avatar => (
    <div className="header-dropdown">
      <img
        onClick={this.handleUserDropdown}
        className="avatar"
        src={avatar ? avatar : require('../../assets/blank image.png')} alt="user avatar"
      />

      {
        this.state.showUserDropdown &&
        <Fragment>
          <div className="header-mask" />
          <div className="header-dropdown-content avatar">
            <Link
              to="/feed"
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
    const isDropdownOpen = this.state.showPortalDropdown || this.state.showUserDropdown
    const { data: { user: { avatar, teams } = {} } = {} } = this.props
    window.location.pathname === localStorage.redirect && delete localStorage.redirect // Clears the post-login redirect path
    return (
      <Fragment>
        <Modal onModalClick={this.closeDropdowns} background="none" ref="dropdownModal" />
        <Modal ref="loginModal" background="transparent"><GithubLoginModal /></Modal>
        <div
          onClick={this.closeDropdowns}
          className={`header header-dark ${isDropdownOpen ? "modal-peek" : ""}`}>
          <div className="header-container">
            <div className="header-left">
              <div className="nav-logo">
                <Link className="nav-light" to="/">CHINGU</Link>
              </div>
            </div>
            <div className="header-right">
              {avatar && this.renderAvatar(avatar)}
              {!localStorage.token && !avatar && <div onClick={this.openLoginModal} className="header-btn">LOG IN</div>}
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
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
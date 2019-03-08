import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { client } from "../../index"
import Request from "../utilities/Request"
import PopupMenu from "../utilities/PopupMenu"
import Modal from "../common/Modal"
import GithubLoginModal from "../Login/components/GithubLoginModal"
import voyagesQuery from "../VoyagePortal/graphql/voyagesQuery"
import userBaseQuery from "./userBaseQuery"

class Header extends React.Component {
  openLoginModal = e => {
    e.stopPropagation()
    this.refs.loginModal.open()
  }

  logout = async e => {
    e.preventDefault();
    window.localStorage.removeItem("token");
    /**
     * TODOS: 
     * Server logout logic
     * Fix 'Store reset while query in flight' error
     */
    this.props.history.replace("/")
    await client.resetStore()
  };

  renderAvatar = avatar => (
    <PopupMenu className="header-dropdown">
      <img
        onClick={this.toggleDropdown}
        className="avatar"
        src={avatar ? avatar : require('../../assets/blank image.png')} alt="user avatar"
        />
      <div className="header-dropdown-content">
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
          // TODO: FIXME Query related error when prefetching while vieweing ProjectShowcase
          // onMouseOver={() => client.query({ query: profileQuery })}
          >
          User Profile
        </Link>
        <hr />
        <Link to="/" onClick={e => this.logout(e)}>Log out</Link>
      </div>
    </PopupMenu>
  )

  render() {
    this.props.location.pathname === localStorage.redirect && delete localStorage.redirect // Clears the post-login redirect path
    const { user } = this.props.data
    return (
      <Fragment>
        
        <Modal 
          ref="loginModal" 
          background="transparent">
          <GithubLoginModal />
        </Modal>
        
        <div className="header header-dark">
          <div className="header-container">
            <div className="header-left">
              <div className="nav-logo">
                <Link className="nav-light" to="/">CHINGU</Link>
              </div>
            </div>
            <div className="header-right">
              {/* FIXME: Temp */}
              {/* {user && this.renderAvatar(user.avatar)}
              {!localStorage.token && !user && <div onClick={this.openLoginModal} className="header-btn">LOG IN</div>} */}
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
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

  handlePortalDropdown = e => {
    e.stopPropagation()
    this.state.showPortalDropdown 
      ? this.refs.dropdownModal.close() 
      : this.refs.dropdownModal.open()
    
      this.setState({ 
      showPortalDropdown: !this.state.showPortalDropdown,
      showUserDropdown: false
     })
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

  renderPortalDropDown = teams => {
    let teamsDOM = null;
    if (teams && teams.length) {
      // TODO: Prefetch teams page
      const teamsList = teams.map((team, index) => <Link key={index} to={"/team/" + team.id}>{team.title}</Link>)
      teamsDOM = (
        <React.Fragment>
          <div className="label">Team Portal</div>
          { teamsList }
          <hr />
        </React.Fragment>
      )
    }

    return (
      <div className="header-dropdown portal">
        <button 
          onClick={this.handlePortalDropdown}
          className="header-portal-btn">
          <span>CHOOSE A PORTAL</span>
          <i className="fa fa-chevron-down" />
        </button>
        {
          this.state.showPortalDropdown && 
          <div className="header-dropdown-content--centered portal">
            {/* {teamsDOM} */}
            <Link 
              to="/feed"
              // onMouseOver={() => client.query({ query: voyagesQuery })}
            >
              Newsfeed
            </Link>
            <hr />

            <Link 
              to="/voyage"
              onMouseOver={() => client.query({ query: voyagesQuery })}
            >
              Voyage Portal
            </Link>
            <hr />
            
            <Link 
              to="/profile"
              onMouseOver={() => client.query({ query: profileQuery })}
            >
              User Profile
            </Link>
          </div>
        }
      </div>
    )
  }

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
            {/* <Link to="/settings">Settings</Link> */}
            <Link to="/" onClick={e => this.logout(e)}>Log out</Link>
          </div>
        </Fragment>
      }
    </div>
  )

  render() {
    const isDropdownOpen = this.state.showPortalDropdown || this.state.showUserDropdown
    const { data: { user: { avatar, teams } = {}} = {}} = this.props
    window.location.pathname === localStorage.redirect && delete localStorage.redirect // Clears the post-login redirect path
    return  (
      <Fragment>
        <Modal onModalClick={this.closeDropdowns} background="none" ref="dropdownModal"/>
        <Modal ref="loginModal" background="transparent"><GithubLoginModal/></Modal>
        <div
          onClick={this.closeDropdowns} 
          className={`header header-dark ${isDropdownOpen ? "modal-peek" : ""}`}>  
          <div className="header-container">
            <div className="header-left">
              <div className="nav-logo">
                <Link className="nav-light" to="/">CHINGU</Link>
              </div>
            </div>

            {teams && this.renderPortalDropDown(teams)}

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
    ? <Header {...props}/>
    : <Request
        {...props} 
        component={Header}
        query={userBaseQuery}
      />
      )
)
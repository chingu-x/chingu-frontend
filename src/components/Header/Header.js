import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import Modal from "../common/Modal"
import GetUser from "../utilities/GetUser"
import headerQuery from "../../queries/headerQuery"
// import Store from '../../AppGlobalStore';
import { client } from "../../index"
import GithubLoginModal from "../Login/components/GithubLoginModal"

class Header extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      showPortalDropdown: false,
      showUserDropdown: false
    }
  }
  
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
    this.state.showUserDropdown 
      ? this.refs.dropdownModal.close() 
      : this.refs.dropdownModal.open()
    
    e.stopPropagation()
    this.setState({
      showPortalDropdown: false,
      showUserDropdown: !this.state.showUserDropdown
    })
  }

  
  // let teams = [];
  // let user = null;

  // if (Store.state.user && localStorage.getItem('token')) {
  //   let StoreUser = Store.getUserState();
  //   user = StoreUser;
  //   teams = StoreUser.teams;
  // }
  // if (Store.state.user) {
  //   user = Store.state.user;
  //   teams = Store.state.user.teams;
  // }
  
  logout = async (e) => {
    e.preventDefault();
    
    console.log("cached user", client.cache.data.data["User:4"]) // TODO remove
    
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("store");
    
    /* 
    TODOS
    Fix state updates error
    Find better way to reset cache
    Do server logout logic
    */
   
    // TODO check which is correct      
    // await client.resetStore()
    await client.cache.reset()

    // TODO remove
    console.log("cacheafter reset", client.cache.data.data)
    
    this.props.history.push("/")
  };

  renderPortalDropDown = () => {
    const { teams } = this.props.user
    let teamsDOM = null;
    if (teams && teams.length) {
      teamsDOM = (
        <React.Fragment>
          <div className="label">Team Portal</div>
          {teams.map((team, index) => {
            return (<Link key={index} to={"/team/" + team.id}>{team.title}</Link>)
          })}
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
            {teamsDOM}
            <Link to="/voyage">Voyage Portal</Link>
            <hr />
            <Link to="/profile">User Profile</Link>
          </div>
        }
      </div>
    )
  }

  renderAvatar = () => {
    const { avatar } = this.props.user
    return (
      <div className="header-dropdown">
        <img
          onClick={this.handleUserDropdown}
          className="avatar" src={avatar ? avatar : require('../../assets/blank image.png')} alt="user avatar" />
        
        { this.state.showUserDropdown &&
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
  }

  render() {
    const { loading, user } = this.props
    const { showPortalDropdown, showUserDropdown } = this.state
    const isDropdownOpen = showPortalDropdown || showUserDropdown
    console.log("header", {loading, user})

    return (
      <Fragment>
        <Modal onModalClick={this.closeDropdowns} ref="dropdownModal"/>
        <Modal background="gray" ref="loginModal">
        {/* TODO add querystring */}
          <GithubLoginModal/> 
        </Modal>
        <div
          onClick={this.closeDropdowns} 
          className={`header header-dark ${isDropdownOpen ? "modal-peek" : ""}`}>  
          <div className="header-container">
            <div className="header-left">
              <div className="nav-logo">
                <Link className="nav-light" to="/">CHINGU</Link>
              </div>
            </div>
    
            {user && this.renderPortalDropDown()}
    
            <div className="header-right">
              {user && this.renderAvatar()}
              {!localStorage.token && !loading && <div onClick={this.openLoginModal} className="header-btn">LOG IN</div>} 
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default withRouter(props => <GetUser query={headerQuery}><Header {...props}/></GetUser>)

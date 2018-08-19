import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { gql } from "apollo-boost"
import GetData from "../utilities/GetData"
import Modal from "../common/Modal"
import GithubLoginModal from "../Login/components/GithubLoginModal"
import isAuthed from "../utilities/checkAuth"
import profileQuery from "../UserProfile/graphql/profileQuery"
import voyagesQuery from "../VoyagePortal/graphql/voyagesQuery"
// import Store from '../../AppGlobalStore';

const headerQuery = gql`
  query getUser {
    user {
      id
      teams {
        id
        title
      }
      avatar
    }
  }
`
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
  
  logout = async (e, client) => {
    e.preventDefault();
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("store");
    // TODO: Server logout logic
    
    // TODO: Redirect only if current page is private. 
    // Explanation: client.resetStore() will refetch active queries and cannot be used on private pages
    // Alternatively use client.cache.reset() which does not refetch active queries
    this.props.history.replace("/")
    await client.resetStore()
    // await client.cache.reset()
  };

  renderPortalDropDown = ({teams, client}) => {
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
            {teamsDOM}
            
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

  renderAvatar = ({avatar, client}) => (
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
            <Link to="/" onClick={e => this.logout(e, client)}>Log out</Link>
          </div>
        </Fragment>
      }
    </div>
  )

  render() {
    const isDropdownOpen = this.state.showPortalDropdown || this.state.showUserDropdown
    const { client, data: { user: { avatar, teams } = {}} = {}} = this.props
    return  (
      <Fragment>
        <Modal onModalClick={this.closeDropdowns} background="transparent" ref="dropdownModal"/>
        <Modal ref="loginModal"><GithubLoginModal/> </Modal>
        <div
          onClick={this.closeDropdowns} 
          className={`header header-dark ${isDropdownOpen ? "modal-peek" : ""}`}>  
          <div className="header-container">
            <div className="header-left">
              <div className="nav-logo">
                <Link className="nav-light" to="/">CHINGU</Link>
              </div>
            </div>

            {teams && this.renderPortalDropDown({client, teams})}

            <div className="header-right">
              {avatar && this.renderAvatar({client, avatar})}
              {!localStorage.token && !avatar && <div onClick={this.openLoginModal} className="header-btn">LOG IN</div>} 
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default withRouter(props => (
  !isAuthed() 
    ? <Header {...props}/>
    : <GetData
        component={Header}
        query={headerQuery}
        {...props} />
      )
)
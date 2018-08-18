import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { Query } from "react-apollo"
import { gql } from "apollo-boost"
import Modal from "../common/Modal"
import GithubLoginModal from "../Login/components/GithubLoginModal"
import Error from "../Error/Error"
// import Store from '../../AppGlobalStore';
// import GetUser from "../utilities/GetUser"
import profileQuery from "../../queries/userProfileQuery"

const query = gql`
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
  
  logout = async (e, client) => {
    e.preventDefault();
    
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

    if (!client.cache.data.data["User:4"]) console.log("Cache emptied") // TODO Remove
    
    this.props.history.replace("/")
  };

  renderPortalDropDown = ({teams, client}) => {
    // const { teams } = this.props.user
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
            <Link 
              to="/voyage"
              // onMouseOver={() => client.query({ query )} // TODO: voyage prefetch
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

  renderAvatar = ({avatar, client}) => {
    // const { avatar } = this.props.user
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
              {/* TODO: server logout logic */}
              <Link to="/" onClick={e => this.logout(e, client)}>Log out</Link>
            </div>
          </Fragment>
        }
      </div>
    )
  }

  renderHeader = ({user, client} = {}) => {
    let avatar, teams
    if (user) {
      ({teams, avatar} = user) 
      // teams = user.teams
      // avatar = user.avatar
    }
    const isDropdownOpen = this.state.showPortalDropdown || this.state.showUserDropdown
    return (
      <div
        onClick={this.closeDropdowns} 
        className={`header header-dark ${isDropdownOpen ? "modal-peek" : ""}`}>  
        <div className="header-container">
          <div className="header-left">
            <div className="nav-logo">
              <Link className="nav-light" to="/">CHINGU</Link>
            </div>
          </div>

          {user && this.renderPortalDropDown({client, teams})}

          <div className="header-right">
            {user && this.renderAvatar({client, avatar})}
            {!localStorage.token && !user && <div onClick={this.openLoginModal} className="header-btn">LOG IN</div>} 
          </div>
        </div>
      </div>
    )
  }
  
  render() {
    return (
      <Fragment>
        <Modal onModalClick={this.closeDropdowns} background="transparent" ref="dropdownModal"/>
        <Modal ref="loginModal"><GithubLoginModal/> </Modal>
        {
          !localStorage.token
            ? this.renderHeader()
            : <Query query={ query }>
          {
            // TODO: Skip the query if no token found
            (({ client, loading, error, data = {} }) => {
              console.log("header status", { loading, error, data })
              // if (error) return <Error error={error.message} goBack={"/"}/>
              return this.renderHeader({user: data.user, client})
            })
          }
        </Query>}
      </Fragment>
    )
  }
}

// export default withRouter(props => <GetUser query={headerQuery}><Header {...props}/></GetUser>)
export default withRouter(Header)
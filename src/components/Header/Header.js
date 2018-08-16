import React from "react";
import { Link, withRouter } from "react-router-dom";
import GetUser from "../utilities/GetUser"
import headerQuery from "../../queries/headerQuery"
// import Store from '../../AppGlobalStore';
import { client } from "../../index"

class Header extends React.Component {
  constructor(props) {
    super(props)

    this.state = {}
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
        <button className="header-portal-btn" >
          <span>CHOOSE A PORTAL</span>
          <i className="fa fa-chevron-down" />
        </button>
        <div className="header-dropdown-content--centered portal">
          {teamsDOM}
          <Link to="/voyage">Voyage Portal</Link>
          <hr />
          <Link to="/profile">User Profile</Link>
        </div>
      </div>
    )
  }

  renderAvatar = () => {
    const { avatar } = this.props.user
    return (
      <div className="header-dropdown">
        <img className="avatar" src={avatar ? avatar : require('../../assets/blank image.png')} alt="user avatar" />
        <div className="header-mask" />
        <div className="header-dropdown-content avatar">
          {/* <Link to="/settings">Settings</Link> */}
          <Link to="/" onClick={e => this.logout(e)}>Log out</Link>
          
        </div>
      </div>
    )
  }

  render() {
    const { loading, user } = this.props
    console.log("header", {loading, user})

    return (
      <div className="header header-dark">  
        <div className="header-container">
          <div className="header-left">
            <div className="nav-logo">
              <Link className="nav-light" to="/">CHINGU</Link>
            </div>
          </div>
  
          {user && this.renderPortalDropDown()}
  
          <div className="header-right">
            {user && this.renderAvatar()}
            {!localStorage.token && !loading && <Link to="/login" className="header-btn">LOG IN</Link>} 
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(props => <GetUser query={headerQuery}><Header {...props}/></GetUser>)

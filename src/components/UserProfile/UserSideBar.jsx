import * as React from "react";
import Store from '../../AppGlobalStore'
import './UserSideBar.css'
/**
 * TODO:
 * 1. remove hardcoded data
 * 2. factor out html components
 * 3. convert class to function
 **/

const USER_INFO_DOM_ELEMENTS = [
  {
    divClassName: 'user-background',
    schemaKey: 'background',
    desc: 'Background',
  },
  {
    divClassName: 'user-coding-history',
    schemaKey: 'codingHistory',
    desc: 'Coding History',
  },
  {
    divClassName: 'user-interests',
    schemaKey: 'interests',
    desc: 'Interests',
  },
];

class UserSideBar extends React.Component {
  render() {
    const user = Store.state.user;

    let userInfoDOM = USER_INFO_DOM_ELEMENTS.map(elem => {
      if (user[elem.schemaKey] && user[elem.schemaKey].length > 0) {
        return (
          <div className={elem.divClassName}>
            <h1 className="user-sidebar-subcategory">{elem.desc}</h1>
            <p>{user[elem.schemaKey]}</p>
          </div>
        )
      }
      else {
        return null;
      }
    });

    let skillDOM = null;
    if (user.skills && user.skills.length > 0) {
      skillDOM = (
        <div className="user-skills">
          <h1 className="user-sidebar-subcategory">skills</h1>
          <ul>
            {user.skills.map(elem => (<li>{elem}</li>))}
          </ul>
        </div>
      )
    }

    // once links are integrated again, render this
    // check for fb/linkedin/gitub
    let linkDOM = null;
    if (user) {
      linkDOM = (
        <div className="user-links">
          <h1 className="user-sidebar-subcategory">links</h1>
          <ul>
            <li>
              <a target="_blank" href={"https://www.github.com/" + user.username}>
                <i className="fab fa-github fa-3x" />
              </a>
            </li>
          </ul>
        </div>
      )
    }

    return (
      <div className="user-profile-container-personal">
        <header className="user">
          <div className="photobox">
            <img
              className="user-photo"
              src={user ? user.avatar : require('../../assets/blank image.png')}
              alt="userprofile"
            />
            <p>{user.username}</p>
            <p>Based in {user.country}</p>
          </div>
          <ul className="positions">
            {/* <li className="position">
              <span>
                <i className="fas fa-check" />
              </span>Designer
            </li> */}
            <li className="position">
              <span>
                <i className="fas fa-check" />
              </span>Programmer
            </li>
          </ul>
        </header>
        {skillDOM}
        {userInfoDOM}
        {linkDOM}
      </div>
    );
  }
}

export default UserSideBar;

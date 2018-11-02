import * as React from "react";
import './UserSideBar.css'
import UserInfo from './UserInfo';
import { UserSkills } from "./components";

const Links = ({ user: { username } }) => (
  <div className="user-links">
    <h1 className="user-sidebar-subcategory">links</h1>
    <ul>
      <li>
        <a target="_blank" href={`https://www.github.com/${username}`}>
          <i className="fab fa-github fa-3x" />
        </a>
      </li>
    </ul>
  </div>
);

// -- USER SIDEBAR (EXPORT)-- // 
const UserSideBar = ({ user, editable }) => (
  <div className="user-profile-container-personal">
    <header className="user">
      <div className="photobox">
        <img
          className="user-photo"
          src={user ? user.avatar : require('../../assets/blank image.png')}
          alt="userprofile" />
        <p>{user.username}</p>
        {user.country && <p>Based in {user.country}</p>}
      </div>
      {/* TODO: bring back when we have proper roles
      <ul className="positions">
        <li className="position">
          <span><i className="fas fa-check" /></span>
          Programmer
        </li>
      </ul> */}
    </header>
    <UserInfo user={user} editable={editable} />
    <UserSkills user={user} editable={editable} />
    <Links user={user} />
  </div>

);

export default UserSideBar;
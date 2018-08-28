import * as React from "react";
import './UserSideBar.css'
import EditableTextField from '../utilities/EditableTextField';
import { gql } from "apollo-boost"
/**
 * TODO:
 * 1. remove hardcoded data
 * 2. factor out html components
 * 3. convert class to function
 **/

const userUpdate = gql`
mutation userUpdate($background: String, $interests: String, $coding_history: String) {
  updateProject(background: $title, interests: $elevator_pitch, coding_history: $coding_history) {
    id
    background
    interests
    coding_history
  }
}
`;

const USER_INFO_DOM_ELEMENTS = [
  {
    divClassName: 'user-background',
    schemaKey: 'background',
    desc: 'Background',
  },
  {
    divClassName: 'user-coding-history',
    schemaKey: 'coding_history',
    desc: 'Coding History',
  },
  {
    divClassName: 'user-interests',
    schemaKey: 'interests',
    desc: 'Interests',
  },
];

class UserSideBar extends React.Component {
  state = {
    isEditing: false,
    user: {}
  }
  componentDidMount() {
    this.setState({ user: this.props.user });
  }

  renderUserInfo = () => {
    let user = this.state.user;
    return USER_INFO_DOM_ELEMENTS.map(elem => {
      (user[elem.schemaKey] && user[elem.schemaKey].length > 0) &&
        <EditableTextField
          large
          mutation={userUpdate}
          mutationName="userUpdate"
          fieldName={elem.schemaKey}
          fieldData={user[elem.schemaKey]}
          hasPermission={this.state.isEditing}
          component={(
            <div className={elem.divClassName}>
              <h1 className="user-sidebar-subcategory">{elem.desc}</h1>
              <p>{user[elem.schemaKey]}</p>
            </div>
          )}
        />
    });
  }

  renderLinks = () => {
    let user = this.state.user;
    return (
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

  render() {
    let { user } = this.state.user;
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
            <li className="position">
              <span>
                <i className="fas fa-check" />
              </span>Programmer
              </li>
          </ul>
        </header>
        {this.renderUserInfo()}
        {this.renderLinks()}
      </div>
    );
  }

}

export default UserSideBar;


  // let skillDOM = null;
  // if (user.skills && user.skills.length > 0) {
  //   skillDOM = (
  //     <div className="user-skills">
  //       <h1 className="user-sidebar-subcategory">skills</h1>
  //       <ul>
  //         {user.skills.map(elem => (<li>{elem}</li>))}
  //       </ul>
  //     </div>
  //   )
  // }

  // once links are integrated again, render this
  // check for fb/linkedin/gitub
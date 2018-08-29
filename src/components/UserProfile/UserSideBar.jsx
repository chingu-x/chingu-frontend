import * as React from "react";
import './UserSideBar.css'
import EditableTextField from '../utilities/EditableTextField';
import { gql } from "apollo-boost";

class UserSideBar extends React.Component {
  state = {
    isEditing: false,
    user: {},
    coding_history: '',
    background: '',
    interests: ''
  }
  componentDidMount() {
    let { coding_history, background, interests } = this.props.user;
    this.setState({
      user: this.props.user,
      coding_history,
      background,
      interests
    });
  }

  render() {
    let { user } = this.state;
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
        <UserInfo user={this.state} />
        <Links user={this.state} />
      </div>
    );
  }
}

export default UserSideBar;

const userUpdate = gql`
mutation userUpdate($user_data: UserUpdateInput!) {
  userUpdate(user_data: $user_data) {
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


const UserInfo = ({ user }) => {
  return USER_INFO_DOM_ELEMENTS.map((elem, idx) => {
    const userComponent = ({ data }) => {
      return (
        <div className={elem.divClassName}>
          <h1 className="user-sidebar-subcategory">{elem.desc}</h1>
          <p>{data}</p>
        </div>
      )
    }
    return (
      <EditableTextField
        key={idx}
        large
        mutation={ userUpdate }
        mutationName="userUpdate"
        mutationInputName="user_data"
        fieldName={elem.schemaKey}
        fieldData={user[elem.schemaKey]}
        hasPermission={true}
        component={userComponent}
      />
    )
  });
}

const Links = ({ user }) => {
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
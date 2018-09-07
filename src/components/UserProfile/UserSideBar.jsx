import * as React from "react";
import './UserSideBar.css'
import EditableTextField from '../utilities/EditableTextField';
import { gql } from "apollo-boost";

// -- MUTATION -- //
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

// -- USERINFO ELEMENTS -- //
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

const UserInfo = ({ user, editable }) => {
  return USER_INFO_DOM_ELEMENTS.map((elem, idx) => {
    const UserComponent = props =>
      <div key={idx} className={elem.divClassName}>
        <h1 className="user-sidebar-subcategory">{elem.desc}</h1>
        {props.children}
      </div>

    return !editable // only render EditableTextField if editable
      ? <UserComponent key={idx}>{user[elem.schemaKey]}</UserComponent>
      : (
        <EditableTextField
          key={idx}
          large
          mutation={userUpdate}
          mutationName="userUpdate"
          mutationInputName="user_data"
          fieldName={elem.schemaKey}
          fieldData={user[elem.schemaKey]}
          hasPermission={editable}
          component={UserComponent}
        />
      )
  });
}

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
        <p>Based in {user.country}</p>
      </div>
      <ul className="positions">
        <li className="position">
          <span><i className="fas fa-check" /></span>
          Programmer
        </li>
      </ul>
    </header>
    <UserInfo user={user} editable={editable} />
    <Links user={user} />
  </div>
);

// class UserSideBar extends React.Component {
//   state = {
//     user: null,
//     editable: false,
//   }

//   updateState = () => {
//     this.setState({
//       user,
//       editable
//     });
//   }
//   componentDidMount() {
//     this.updateState();
//   }

//   componentDidUpdate(prevProps) {
//     if (
//       this.props.editable !== prevProps.editable
//       || this.props.user !== prevProps.user
//     ) {
//       this.updateState();
//     }
//   }

//   render() {
//     const { user, editable } = this.state;
//     if (!user) return null;
//     return (
//       <div className="user-profile-container-personal">
//         <header className="user">
//           <div className="photobox">
//             <img
//               className="user-photo"
//               src={user ? user.avatar : require('../../assets/blank image.png')}
//               alt="userprofile"
//             />
//             <p>{user.username}</p>
//             <p>Based in {user.country}</p>
//           </div>
//           <ul className="positions">
//             <li className="position">
//               <span>
//                 <i className="fas fa-check" />
//               </span>Programmer
//               </li>
//           </ul>
//         </header>
//         <UserInfo user={user} editable={editable} />
//         <Links user={user} />
//       </div>
//     );
//   }
// }

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
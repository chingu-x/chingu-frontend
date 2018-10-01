import * as React from "react";
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

export default UserInfo;
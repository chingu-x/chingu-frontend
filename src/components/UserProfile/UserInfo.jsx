import * as React from "react";
import EditableTextField from '../utilities/EditableTextField';
import { gql } from "apollo-boost";
import { timezoneOptions } from './components/timezoneOptions.js';

// -- MUTATION -- //
const userUpdate = gql`
mutation userUpdate($user_data: UserUpdateInput!) {
  userUpdate(user_data: $user_data) {
    id
    background
    interests
    coding_history
    timezone
    country
  }
}
`;

// -- USERINFO ELEMENTS -- //
const USER_INFO_DOM_ELEMENTS = [
    {
        divClassName: 'user-background',
        schemaKey: 'background',
        desc: 'Background',
        editType: {
            large: true
        }
    },
    // {
    //     divClassName: 'user-background',
    //     schemaKey: 'country',
    //     desc: 'Country',
    //     editType: {
    //         large: false
    //     }
    // },
    {
        divClassName: 'user-interests',
        schemaKey: 'timezone',
        desc: 'Timezone',
        editType: {
            dropdownType: true,
            dropdownOptions: timezoneOptions,
        }
    },
    {
        divClassName: 'user-coding-history',
        schemaKey: 'coding_history',
        desc: 'Coding History',
        editType: {
            large: true
        }
    },
    {
        divClassName: 'user-interests',
        schemaKey: 'interests',
        desc: 'Interests',
        editType: {
            large: true
        }
    },
];

const UserInfo = ({ user, editable }) => {
    return USER_INFO_DOM_ELEMENTS.map((elem, idx) => {
        const UserComponent = props =>
            <div key={idx} className={elem.divClassName}>
                <h1 className="user-sidebar-subcategory">{elem.desc}</h1>
                {props.children}
            </div>

        let value = (elem.schemaKey === 'timezone' 
                        ? `UTC ${-1 * user[elem.schemaKey] / 60}` 
                        : user[elem.schemaKey]);
        
        return !editable
            ? <UserComponent key={idx}>{value}</UserComponent>
            : (
                <EditableTextField
                    key={idx}
                    mutation={userUpdate}
                    mutationName="userUpdate"
                    mutationInputName="user_data"
                    fieldName={elem.schemaKey}
                    fieldData={value}
                    hasPermission={editable}
                    component={UserComponent}
                    {...elem.editType}
                />
            )
    });
}

export default UserInfo;
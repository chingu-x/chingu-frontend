import * as React from "react";
import { Link } from "react-router-dom"
import EditableTextField from '../utilities/EditableTextField';
import { gql } from "apollo-boost";

// -- MUTATION -- //
const projectUpdate = gql`
mutation projectUpdate($project_id: ID!, $project_data: UserUpdateInput!) {
  projectUpdate(project_id: $project_id, project_data: $project_data) {
    id
    links {
      id
      url
      label
    }
  }
}
`;

const TeamResourceLinks_DOM_ELEMENTS = [
  {
    divClassName: 'team-resource-link-container',
    schemaKey: 'links',
  }
]
const TeamResourceButton = ({ links }) => {
  return (
    <Link to={links.url} target={'_blank'} className="team-resource-btn">
      <img src={require('../../assets/Artboard 5.png')} className="team-resource-btn-icon" />
      {links.label}
    </Link>
  )
}
const TeamResourceLinks = ({ project, editable }) => {
  console.log(project);
  return (
    <div className="team-resource-link-container">
      <div className="team-card-info--label">Team Resource Links</div>
      <EditableTextField
                    key={idx}
                    mutation={projectUpdate}
                    mutationName="projectUpdate"
                    mutationInputName="links"
                    fieldName={'links'}
                    fieldData={value}
                    hasPermission={editable}
                    component={UserComponent}
                    {...elem.editType}
      />
    </div>
  )
}

export default TeamResourceLinks;
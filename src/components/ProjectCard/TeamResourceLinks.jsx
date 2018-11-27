import * as React from "react";
import { Link } from "react-router-dom"
import EditableTextField from '../utilities/EditableTextField';
import { gql } from "apollo-boost";
import EditButton from '../common/EditButton';

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

const TeamResourceButtons = ({ links }) => {
  if (!links) { return null };
  return links.map((link, idx) => {
    return (
      <Link key={idx} to={link.url} target={'_blank'} className="team-resource-btn">
        <img src={require('../../assets/Artboard 5.png')} className="team-resource-btn-icon" />
        {link.label}
      </Link>
    )
  })
}

const TeamResourceLinks = ({ project, editable }) => {
  console.log(project);
  return (
    <div className="team-resource-link-container">
      <div className="team-card-info--label">Team Resource Links</div>
      <EditableTextField
        mutation={projectUpdate}
        mutationName="projectUpdate"
        mutationInputName="links"
        fieldName={'links'}
        fieldData={project.links}
        hasPermission={true}
        component={TeamResourceButtons}
      />
    </div>
  )
}

export default TeamResourceLinks;

// team resource link renders a batch of editableTextFields/buttons
// editing it will edit all inputs at once
// there should be an input that allows you to add new resource links
// setting an empty URL will remove that link option
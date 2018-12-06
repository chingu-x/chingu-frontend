import * as React from "react";
import { Link } from "react-router-dom"
import EditableTextField from '../utilities/EditableTextField';
import { gql } from "apollo-boost";
import PopupMenu from "../utilities/PopupMenu";
import DynamicFormContainer from '../DynamicForm/components/DynamicFormContainer';
import CreatableSelect from 'react-select/lib/Creatable';

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

const NewResourceLinkQA = (value) => [
  {
    field_name: 'url',
    text: 'URL Link',
    input_type: 'text',
  },
  {
    field_name: 'label',
    text: 'Label',
    input_type: value !== 'link' ? 'dropdown' : 'text',
    options: value !== 'link'
      && [
      { text: 'AWS', value: 'aws' },
      { text: 'Behance', value: 'behance' },
      { text: 'Bitbucket', value: 'bitbucket' },
      { text: 'Codepen', value: 'codepen' },
      { text: 'Discord', value: 'discord' },
      { text: 'Dropbox', value: 'dropbox' },
      { text: 'Github', value: 'github' },
      { text: 'Google Drive', value: 'google-drive' },
      { text: 'Medium', value: 'medium' },
      { text: 'Slack', value: 'slack' },
      { text: 'Trello', value: 'trello' },
      { text: 'Youtube', value: 'youtube' },
      { text: 'Other', value: 'link' },
    ]
  }
]
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

class TeamResourceLinks extends React.Component {
  constructor(props) {
    super(props);
    state = {
      value: 'link'
    }
  }

  render() {
    const { project } = this.props;
    const { value } = this.state;
    return (
      <div className="team-resource-link-container">
        <div className="team-card-info--label">Team Resource Links</div>
        <PopupMenu className="new-team-resource-link-container">
          <button className="add-new-link-btn">+</button>
          <DynamicFormContainer
            questions={NewResourceLinkQA(value)}
            onSubmit={this.submitNewResourceLink}
          />
        </PopupMenu>
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
  
}

export default TeamResourceLinks;

// team resource link renders a batch of editableTextFields/buttons
// editing it will edit all inputs at once
// there should be an input that allows you to add new resource links
// setting an empty URL will remove that link option
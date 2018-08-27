import * as React from "react";
import Banner from './components/Banner';
import ProjectSideBar from './components/ProjectSideBar';
import ProjectDescription from './components/ProjectDescription';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import './ProjectShowcase.css';

/*

This component should only be concerned with the overall layout of the page and whether it is editable.

*/
const getProjectAndUser = gql`
  query getProjectAndUser($title: String) {
    user {
      id
    }
    projects(title: $title) { # FIXME[1]: Update query for retrieving a single Project based on route params
      id
      title
      description
      project_url
      github_url
      users {
        id
        username
        avatar
      }
      skills{
        id
        name
      }
    }
  }
`

class ProjectShowcase extends React.Component {
  state = {
    editable: false
  };

  isEditable = (user, project) => {
    return project.users.some((teamMember) => {
      return user.id === teamMember.id;
    });
  }

  getProjectId = () => {
    return this.props.match.params.projectId;
  }

  render() {
    return (
      <Query
      query={getProjectAndUser}
      variable={{title: 'vampires Team 0 Project'}}>
        {({ error, loading, data}) => {
          
          if (error) { return null; }
          if (loading) { return null; }
          
          const {user, projects} = data;
          const project = projects[0]; // FIXME[1]

          return (
            <div className="project-portal">
              <Banner
                editable={this.isEditable(user, project)}
                title={project.title}
                elevatorPitch={project.elevatorPitch}
              />
              <div className="project-info-container">
                  <ProjectDescription
                    editable 
                    text={project.description}
                  />
                  <ProjectSideBar />
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default ProjectShowcase;

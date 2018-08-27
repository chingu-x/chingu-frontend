import * as React from "react";
import Banner from './components/Banner';
import ProjectSideBar from './components/ProjectSideBar';
import ProjectDescription from './components/ProjectDescription';
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

  render() {
    return (
      <div className="project-portal">
        <Banner />
        <div className="project-info-container">
            <ProjectDescription />
            <ProjectSideBar />
        </div>
      </div>
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
